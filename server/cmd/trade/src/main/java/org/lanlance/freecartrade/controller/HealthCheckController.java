package org.lanlance.freecartrade.controller;

import org.lanlance.freecartrade.rpc.server.TradeHealthChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthCheckController {

    @Autowired
    private TradeHealthChecker thriftChecker;

    @GetMapping("/health")
    public ResponseEntity<?> combinedHealthCheck() {
        boolean thriftHealthy = thriftChecker.isThriftHealthy();

        if (thriftHealthy) {
            return ResponseEntity.ok().body(Map.of("status", "UP"));
        } else {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of(
                            "status", "DOWN",
                            "details", Map.of(
                                    "http", "UP",
                                    "thrift", "DOWN"
                            )
                    ));
        }
    }
}