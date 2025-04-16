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

    @Value("${spring.rabbitmq.dlq.exchange-name}")
    private String dlxExchangeName;

    @Value("${spring.rabbitmq.dlq.queue-name}")
    private String dlqQueueName;

    @Bean
    public Queue tradeQueue() {
        return QueueBuilder.durable(queueName)
                .withArgument("x-dead-letter-exchange", dlxExchangeName)
                .withArgument("x-dead-letter-routing-key", dlqQueueName)
                .build();
    }

    @Bean
    public FanoutExchange paymentExchange() {
        return new FanoutExchange(exchangeName);
    }

    @Bean
    public Binding binding() {
        return BindingBuilder.bind(tradeQueue()).to(paymentExchange());
    }

    @Bean
    public Queue dlqQueue() {
        return new Queue(dlqQueueName, true);
    }

    @Bean
    public DirectExchange dlxExchange() {
        return new DirectExchange(dlxExchangeName);
    }

    @Bean
    public Binding dlqBinding() {
        return BindingBuilder.bind(dlqQueue()).to(dlxExchange()).with(dlqQueueName);
    }
}