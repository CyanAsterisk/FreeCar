package org.lanlance.freecartrade;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.context.config.annotation.RefreshScope;

@RefreshScope
@SpringBootApplication
public class FreecarTradeApplication {

    public static void main(String[] args) {
        SpringApplication.run(FreecarTradeApplication.class, args);
    }

}
