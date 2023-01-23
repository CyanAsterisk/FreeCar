## Nacos Config

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