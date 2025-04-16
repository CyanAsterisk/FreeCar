package org.lanlance.freecartrade.mq;

import com.rabbitmq.client.Channel;
import lombok.extern.slf4j.Slf4j;
import org.lanlance.freecartrade.service.TradeServiceIface;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class TradeMessageListener {

    @Autowired
    private TradeServiceIface tradeService;

    @RabbitListener(queues = "${spring.rabbitmq.queue-name}")
    public void receiveMessage(Message message, Channel channel) throws IOException {
        try {
            String content = new String(message.getBody());
            // process
            tradeService.processTradeMessage(content);
            // ack
            channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
        } catch (Exception e) {
            // ack failed
            Integer retryCount = (Integer) message.getMessageProperties().getHeaders().getOrDefault("retry-count", 0);
            if (retryCount >= 3) {
                channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
                log.error("receiveMessage# message ack failed, max retry count reached, message: {}", new String(message.getBody()), e);
            } else {
                message.getMessageProperties().setHeader("retry-count", retryCount + 1);
                channel.basicNack(message.getMessageProperties().getDeliveryTag(), false, true);
                log.warn("receiveMessage# message ack failed, retrying, message: {}, retry count: {}", new String(message.getBody()), retryCount + 1);
            }
        }
    }
}
