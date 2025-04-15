package org.lanlance.freecartrade.config;

import lombok.RequiredArgsConstructor;
import org.lanlance.freecartrade.interceptor.PasetoAuthInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private PasetoAuthInterceptor pasetoAuthInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Auth Interceptor
        registry.addInterceptor(pasetoAuthInterceptor).addPathPatterns("/**").excludePathPatterns("/actuator/**");
    }
}