# start the environment of FreeCar
.PHONY: start
start:
	docker-compose up -d

# stop the environment of FreeCar
.PHONY: stop
stop:
	docker-compose down

# migrate mysql database
.PHONY: migrate
migrate:
	go run server/cmd/auth/model/migrate/main.go
	go run server/cmd/blob/model/migrate/main.go

# run the auth
.PHONY: auth
auth:
	go run server/cmd/auth/*.go

# run the blob
.PHONY: blob
blob:
	go run server/cmd/blob/*.go

# run the car
.PHONY: car
car:
	go run server/cmd/car/*.go

# run the profile
.PHONY: profile
profile:
	go run server/cmd/profile/*.go

# run the trip
.PHONY: trip
trip:
	go run server/cmd/trip/*.go

# run the api
.PHONY: api
api:
	go run server/cmd/api/*.go