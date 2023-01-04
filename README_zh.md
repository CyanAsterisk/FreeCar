![FreeCar](static/resources/FreeCar.png)

[English](README.md) | 中文

FreeCar 是一个基于 Hertz 与 Kitex 的全栈项目。

## 调用关系

```
┌────────────────┐    HTTP CALL    ┌──────────────────────────┐    RPC CALL     ┌────────────────┐
│                ├────────────────►│                          ├────────────────►│                │
│  Hertz-Server  │                 │       Kitex-Client       │                 │  Kitex-Server  │
│                │◄────────────────┤                          │◄────────────────┤                │
└────────────────┘                 └──────────────────────────┘                 └────────────────┘
```

## 架构图

```
// TODO
```

## 目录介绍

| 目录     | 介绍                           |
|--------|------------------------------|
| Server | Core services of the project |
| Shared | Reusable code                |
| Static | Front-end static files       |

## 快速开始

- 通过 Docker 启动所需要的工具与环境
```shell
make start
```

- 配置 Nacos

> 默认命名空间以及配置组等请参考各个 `config.yaml` 配置文件。

**api => API_GROUP**
```json
{
  "name": "api",
  "host": "your host",
  "port": 9900,
  "jwt": {
    "key": "km!RU#a*43BsTsBVLQPpmuXI&$BJD%Sz"
  },
  "consul": {
    "host": "127.0.0.1",
    "port": 8500
  },
  "otel": {
    "endpoint": ":4317"
  },
  "auth_srv":{
    "name": "auth_srv"
  },
  "car_srv":{
    "name": "car_srv"
  },
  "profile_srv":{
    "name": "profile_srv"
  },
  "trip_srv":{
    "name": "trip_srv"
  }
}
```

**auth_srv => AUTH_GROUP**
```json
{
  "name": "auth_srv",
  "host": "your host",
  "mysql": {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "123456",
    "db": "FreeCar",
    "salt": "FreeCar"
  },
  "consul": {
    "host": "127.0.0.1",
    "port": 8500
  },
  "otel": {
    "endpoint": ":4317"
  },
  "wx_config":{
    "app_id": "your app id",
    "app_secret": "your app secret"
  }
}
```

**blob_srv => BLOB_GROUP**
```json
{
  "name": "blob_srv",
  "host": "your host",
  "mysql": {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "123456",
    "db": "FreeCar",
    "salt": "FreeCar"
  },
  "consul": {
    "host": "127.0.0.1",
    "port": 8500
  },
  "otel": {
    "endpoint": ":4317"
  },
  "cos_config":{
    "addr":"your cos addr",
    "sec_id":"your sec id",
    "sec_key":"your sec key"
  }
}
```

**car_srv => CAR_GROUP**
```json
{
  "name": "car_srv",
  "host": "your host",
  "wsAddr":":9090",
  "mongodb": {
    "host": "127.0.0.1",
    "port": 27017,
    "user": "admin",
    "password": "123456",
    "db": "FreeCar",
    "collection": "car"
  },
  "rabbitmq": {
    "host": "127.0.0.1",
    "port": 5672,
    "user": "guest",
    "password": "guest",
    "exchange": "FreeCar"
  },
  "consul": {
    "host": "127.0.0.1",
    "port": 8500
  },
  "otel": {
    "endpoint": ":4317"
  },
  "trip_srv": {
    "name": "trip_srv"
  }
}
```

**profile_srv => RENTAL_GROUP**
```json
{
  "name": "profile_srv",
  "host": "your host",
  "mongodb": {
    "host": "127.0.0.1",
    "port": 27017,
    "user": "admin",
    "password": "123456",
    "db": "FreeCar",
    "collection": "profile"
  },
  "consul": {
    "host": "127.0.0.1",
    "port": 8500
  },
  "otel": {
    "endpoint": ":4317"
  },
  "blob_srv": {
    "name": "blob_srv"
  }
}
```

**trip_srv => RENTAL_GROUP**
```json
{
  "name": "trip_srv",
  "host": "your host",
  "mongodb": {
    "host": "127.0.0.1",
    "port": 27017,
    "user": "admin",
    "password": "123456",
    "db": "FreeCar",
    "collection": "trip"
  },
  "consul": {
    "host": "127.0.0.1",
    "port": 8500
  },
  "otel": {
    "endpoint": ":4317"
  },
  "car_srv": {
    "name": "car_srv"
  },
  "profile_srv": {
    "name": "profile_srv"
  }
}
```

- 自动新建 MySQL 数据表
```shell
make migrate
```

- 启动基于 Hertz 的 HTTP 服务
```shell
make api
```

- 启动基于 Kitex 的微服务
```shell
make auth
make blob
make car
make profile
make trip
```

## API 请求

## 开发指南

通过直接阅读源码来了解此项目是非常困难的，在此提供开发指南方便开发者快速了解并上手此项目包括 Kitex、Hertz 等框架。

### 前置准备

通过以下命令在本地快速搭建起项目所需的工具。

```shell
make start
```

## 许可证

FreeCar 在 Apache 许可证 2.0 版下开源。
