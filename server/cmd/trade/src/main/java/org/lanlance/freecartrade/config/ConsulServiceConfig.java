package org.lanlance.freecartrade.config;

import com.ecwid.consul.v1.ConsulClient;
import com.ecwid.consul.v1.agent.model.NewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

//@Configuration
//public class ConsulServiceConfig {
//
//    @Value("${spring.application.name}")
//    private String applicationName;
//
//    @Value("${server.port}")
//    private int httpPort;
//
//    @Value("${thrift.trade.port}")
//    private int rpcPort;
//
//    @Autowired
//    private ConsulClient consulClient;
//
//    @PostConstruct
//    public void registerServices() {
//        NewService.Check check = new NewService.Check();
//
//        NewService httpService = new NewService();
//        httpService.setName(applicationName + "-http");
//        httpService.setPort(httpPort);
//        httpService.setTags(Collections.singletonList("api-service"));
//        Map<String, String> httpMeta = new HashMap<>();
//        httpMeta.put("api-port", String.valueOf(httpPort));
//        httpMeta.put("service-type", "http");
//        httpService.setMeta(httpMeta);
//        httpService.setCheck(check);
//
//        NewService rpcService = new NewService();
//        rpcService.setName(applicationName + "-rpc");
//        rpcService.setPort(rpcPort);
//        rpcService.setTags(Collections.singletonList("rpc-service"));
//        Map<String, String> rpcMeta = new HashMap<>();
//        rpcMeta.put("thrift-port", String.valueOf(rpcPort));
//        rpcMeta.put("service-type", "rpc");
//        rpcService.setMeta(rpcMeta);
//        rpcService.setCheck(check);
//
//        consulClient.agentServiceRegister(httpService);
//        consulClient.agentServiceRegister(rpcService);
//    }
//
//    @PreDestroy
//    public void deregisterServices() {
//        consulClient.agentServiceDeregister(applicationName + "-http");
//        consulClient.agentServiceDeregister(applicationName + "-rpc");
//    }
//}