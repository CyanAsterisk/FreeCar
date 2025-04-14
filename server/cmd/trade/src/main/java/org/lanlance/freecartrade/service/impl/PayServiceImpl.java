package org.lanlance.freecartrade.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lanlance.freecartrade.mapper.UserMapper;
import org.lanlance.freecartrade.service.PayServiceIface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PayServiceImpl implements PayServiceIface {

    @Autowired
    private UserMapper userMapper;

    @Override
    public void pay(String userId, Integer feeCent) {
        userMapper.updateBalance(userId, feeCent);
    }
}
