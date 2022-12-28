![FreeCar](https://picture.lanlance.cn/i/2022/12/07/639050f2c7b76.png)

FreeCar is a A full-stack WeChat applet based on Kitex and Hertz.

This project is pending, looking forward to it.

## Call Relations

```
┌────────────────┐    HTTP CALL    ┌──────────────────────────┐    RPC CALL     ┌────────────────┐
│                ├────────────────►│                          ├────────────────►│                │
│  Hertz-Client  │                 │       Kitex-Client       │                 │  Kitex-Server  │
│                │◄────────────────┤                          │◄────────────────┤                │
└────────────────┘                 └──────────────────────────┘                 └────────────────┘
```

## License

FreeCar is distributed under the Apache License, version 2.0.
