package org.lanlance.freecartrade.model;

import lombok.Data;

@Data
public class PayInfo {
    private String AccountID;
    private String TripID;
    private Integer FeeCent;
}
