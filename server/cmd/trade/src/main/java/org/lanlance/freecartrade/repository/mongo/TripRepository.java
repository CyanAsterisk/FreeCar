package org.lanlance.freecartrade.repository.mongo;

import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.lanlance.freecartrade.config.PaymentStatusEnum;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TripRepository {
    private final MongoTemplate mongoTemplate;
    
    public boolean updatePaymentStatus(String tripId, PaymentStatusEnum status) {
        Query query = Query.query(Criteria.where("_id").is(tripId));
        Update update = new Update().set("trip.payment_status", status.name());
        
        return mongoTemplate.updateFirst(query, update, "trip")
            .getModifiedCount() > 0;
    }

    public List<Document> findFailedPayments() {
        Query query = new Query(Criteria.where("trip.payment_status").is(PaymentStatusEnum.FAILED.name()));
        return mongoTemplate.find(query, Document.class, "trip");
    }
}
