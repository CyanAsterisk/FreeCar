package org.lanlance.freecartrade.rpc.server;

import lombok.extern.slf4j.Slf4j;
import org.apache.thrift.TProcessor;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.server.TNonblockingServer;
import org.apache.thrift.server.TServer;
import org.apache.thrift.transport.TNonblockingServerSocket;
import org.apache.thrift.transport.TTransportException;
import org.lanlance.freecartrade.rpc.thrift_gen.trade.TradeService;
import org.springframework.beans.factory.DisposableBean;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component
@Slf4j
public class TradeThriftServer implements DisposableBean {

    private final TServer server;

    public TradeThriftServer(
            TradeServiceImpl handler,
            @Value("${thrift.trade.port}") int port
    ) throws TTransportException {
        TProcessor processor = new TradeService.Processor<>(handler);
        TNonblockingServerSocket socket = new TNonblockingServerSocket(port);
        TNonblockingServer.Args args = new TNonblockingServer.Args(socket)
                .processor(processor)
                .protocolFactory(new TBinaryProtocol.Factory());

        this.server = new TNonblockingServer(args);

        new Thread(() -> {
            System.out.println("[TradeThriftServer] starts, port: " + port);
            server.serve();
        }).start();
    }

    @Override
    public void destroy() {
        if (server != null) {
            server.stop();
        }
    }
}