![FreeCar](static/images/doc/FreeCar.png)

[English](README.md) | 中文

FreeCar 是一个基于 Hertz 与 Kitex 的全栈项目。

## 项目架构

### 调用关系

![call_relations.png](static/images/doc/call_relation.png)

### 技术架构

![tech_arch](static/images/doc/tech_arch.png)

### 服务关系

![service_relations.png](static/images/doc/service_relations.png)

## 目录介绍

| 目录   | 介绍         |
| ------ | ------------ |
| Server | 项目核心部分 |
| Shared | 可复用代码   |
| Static | 前端静态文件 |

## 快速开始

- 通过 Docker 启动所需要的工具与环境

```shell
make start
```

- 配置 Nacos

> 在浏览器上访问 `http://127.0.0.1:8848/nacos/index.html#/login` 进行登录。
>
> 默认命名空间以及配置组等请参考各个 `config.yaml` 配置文件。

![nacos.png](static/images/doc/nacos.png)

![nacos_registry.png](static/images/doc/nacos_registry.png)

_api => API_GROUP_

```json
{
  "name": "api",
  "host": "your host",
  "port": 9900,
  "jwt": {
    "key": "km!RU#a*43BsTsBVLQPpmuXI&$BJD%Sz"
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

_auth_srv => AUTH_GROUP_

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
  "otel": {
    "endpoint": ":4317"
  },
  "wx_config": {
    "app_id": "your app id",
    "app_secret": "your app secret"
  }
}
```

_blob_srv => BLOB_GROUP_

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

_car_srv => CAR_GROUP_

```json
{
  "name": "car_srv",
  "host": "your host",
  "wsAddr": ":9090",
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
  "otel": {
    "endpoint": ":4317"
  },
  "trip_srv": {
    "name": "trip_srv"
  }
}
```

_profile_srv => RENTAL_GROUP_

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
  "otel": {
    "endpoint": ":4317"
  },
  "blob_srv": {
    "name": "blob_srv"
  }
}
```

_trip_srv => RENTAL_GROUP_

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

### Jaeger

> 在浏览器上访问 `http://127.0.0.1:16686/`

![jaeger.jpg](static/images/doc/jaeger.jpg)

### Prometheus

> 在浏览器上访问 `http://127.0.0.1:3000/`

![prometheus.jpg](static/images/doc/prometheus.png)

## API 请求

### Login

**Request**

```shell
curl --location --request POST '127.0.0.1:9900/auth/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "code":"123456789"
}'
```

**Response**

```json
{
  "code": 10000,
  "message": "Success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTYxMTMyNDQ2NjEwMzU4NjgxNiwiZXhwIjoxNjc1NTk2NzIxLCJpc3MiOiJGcmVlQ2FyIiwibmJmIjoxNjczMDA0NzIxfQ.THlMej2DgC3Lbt-TROkX55lMe9KZm9k2_VGvfKlW4Tk",
    "expired_at": 1675596721
  }
}
```

### CreateCar

**Request**

```shell
curl --location --request POST '127.0.0.1:9900/car' \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTYxMTMyNDQ2NjEwMzU4NjgxNiwiZXhwIjoxNjc1NTk2NzIxLCJpc3MiOiJGcmVlQ2FyIiwibmJmIjoxNjczMDA0NzIxfQ.THlMej2DgC3Lbt-TROkX55lMe9KZm9k2_VGvfKlW4Tk'
```

**Response**

```json
{
  "code": 10000,
  "message": "Success",
  "data": {
    "id": "63b808475e992cb7509b215a",
    "car": {
      "status": 1,
      "driver": {
        "id": 0,
        "avatar_url": ""
      },
      "position": {
        "latitude": 30,
        "longitude": 120
      },
      "trip_id": ""
    }
  }
}
```

### GetCar

**Request**

```shell
curl --location --request GET '127.0.0.1:9900/car' \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTYxMTMyNDQ2NjEwMzU4NjgxNiwiZXhwIjoxNjc1NTk2NzIxLCJpc3MiOiJGcmVlQ2FyIiwibmJmIjoxNjczMDA0NzIxfQ.THlMej2DgC3Lbt-TROkX55lMe9KZm9k2_VGvfKlW4Tk' \
  --data-raw '{
    "id":"63b808475e992cb7509b215a"
}'
```

**Response**

```json
{
  "code": 10000,
  "message": "Success",
  "data": {
    "status": 1,
    "driver": {
      "id": 0,
      "avatar_url": ""
    },
    "position": {
      "latitude": 30,
      "longitude": 120
    },
    "trip_id": ""
  }
}
```

### GetProfile

**Request**

