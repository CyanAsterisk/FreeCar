package org.lanlance.freecartrade.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RedisDeductResult {
    private boolean success;
    private long newBalance;
}