package org.lanlance.freecartrade.config;

import lombok.Getter;

@Getter
public enum PaymentStatusEnum {
    PROCESSING("Processing"),
    FAILED("Failed"),
    PAID("Paid");

    private final String description;

    PaymentStatusEnum(String description) {
        this.description = description;
    }

}