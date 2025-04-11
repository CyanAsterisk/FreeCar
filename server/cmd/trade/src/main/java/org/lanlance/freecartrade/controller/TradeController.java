package org.lanlance.freecartrade.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lanlance.freecartrade.interceptor.PasetoAuthInterceptor;
import org.lanlance.freecartrade.model.resp.Result;
import org.lanlance.freecartrade.model.req.RechargeRequest;
import org.lanlance.freecartrade.service.RechargeServiceIface;
import org.lanlance.freecartrade.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/trade")
@Slf4j
@RequiredArgsConstructor
public class TradeController {

    @Autowired
    private RechargeServiceIface rechargeService;

    @PostMapping("/recharge")
    public Result<Void> recharge(HttpServletRequest request, @RequestBody BigDecimal amount) {
        String userId = (String) request.getAttribute(PasetoAuthInterceptor.ACCOUNT_ID);
        if (userId == null || userId.isEmpty()) {
            log.error("recharge# UserID is null or empty");
            return ResultUtil.error(ResultUtil.UNAUTHORIZED, "unauthorized");
        }
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            log.error("recharge# Invalid amount: {}", amount);
            return ResultUtil.error("Invalid amount");
        }

        RechargeRequest rechargeRequest = new RechargeRequest(userId, amount);

        try {
            rechargeService.recharge(rechargeRequest);
            return ResultUtil.success();
        } catch (Exception e) {
            log.error("recharge# Recharge failed: ", e);
            return ResultUtil.error("Recharge failed");
        }
    }
}