```shell
curl --location --request GET '127.0.0.1:9900/profile' \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTYxMTMyNDQ2NjEwMzU4NjgxNiwiZXhwIjoxNjc1NTk2NzIxLCJpc3MiOiJGcmVlQ2FyIiwibmJmIjoxNjczMDA0NzIxfQ.THlMej2DgC3Lbt-TROkX55lMe9KZm9k2_VGvfKlW4Tk'
```

**Response**

```json
{
  "code": 10000,
  "message": "Success",
  "data": {
    "identity": {
      "lic_number": "",
      "name": "",
      "gender": 0,
      "birth_date_millis": 0
    },
    "identity_status": 0
  }
}
```

### SubmitProfile

**Request**

```shell
curl --location --request POST '127.0.0.1:9900/profile' \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTYxMTMyNDQ2NjEwMzU4NjgxNiwiZXhwIjoxNjc1NTk2NzIxLCJpc3MiOiJGcmVlQ2FyIiwibmJmIjoxNjczMDA0NzIxfQ.THlMej2DgC3Lbt-TROkX55lMe9KZm9k2_VGvfKlW4Tk' \
  --data-raw '{
    "identity": {
        "lic_number": "123456789",
        "name": "FreeCar",
        "gender": 1,
        "birth_date_millis": 1058190205
    }
}'
```

**Response**

```json
{
  "code": 10000,
  "message": "Success",
  "data": {
    "identity": {
      "lic_number": "123456789",
      "name": "FreeCar",
      "gender": 1,
      "birth_date_millis": 1058190205
    },
    "identity_status": 1
  }
}
```

### ClearProfile

**Request**

```shell
curl --location --request DELETE '127.0.0.1:9900/profile' \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTYxMTMyNDQ2NjEwMzU4NjgxNiwiZXhwIjoxNjc1NTk2NzIxLCJpc3MiOiJGcmVlQ2FyIiwibmJmIjoxNjczMDA0NzIxfQ.THlMej2DgC3Lbt-TROkX55lMe9KZm9k2_VGvfKlW4Tk'
```

**Response**

```json
{
  "code": 10000,
  "message": "Success",
  "data": {
    "identity": {
      "lic_number": "",
      "name": "",
      "gender": 0,
      "birth_date_millis": 0
    },
    "identity_status": 0
  }
}
```

### CreateProfilePhoto

**Request**

```shell
curl --location --request POST '127.0.0.1:9900/profile/photo' \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTYxMTMyNDQ2NjEwMzU4NjgxNiwiZXhwIjoxNjc1NTk2NzIxLCJpc3MiOiJGcmVlQ2FyIiwibmJmIjoxNjczMDA0NzIxfQ.THlMej2DgC3Lbt-TROkX55lMe9KZm9k2_VGvfKlW4Tk'
```

**Response**

```json
{
  "code": 10000,
  "message": "Success",
  "data": {
    "url": "https://freecar-1234567.cos"
  }
}
```

### GetProfilePhoto

**Request**

```shell
curl --location --request GET '127.0.0.1:9900/profile/photo' \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTYxMTMyNDQ2NjEwMzU4NjgxNiwiZXhwIjoxNjc1NTk2NzIxLCJpc3MiOiJGcmVlQ2FyIiwibmJmIjoxNjczMDA0NzIxfQ.THlMej2DgC3Lbt-TROkX55lMe9KZm9k2_VGvfKlW4Tk'
```

**Response**

```json
{
  "code": 10000,
  "message": "Success",
  "data": {
    "url": "https://freecar-1234567.cos"
  }
}
```

### ClearProfilePhoto

**Request**

```shell
curl --location --request DELETE '127.0.0.1:9900/profile/photo' \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTYxMTMyNDQ2NjEwMzU4NjgxNiwiZXhwIjoxNjc1NTk2NzIxLCJpc3MiOiJGcmVlQ2FyIiwibmJmIjoxNjczMDA0NzIxfQ.THlMej2DgC3Lbt-TROkX55lMe9KZm9k2_VGvfKlW4Tk'
```

**Response**

```json
{
  "code": 10000,
  "message": "Success",
  "data": {}
}
```

### CreateTrip

**Request**

```shell
curl --location --request POST '127.0.0.1:9900/trip' \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTYxMTMyNDQ2NjEwMzU4NjgxNiwiZXhwIjoxNjc1NTk2NzIxLCJpc3MiOiJGcmVlQ2FyIiwibmJmIjoxNjczMDA0NzIxfQ.THlMej2DgC3Lbt-TROkX55lMe9KZm9k2_VGvfKlW4Tk' \
  --data-raw '{
    "start": {
        "latitude": 123.11,
        "longitude": 122.78
    },
    "car_id": "63b813565e992cb7509b215d",
    "avatar_url": "url"
}'
```

**Response**

