package org.lanlance.freecartrade.rpc.client;

import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;
import org.lanlance.freecartrade.rpc.thrift_gen.user.UpdateUserRequest;
import org.lanlance.freecartrade.rpc.thrift_gen.user.UpdateUserResponse;
import org.lanlance.freecartrade.rpc.thrift_gen.user.UserService;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;

@Component
public class UserServiceClient {

    private final DiscoveryClient discoveryClient;


    public UserServiceClient(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    private UserService.Client selectClient() {
        List<ServiceInstance> instances = discoveryClient.getInstances("go-service");
        if (instances.isEmpty()) {
            throw new IllegalStateException("No available User service instances");
        }
        // load balance
        ServiceInstance instance = instances.get(new Random().nextInt(instances.size()));

        try {
            TTransport transport = new TSocket(instance.getHost(), instance.getPort());
            transport.open();
            return new UserService.Client(new TBinaryProtocol(transport));
        } catch (TTransportException e) {
            throw new RuntimeException("Failed to connect to User service", e);
        }
    }

    public UpdateUserResponse UpdateUser(UpdateUserRequest request) {
        try {
            UserService.Client client = selectClient();
            return client.UpdateUser(request);
        } catch (TException e) {
            throw new RuntimeException("RPC call failed", e);
        }
    }
}