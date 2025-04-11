package org.lanlance.freecartrade.service;


import java.math.BigDecimal;

public interface RechargeServiceIface {
    void recharge(String userId, BigDecimal amount);
}