```json
{
  "code": 10000,
  "message": "Success",
  "data": {
    "id": "63b81364ce0713e67dab8856",
    "trip": {
      "account_id": 1611324466103586816,
      "car_id": "63b813565e992cb7509b215d",
      "start": {
        "location": {
          "latitude": 123.11,
          "longitude": 122.78
        },
        "fee_cent": 0,
        "km_driven": 0,
        "poi_name": "综合实验大楼",
        "timestamp_sec": 1673007972
      },
      "current": {
        "location": {
          "latitude": 123.11,
          "longitude": 122.78
        },
        "fee_cent": 0,
        "km_driven": 0,
        "poi_name": "综合实验大楼",
        "timestamp_sec": 1673007972
      },
      "end": {
        "location": null,
        "fee_cent": 0,
        "km_driven": 0,
        "poi_name": "",
        "timestamp_sec": 0
      },
      "status": 1,
      "identity_id": "eyJsaWNfbnVtYmVyIjoiMTIzNDU2Nzg5IiwibmFtZSI6IkZyZWVDYXIiLCJnZW5kZXIiOjEsImJpcnRoX2RhdGVfbWlsbGlzIjoxMDU4MTkwMjA1fQ=="
    }
  }
}
```

### GetTrip

**Request**

```shell
curl --location --request GET '127.0.0.1:9900/trip/63b81364ce0713e67dab8856' \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTYxMTMyNDQ2NjEwMzU4NjgxNiwiZXhwIjoxNjc1NTk2NzIxLCJpc3MiOiJGcmVlQ2FyIiwibmJmIjoxNjczMDA0NzIxfQ.THlMej2DgC3Lbt-TROkX55lMe9KZm9k2_VGvfKlW4Tk'
```

**Response**

```json
{
  "code": 10000,
  "message": "Success",
  "data": {
    "account_id": 1611324466103586816,
    "car_id": "63b813565e992cb7509b215d",
    "start": {
      "location": {
        "latitude": 123.11,
        "longitude": 122.78
      },
      "fee_cent": 0,
      "km_driven": 0,
      "poi_name": "综合实验大楼",
      "timestamp_sec": 1673007972
    },
    "current": {
      "location": {
        "latitude": 123.11,
        "longitude": 122.78
      },
      "fee_cent": 0,
      "km_driven": 0,
      "poi_name": "综合实验大楼",
      "timestamp_sec": 1673007972
    },
    "end": {
      "location": null,
      "fee_cent": 0,
      "km_driven": 0,
      "poi_name": "",
      "timestamp_sec": 0
    },
    "status": 1,
    "identity_id": "eyJsaWNfbnVtYmVyIjoiMTIzNDU2Nzg5IiwibmFtZSI6IkZyZWVDYXIiLCJnZW5kZXIiOjEsImJpcnRoX2RhdGVfbWlsbGlzIjoxMDU4MTkwMjA1fQ=="
  }
}
```

### GetTrips

**Request**

```shell
curl --location --request GET '127.0.0.1:9900/trips' \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTYxMTMyNDQ2NjEwMzU4NjgxNiwiZXhwIjoxNjc1NTk2NzIxLCJpc3MiOiJGcmVlQ2FyIiwibmJmIjoxNjczMDA0NzIxfQ.THlMej2DgC3Lbt-TROkX55lMe9KZm9k2_VGvfKlW4Tk'
```

**Response**

```json
{
  "code": 10000,
  "message": "Success",
  "data": {
    "trips": [
      {
        "id": "63b81364ce0713e67dab8856",
        "trip": {
          "account_id": 1611324466103586816,
          "car_id": "63b813565e992cb7509b215d",
          "start": {
            "location": {
              "latitude": 123.11,
              "longitude": 122.78
            },
            "fee_cent": 0,
            "km_driven": 0,
            "poi_name": "综合实验大楼",
            "timestamp_sec": 1673007972
          },
          "current": {
            "location": {
              "latitude": 123.11,
              "longitude": 122.78
            },
            "fee_cent": 0,
            "km_driven": 0,
            "poi_name": "综合实验大楼",
            "timestamp_sec": 1673007972
          },
          "end": {
            "location": null,
            "fee_cent": 0,
            "km_driven": 0,
            "poi_name": "",
            "timestamp_sec": 0
          },
          "status": 1,
          "identity_id": "eyJsaWNfbnVtYmVyIjoiMTIzNDU2Nzg5IiwibmFtZSI6IkZyZWVDYXIiLCJnZW5kZXIiOjEsImJpcnRoX2RhdGVfbWlsbGlzIjoxMDU4MTkwMjA1fQ=="
        }
      }
    ]
  }
}
```

### UpdateTrip

**Request**

