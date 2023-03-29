# eg. make service=video generate
generate:
	kitex -module github.com/CyanAsterisk/FreeCar ./../idl/rpc/$(service).thrift

all:
	make service=user generate
	make service=blob generate
	make service=car generate
	make service=profile generate
	make service=trip generate

errno:
	kitex -module github.com/CyanAsterisk/FreeCar ./../idl/base/errno.thrift
