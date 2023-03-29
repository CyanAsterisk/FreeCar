init:
	hz new -idl ./../../idl/api.proto -mod github.com/CyanAsterisk/FreeCar/server/cmd/api
	rm go.mod .gitignore
	git checkout router.go .hz main.go

generate:
	hz new -idl ./../../idl/http/$(service).thrift -mod github.com/CyanAsterisk/FreeCar/server/cmd/api
	rm go.mod .gitignore
	git checkout router.go .hz main.go
user:
	make service=user generate
car:
	make service=car generate
profile:
	make service=profile generate
trip:
	make service=trip generate

all:
	make user
	make car
	make profile
	make trip