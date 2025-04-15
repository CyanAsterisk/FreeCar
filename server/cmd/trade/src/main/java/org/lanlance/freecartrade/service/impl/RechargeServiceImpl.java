package org.lanlance.freecartrade.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lanlance.freecartrade.repository.mapper.UserMapper;
import org.lanlance.freecartrade.repository.redis.RedisRepository;
import org.lanlance.freecartrade.service.RechargeServiceIface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RechargeServiceImpl implements RechargeServiceIface {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RedisRepository redisRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void recharge(String userId, Integer amount) {
        // Check if userId is existing
        boolean userExists = userMapper.existsById(userId);
        if (!userExists) {
            log.error("recharge# User does not exist: {}", userId);
            throw new IllegalArgumentException("User does not exist");
        }

        // First update MySQL (Strong consistency)
        int updatedRows = userMapper.updateBalance(userId, amount);
        if (updatedRows != 1) {
            log.error("recharge# Failed to update balance for user: {}", userId);
            throw new RuntimeException("Failed to update user balance");
        }

        // Then update Redis
        try {
            redisRepository.incrementBalance(userId, amount);
        } catch (Exception e) {
            log.error("recharge# Failed to update Redis cache for user: {}", userId, e);
            throw new RuntimeException("Failed to update Redis cache, rolling back MySQL transaction", e);
        }

        log.info("recharge# Successfully recharged {} for user {}", amount, userId);
    }
}
