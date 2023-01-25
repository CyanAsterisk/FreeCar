![FreeCar](static/images/doc/FreeCar.png)

English | [中文](README_zh.md)

FreeCar is a full-stack WeChat applet based on Kitex and Hertz.

## Architecture

### Call Relations

![call_relations.png](static/images/doc/call_relation.png)

### Technology Architecture

![tech_arch](static/images/doc/tech_arch.png)

### Service Relations

![service_relations.png](static/images/doc/service_relations.png)

## Display

![display.png](static/images/doc/display.png)

## Catalog Introduce

| Catalog | Introduce                    |
|---------|------------------------------|
| Server  | Core services of the project |
| Shared  | Reusable code                |
| Static  | WeChat applet code           |

## Service Introduce

| Catalog | Introduce                                          |
|---------|----------------------------------------------------|
| API     | Hertz-based Gateway Service                        |
| Auth    | User Authentication Service                        |
| Blob    | Services Related to Pictures and Tencent Cloud COS |
| Car     | Car Service                                        |
| Profile | Profile and Picture Recognition Services           |
| Trip    | Trip Service                                       |

## Quick Start

### Start the Dependence

```shell
make start
```

### Nacos

> Visit `http://127.0.0.1:8848/nacos/index.html#/login` on browser.
>
> For the default namespace and configuration groups, please refer to each `config.yaml` configuration file.

![nacos.png](static/images/doc/nacos.png)

![nacos_registry.png](static/images/doc/nacos_registry.png)

For details on the configuration of the configuration center, see [more](static/docs/NACOS_CONFIG.md).

### Create Data Table

```shell
make migrate
```

### Start HTTP Service

```shell
make api
```

### Start Microservices

```shell
make auth
make blob
make car
make profile
make trip
```

### Jaeger

> Visit `http://127.0.0.1:16686/` on browser.

![jaeger.jpg](static/images/doc/jaeger.jpg)

### Prometheus

> Visit `http://127.0.0.1:3000/` on browser.

![prometheus.jpg](static/images/doc/prometheus.png)

## API Requests

Sample API request for the project, see [more](static/docs/API_REQUEST.md).

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
which `nacos.go` `flag.go` `logger.go` are required.

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

FreeCar is distributed under the GNU General Public License, version 3.0.
