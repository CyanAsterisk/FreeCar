package org.lanlance.freecartrade.repository.redis;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.lanlance.freecartrade.model.RedisDeductResult;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Repository;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.Collections;

@Repository
@RequiredArgsConstructor
public class RedisRepository {
    private final StringRedisTemplate redisTemplate;
    private DefaultRedisScript<Long> deductScript;

    private static final String USER_BALANCE_KEY = "user:balance:%s";
    
    @PostConstruct
    public void init() {
        deductScript = new DefaultRedisScript<>();
        deductScript.setLocation(new ClassPathResource("lua/deduct_balance.lua"));
        deductScript.setResultType(Long.class);
    }

    /**
     * Increment user balance in Redis
     * @param accountId User account ID
     * @param amount Amount to increment
     */
    public void incrementBalance(String accountId, long amount) {
        String balanceKey = String.format(USER_BALANCE_KEY, accountId);
        redisTemplate.opsForValue().increment(balanceKey, amount);
    }

    /**
     * Deduct user balance in Redis
     * @param accountId User account ID
     * @param amount Amount to deduct
     * @return Result of the deduction
     */
    public RedisDeductResult deductBalance(String accountId, long amount) {
        String balanceKey = String.format(USER_BALANCE_KEY, accountId);
        long result = redisTemplate.execute(
            deductScript,
            Collections.singletonList(balanceKey),
            String.valueOf(amount)
        );
        
        return new RedisDeductResult(result >= 0, result);
    }

    /**
     * Rollback the deduction in Redis
     * @param accountId User account ID
     * @param amount Amount to rollback
     */
    public void rollbackDeduct(String accountId, long amount) {
        incrementBalance(accountId, amount);
    }
}
