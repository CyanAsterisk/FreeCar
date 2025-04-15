package org.lanlance.freecartrade.repository.mongo;

import lombok.RequiredArgsConstructor;
import org.lanlance.freecartrade.config.PaymentStatusEnum;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TripRepository {
    private final MongoTemplate mongoTemplate;
    
    public boolean updatePaymentStatus(String tripId, PaymentStatusEnum status) {
        Query query = Query.query(Criteria.where("_id").is(tripId));
        Update update = new Update().set("trip.payment_status", status.name());
        
        return mongoTemplate.updateFirst(query, update, "trips")
            .getModifiedCount() > 0;
    }
}
