package org.lanlance.freecartrade.mq;

import com.rabbitmq.client.Channel;
import org.lanlance.freecartrade.service.TradeServiceIface;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
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
            channel.basicNack(message.getMessageProperties().getDeliveryTag(), false, true);
        }
    }
}
