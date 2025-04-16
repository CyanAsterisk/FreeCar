package org.lanlance.freecartrade.mq;

import lombok.extern.slf4j.Slf4j;
import org.lanlance.freecartrade.service.TradeServiceIface;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class TradeMessageListener {

    @Autowired
    private TradeServiceIface tradeService;

    @RabbitListener(queues = "${spring.rabbitmq.queue-name}")
    public void receiveMessage(Message message) {
        String content = new String(message.getBody());
        tradeService.processTradeMessage(content);
    }
}
