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

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean processTradeMessage(String content) {
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
        if (payInfo.getAccountID() == null || payInfo.getTripID() == null || payInfo.getFeeCent() == null) {
            log.error("processTradeMessage# Invalid message: {}", content);
            return false;
        }

        // Check
        String status = tripRepository.findTripStatusById(payInfo.getTripID());
        if (status.equals(PaymentStatusEnum.PAID.name())) {
            return true;
        }

        // Redis reduce balance
        try {
            // MongoDB update status
            boolean mongoResult = tripRepository.updatePaymentStatus(payInfo.getTripID(), PaymentStatusEnum.PROCESSING);
            if (!mongoResult) {
                return false;
            }

            RedisDeductResult deductResult = redisService.deductBalance(payInfo.getAccountID(), payInfo.getFeeCent());
            if (!deductResult.isSuccess()) {
                return false;
            }

            try {
                // MySQL update amount
                int mysqlResult = userMapper.updateBalance(payInfo.getAccountID(), -payInfo.getFeeCent());
                if (mysqlResult <= 0) {
                    throw new RuntimeException("MySQL update failed");
                }

                // MongoDB update status
                mongoResult = tripRepository.updatePaymentStatus(payInfo.getTripID(), PaymentStatusEnum.PAID);
                if (!mongoResult) {
                    throw new RuntimeException("MongoDB update failed");
                }

                log.info("processTradeMessage# Payment successful for trip: {}", payInfo.getTripID());

            } catch (Exception e) {
                // Anything failed, rollback Redis
                try {
                    redisService.rollbackDeduct(payInfo.getAccountID(), payInfo.getFeeCent());
                } catch (Exception rollbackEx) {
                    log.error("[P0] CRITICAL: Failed to rollback Redis deduction", rollbackEx);
                }
                throw e;
            }
        } catch (Exception e) {
            boolean mongoResult = tripRepository.updatePaymentStatus(payInfo.getTripID(), PaymentStatusEnum.FAILED);
            if (!mongoResult) {
                log.error("[P0] CRITICAL: Failed to update MongoDB status to FAILED for trip: {}", payInfo.getTripID());
            }
            log.error("Payment processing failed", e);
            throw new RuntimeException("Payment failed", e);
        }
        return true;
    }
}
