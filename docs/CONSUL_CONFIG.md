## Consul Config

_freecar/api_srv_

```json
{
  "name": "api",
  "port": 8080,
  "paseto": {
    "pub_key": "YOUR_KEY",
    "implicit": "YOUR-IMPLICIT"
  },
  "otel": {
    "endpoint": ":4317"
  },
  "user_srv":{
    "name": "user_srv"
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

_freecar/user_srv_

```json
{
  "name": "user_srv",
  "paseto": {
    "pub_key": "YOUR_KEY",
    "implicit": "YOUR-IMPLICIT"
  },
  "mysql": {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "YOUR_USER",
    "password": "YOUR_PASSWORD",
    "db": "FreeCar",
    "salt": "YOUR_SALT"
  },
  "otel": {
    "endpoint": ":4317"
  },
  "wx_config":{
    "app_id": "YOUR_ID",
    "app_secret": "YOUR_SECRET"
  },
  "blob_srv":{
    "name":"blob_srv"
  }
}
```

_freecar/blob_srv_

```json
{
  "name": "blob_srv",
  "mysql": {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "YOUR_USER",
    "password": "YOUR_PASSWORD",
    "db": "FreeCar",
    "salt": "YOUR_SALT"
  },
  "redis": {
    "host": "127.0.0.1",
    "port": 6379
  },
  "minio": {
    "endpoint": "127.0.0.1:9000",
    "access_key_id": "YOUR_KEY",
    "secret_access_key": "YOUR_SECRET",
    "bucket":"freecar"
  },
  "otel": {
    "endpoint": ":4317"
  }
}
```

_freecar/car_srv_

```json
{
  "name": "car_srv",
  "wsAddr":":9992",
  "mongodb": {
    "host": "127.0.0.1",
    "port": 27017,
    "user": "YOUR_USER",
    "password": "YOUR_PASSWORD",
    "db": "FreeCar",
    "collection": "car"
  },
  "redis": {
    "host": "127.0.0.1",
    "port": 6379
  },
  "rabbitmq": {
    "host": "127.0.0.1",
    "port": 5672,
    "user": "YOUR_USER",
    "password": "YOUR_PASSWORD",
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

_freecar/profile_srv_

```json
{
  "name": "profile_srv",
  "mongodb": {
    "host": "127.0.0.1",
    "port": 27017,
    "user": "YOUR_USER",
    "password": "YOUR_PASSWORD",
    "db": "FreeCar",
    "collection": "car"
  },
  "redis": {
    "host": "127.0.0.1",
    "port": 6379
  },
  "ocr": {
    "access_token": "YOUR_TOKEN"
  },
  "otel": {
    "endpoint": ":4317"
  },
  "blob_srv": {
    "name": "blob_srv"
  }
}
```

_freecar/trip_srv_

```json
{
  "name": "trip_srv",
  "mongodb": {
    "host": "127.0.0.1",
    "port": 27017,
    "user": "YOUR_USER",
    "password": "YOUR_PASSWORD",
    "db": "FreeCar",
    "collection": "car"
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
