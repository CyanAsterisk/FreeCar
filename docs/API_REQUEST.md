## API Requests

### Login

**Request**

```shell
curl --location --request POST '127.0.0.1:9900/user/login' \
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