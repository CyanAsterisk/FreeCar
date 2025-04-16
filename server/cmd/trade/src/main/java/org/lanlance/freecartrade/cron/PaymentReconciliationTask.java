package org.lanlance.freecartrade.cron;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.lanlance.freecartrade.model.PayInfo;
import org.lanlance.freecartrade.repository.mongo.TripRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class PaymentReconciliationTask {

    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private RabbitTemplate rabbitTemplate;

    private final ObjectMapper objectMapper;

    @Value("${spring.rabbitmq.exchange-name}")
    private String paymentExchange;

    @Scheduled(cron = "0 0/5 * * * ?")
    public void reconcileFailedPayments() {
        try {
            List<Document> failedPayments = tripRepository.findFailedPayments();

            for (Document trip : failedPayments) {
                try {
                    Document tripDoc = (Document) trip.get("trip");
                    String tripId = trip.get("_id").toString();
                    String accountId = tripDoc.getString("accountid");
                    Integer feeCent = ((Document) tripDoc.get("end")).getInteger("feecent");
                    PayInfo payInfo = new PayInfo(accountId, tripId, feeCent);

                    String message = objectMapper.writeValueAsString(payInfo);
                    rabbitTemplate.convertAndSend(paymentExchange, "", message);

                    log.info("reconcileFailedPayments# Reconciliation: Requeued payment for trip: {}", tripId);
                } catch (Exception e) {
                    log.error("reconcileFailedPayments# Failed to process reconciliation for trip: {}", trip.getString("_id"), e);
                }
            }
        } catch (Exception e) {
            log.error("reconcileFailedPayments# Reconciliation task failed", e);
        }
    }
}