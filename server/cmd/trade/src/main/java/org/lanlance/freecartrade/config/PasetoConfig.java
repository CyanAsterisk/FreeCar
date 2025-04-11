package org.lanlance.freecartrade.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "paseto")
public class PasetoConfig {
    private String pubKey;
    private String implicit;
}