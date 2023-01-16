![FreeCar](static/resources/FreeCar.png)

English | [中文](README_zh.md)

FreeCar is a full-stack WeChat applet based on Kitex and Hertz.

## Architecture

### Call Relations
![call_relations.png](static/resources/call_relation.png)
### Technology Architecture
TODO
### Service Relations
![service_relations.png](static/resources/service_relations.png)
## Catalog Introduce

| Catalog | Introduce                    |
|---------|------------------------------|
| Server  | Core services of the project |
| Shared  | Reusable code                |
| Static  | Front-end static files       |

## Quick Start

### Start the Dependence

```shell
make start
```

### Nacos

> Visit `http://127.0.0.1:8848/nacos/index.html#/login` on browser.
>
> For the default namespace and configuration groups, please refer to each `config.yaml` configuration file.

![nacos.png](static/resources/nacos.png)

*api => API_GROUP*

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

*auth_srv => AUTH_GROUP*

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

*blob_srv => BLOB_GROUP*

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

*car_srv => CAR_GROUP*

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

*profile_srv => RENTAL_GROUP*

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

*trip_srv => RENTAL_GROUP*

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
make blob
make car
make profile
make trip
```

### Jaeger

> Visit `http://127.0.0.1:16686/` on browser.

![jaeger.jpg](static/resources/jaeger.jpg)

### Consul

> Visit `http://127.0.0.1:8500/` on browser.

![consul.jpg](static/resources/consul.png)

### Prometheus

> Visit `http://127.0.0.1:3000/` on browser.

![prometheus.jpg](static/resources/prometheus.png)

## API Requests

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

## CookBook

It is very difficult to understand this project by directly reading the source code. Here is a development guide for
developers to quickly understand and get started with this project, including frameworks such as Kitex and Hertz.

### Preparation

Use the commands in the quick start to quickly start the required tools and environment. If you need special
customization, please modify the contents of `docker-compose.yaml` and Nacos configuration.

### IDL

Before development, we need to define the IDL file, among which hz provides developers with many
customized [api annotations](https://www.cloudwego.io/zh/docs/hertz/tutorials/toolkit/toolkit/#%E6%94%AF%E6%8C%81%E7%9A%84-api-%E6%B3%A8%E8%A7%A3).

Sample code:

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

### Code Generation

#### Kitex

Execute under the new service directory, only need to change the service name and IDL path each time.

##### Server

```shell
kitex -service auth -module github.com/CyanAsterisk/FreeCar ./../../idl/auth.thrift
```

##### Client

```shell
kitex -module github.com/CyanAsterisk/FreeCar ./../../idl/auth.thrift
```

Note:

- Use `-module github.com/CyanAsterisk/FreeCar` This parameter is used to specify the Go module to which the generated
  code belongs to avoid path problems.
- When the current service needs to call other services, a client file needs to be generated.

#### Hertz

##### Initialize

```shell
hz new -idl ./../../idl/api.proto -mod github.com/CyanAsterisk/FreeCar/server/cmd/api
```

##### Update

```shell
hz update -I -idl ./../../idl/api.proto
```

Note:

- Use `-module github.com/CyanAsterisk/FreeCar/server/cmd/api` This parameter is used to specify the Go module to which
  the generated code belongs to avoid path problems.

### Business Development

After the code is generated, some necessary components need to be added to the project. Since the api layer does not
need to be added again, the following mainly explains the part about Kitex-Server, and the code is located
under `server/cmd`.

#### Config

Refer to `server/cmd/auth/config` for the configuration structure of microservices.

#### Global

Refer to `server/cmd/auth/global` to provide globally callable methods for microservices.

#### Initialize

Refer to `server/cmd/auth/initialize` to provide the initialization function of the necessary components, among
which `config.go` `flag.go` `logger.go` `registry.go` are required.

#### Tool

Refer to `server/cmd/auth/tool` to provide tool functions for microservices, where `port.go` is required.

#### API

When writing the business logic of the gateway layer, you only need to update the IDL and the new microservice client
code each time. If you need to add new components, you can add them directly. The project is highly pluggable, and the
architecture is similar to the microservice layer.

The business logic of the gateway layer is under `server/cmd/api/biz`, and most of the code will be automatically
generated. If you need to add a new route separately, you need to go to `server/cmd/api/router.go`.

Regarding the use of middleware, you only need to add middleware logic in `server/cmd/api/biz/router/api/middleware.go`.

## License

FreeCar is distributed under the Apache License, version 2.0.
