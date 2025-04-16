package org.lanlance.freecartrade.config;

import org.springframework.amqp.core.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    @Value("${spring.rabbitmq.exchange-name}")
    private String exchangeName;

    @Value("${spring.rabbitmq.queue-name}")
    private String queueName;

    @Bean
    public Queue tradeQueue() {
        return QueueBuilder.durable(queueName).build();
    }

    @Bean
    public FanoutExchange paymentExchange() {
        return new FanoutExchange(exchangeName);
    }

    @Bean
    public Binding binding() {
        return BindingBuilder.bind(tradeQueue()).to(paymentExchange());
    }
}