```shell
curl --location --request POST '127.0.0.1:9900/trip/63b81364ce0713e67dab8856' \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTYxMTMyNDQ2NjEwMzU4NjgxNiwiZXhwIjoxNjc1NTk2NzIxLCJpc3MiOiJGcmVlQ2FyIiwibmJmIjoxNjczMDA0NzIxfQ.THlMej2DgC3Lbt-TROkX55lMe9KZm9k2_VGvfKlW4Tk' \
  --data-raw '{
    "current": {
        "latitude": 113.11,
        "longitude": 112.78
    },
    "end_trip":false
}'
```

**Response**

```json
{
  "code": 10000,
  "message": "Success",
  "data": {
    "account_id": 1611324466103586816,
    "car_id": "63b813565e992cb7509b215d",
    "start": {
      "location": {
        "latitude": 123.11,
        "longitude": 122.78
      },
      "fee_cent": 0,
      "km_driven": 0,
      "poi_name": "综合实验大楼",
      "timestamp_sec": 1673007972
    },
    "current": {
      "location": {
        "latitude": 113.11,
        "longitude": 112.78
      },
      "fee_cent": 914,
      "km_driven": 1.5129536144797615,
      "poi_name": "中心食堂",
      "timestamp_sec": 1673009357
    },
    "end": {
      "location": null,
      "fee_cent": 0,
      "km_driven": 0,
      "poi_name": "",
      "timestamp_sec": 0
    },
    "status": 1,
    "identity_id": "eyJsaWNfbnVtYmVyIjoiMTIzNDU2Nzg5IiwibmFtZSI6IkZyZWVDYXIiLCJnZW5kZXIiOjEsImJpcnRoX2RhdGVfbWlsbGlzIjoxMDU4MTkwMjA1fQ=="
  }
}
```

## 开发指南

通过直接阅读源码来了解此项目是非常困难的，在此提供开发指南方便开发者快速了解并上手此项目包括 Kitex、Hertz 等框架。

### 前置准备

通过快速开始中的命令快速启动所需的工具与环境，若需要特殊定制请修改 `docker-compose.yaml` 与 Nacos 配置中的内容。

### IDL

在开发之前我们需要定义好 IDL 文件，其中 hz
为开发者提供了许多定制化的 [api 注解](https://www.cloudwego.io/zh/docs/hertz/tutorials/toolkit/toolkit/#%E6%94%AF%E6%8C%81%E7%9A%84-api-%E6%B3%A8%E8%A7%A3)。

示例代码：

```thrift
namespace go auth

struct LoginRequest {
    1: string code
}

struct LoginResponse {
    1: i64 accountID
}

service AuthService {
    LoginResponse Login(1: LoginRequest req)
}
```

### 代码生成

#### Kitex

在新增服务目录下执行，每次仅需更改服务名与 IDL 路径。

##### 服务端

```shell
kitex -service auth -module github.com/CyanAsterisk/FreeCar ./../../idl/auth.thrift
```

##### 客户端

```shell
kitex -module github.com/CyanAsterisk/FreeCar ./../../idl/auth.thrift
```

注意项：

- 用 `-module github.com/CyanAsterisk/FreeCar` 该参数用于指定生成代码所属的 Go 模块，避免路径问题。
- 当前服务需要调用其他服务时需生成客户端文件。

#### Hertz

##### 初始化

```shell
hz new -idl ./../../idl/api.proto -mod github.com/CyanAsterisk/FreeCar/server/cmd/api
```

##### 更新

```shell
hz update -I -idl ./../../idl/api.proto
```

注意项：

- 用 `-module github.com/CyanAsterisk/FreeCar/server/cmd/api` 该参数用于指定生成代码所属的 Go 模块，避免路径问题。

### 业务开发

在代码生成完毕后需要先将一些必须组件添加到项目中。由于 api 层不必再次添加，因此以下主要讲解关于 Kitex-Server
部分，代码位于 `server/cmd` 下。

#### Config

参考 `server/cmd/auth/config`，为微服务的配置结构体。

#### Global

参考 `server/cmd/auth/global`，为微服务提供可全局调用的方法。

#### Initialize

参考 `server/cmd/auth/initialize`，提供必要组件的初始化功能，其中 `nacos.go` `flag.go` `logger.go` 为必须项。

#### Tool

参考 `server/cmd/auth/tool`，提供微服务的工具函数，其中 `port.go` 为必须项。

#### API

在写网关层的业务逻辑时，仅需要每次更新 IDL 与新的微服务客户端代码，若需要添加新的组件直接添加即可，项目高度可拔插，架构与微服务层相似。

网关层的业务逻辑在 `server/cmd/api/biz` 下，大部分代码会自动生成。若需要单独新增路由需要到 `server/cmd/api/router.go` 中。

关于中间件的使用，只需要在 `server/cmd/api/biz/router/api/middleware.go` 中添加中间件逻辑。

## 许可证

FreeCar 在 Apache 许可证 2.0 版下开源。
