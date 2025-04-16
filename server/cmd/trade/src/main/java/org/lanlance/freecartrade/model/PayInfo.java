package org.lanlance.freecartrade.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
public class PayInfo {
    @JsonProperty("account_id")
    private String AccountID;

    @JsonProperty("trip_id")
    private String TripID;

    @JsonProperty("fee_cent")
    private Integer FeeCent;
}