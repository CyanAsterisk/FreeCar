package org.lanlance.freecartrade.rpc.server.impl;

import org.lanlance.freecartrade.rpc.thrift_gen.PayRequest;
import org.lanlance.freecartrade.rpc.thrift_gen.PayResponse;
import org.lanlance.freecartrade.rpc.thrift_gen.TradeService;
import org.lanlance.freecartrade.service.PayServiceIface;
import org.lanlance.freecartrade.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TradeServiceImpl implements TradeService.Iface {

    @Autowired
    private PayServiceIface payService;

    @Override
    public PayResponse pay(PayRequest request) {
        payService.pay(request.account_id, request.fee_cent);
        PayResponse response = new PayResponse();
        response.setBase_resp(ResultUtil.successThrift());
        return response;
    }
}
