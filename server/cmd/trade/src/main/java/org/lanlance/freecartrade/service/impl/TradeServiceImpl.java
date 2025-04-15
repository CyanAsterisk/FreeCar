package org.lanlance.freecartrade.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.lanlance.freecartrade.config.PaymentStatusEnum;
import org.lanlance.freecartrade.repository.mapper.UserMapper;
import org.lanlance.freecartrade.model.PayInfo;
import org.lanlance.freecartrade.model.RedisDeductResult;
import org.lanlance.freecartrade.repository.mongo.TripRepository;
import org.lanlance.freecartrade.repository.redis.RedisRepository;
import org.lanlance.freecartrade.service.TradeServiceIface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Service
@Slf4j
public class TradeServiceImpl implements TradeServiceIface {

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private RedisRepository redisService;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Override
    @Transactional
    public void processTradeMessage(String content) {
        // parse message
        PayInfo payInfo;
        try {
            payInfo = objectMapper.readValue(content, PayInfo.class);
            log.info("processTradeMessage# accountId={}, tripId={}, feeCent={}",
                    payInfo.getAccountID(), payInfo.getTripID(), payInfo.getFeeCent());
        } catch (Exception e) {
            log.error("processTradeMessage# json failed {}", content, e);
            throw new RuntimeException("process message failed", e);
        }
        // Redis reduce balance
        try {
            RedisDeductResult deductResult = redisService.deductBalance(payInfo.getAccountID(), payInfo.getFeeCent());

            if (!deductResult.isSuccess()) {
                rabbitTemplate.convertAndSend("payment.retry", content);
                return;
            }

            try {
                // MySQL update amount
                int mysqlResult = userMapper.updateBalance(payInfo.getAccountID(), -payInfo.getFeeCent());
                if (mysqlResult <= 0) {
                    throw new RuntimeException("MySQL update failed");
                }

                // MongoDB update status
                boolean mongoResult = tripRepository.updatePaymentStatus(payInfo.getTripID(), PaymentStatusEnum.PAID);
                if (!mongoResult) {
                    throw new RuntimeException("MongoDB update failed");
                }

                log.info("processTradeMessage# Payment successful for trip: {}", payInfo.getTripID());

            } catch (Exception e) {
                // Anything failed, rollback Redis
                redisService.rollbackDeduct(payInfo.getAccountID(), payInfo.getFeeCent());
                rabbitTemplate.convertAndSend("payment.retry", content);
                throw e;
            }
        } catch (Exception e) {
            log.error("Payment processing failed", e);
            throw new RuntimeException("Payment failed", e);
        }
    }
}
