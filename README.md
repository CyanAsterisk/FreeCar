![FreeCar](static/resources/FreeCar.png)

English | [中文](README_zh.md)

FreeCar is a full-stack WeChat applet based on Kitex and Hertz.

## Call Relations

```
┌────────────────┐    HTTP CALL    ┌──────────────────────────┐    RPC CALL     ┌────────────────┐
│                ├────────────────►│                          ├────────────────►│                │
│  Hertz-Server  │                 │       Kitex-Client       │                 │  Kitex-Server  │
│                │◄────────────────┤                          │◄────────────────┤                │
└────────────────┘                 └──────────────────────────┘                 └────────────────┘
```

## Architecture

TODO

## Catalog Introduce

| Catalog | Introduce                    |
|---------|------------------------------|
| Server  | Core services of the project |
| Shared  | Reusable code                |
| Static  | Front-end static files       |

## Quick Start

- Start the required tools and environment through Docker
```shell
make start
```

- Configure Nacos

> How to log in to Nacos? You can log in through this [link](http://127.0.0.1:8848/nacos/index.html#/login).
>
> For the default namespace and configuration groups, please refer to each `config.yaml` configuration file.

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
   "auth_srv": {
     "name": "auth_srv"
   },
   "car_srv": {
     "name": "car_srv"
   },
   "profile_srv": {
     "name": "profile_srv"
   },
   "trip_srv": {
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
   "wx_config": {
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
   "cos_config": {
     "addr": "your cos addr",
     "sec_id": "your sec id",
     "sec_key": "your sec key"
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

- Automatically create a new MySQL data table
```shell
make migrate
```

- Start Hertz-based HTTP service
```shell
make api
```

- Start Kitex-based microservices
```shell
make auth
make blobs
make car
make profile
make trip
```

## API Requests

TODO

## CookBook

TODO

## License

FreeCar is distributed under the Apache License, version 2.0.
