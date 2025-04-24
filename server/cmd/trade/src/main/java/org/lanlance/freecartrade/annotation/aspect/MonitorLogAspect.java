package org.lanlance.freecartrade.annotation.aspect;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.lanlance.freecartrade.annotation.MonitorLog;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class MonitorLogAspect {

    private final ObjectMapper objectMapper;

    public MonitorLogAspect(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Pointcut("@annotation(org.lanlance.freecartrade.annotation.MonitorLog)")
    public void monitorLogPointcut() {
    }

    @Around("monitorLogPointcut()")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        long startTime = System.currentTimeMillis();
        String methodName = point.getSignature().getName();
        MonitorLog monitorLog = ((MethodSignature) point.getSignature()).getMethod().getAnnotation(MonitorLog.class);

        try {
            String args = objectMapper.writeValueAsString(point.getArgs());
            log.info("Method start: {}, des: {}, param: {}", methodName, monitorLog.description(), args);
            Object result = point.proceed();
            long endTime = System.currentTimeMillis();
            log.info("Method end: {}, time-consume: {}ms", methodName, (endTime - startTime));
            return result;
        } catch (Exception e) {
            log.error("Method error: {}, msg: {}", methodName, e.getMessage());
            throw e;
        }
    }
}
