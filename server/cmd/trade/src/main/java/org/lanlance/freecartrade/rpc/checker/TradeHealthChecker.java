package org.lanlance.freecartrade.rpc.checker;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;

@Component
public class TradeHealthChecker {

    @Value("${thrift.trade.port}")
    private int thriftPort;

    public boolean isThriftHealthy() {
        try (Socket socket = new Socket()) {
            socket.connect(new InetSocketAddress("localhost", thriftPort), 1000);
            return true;
        } catch (IOException e) {
            return false;
        }
    }
}