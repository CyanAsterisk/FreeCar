package org.lanlance.freecartrade.metric;

import org.lanlance.freecartrade.rpc.server.TradeHealthChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class ThriftHealthIndicator implements HealthIndicator {

    @Autowired
    private TradeHealthChecker thriftHealthChecker;
    @Value("${thrift.trade.port}")
    private int tradePort;

    @Override
    public Health health() {
        boolean isHealthy = thriftHealthChecker.isThriftHealthy();
        if (isHealthy) {
            return Health.up().withDetail("port", tradePort).build();
        }
        return Health.down().withDetail("error", "Thrift service unavailable").build();
    }
}