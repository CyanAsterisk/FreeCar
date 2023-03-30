# eg. make service=video generate
generate:
	kitex -module github.com/CyanAsterisk/FreeCar ./../idl/rpc/$(service).thrift

user:
	make service=user generate
blob:
	make service=blob generate
car:
	make service=car generate
profile:
	make service=profile generate
trip:
	make service=trip generate
errno:
	kitex -module github.com/CyanAsterisk/FreeCar ./../idl/base/errno.thrift

all:
	make user
	make blob
	make car
	make profile
	make trip
	make errno

