# eg. make service=video generate
generate:
	kitex -module github.com/CyanAsterisk/FreeCar ./../idl/$(service).thrift

all:
	make service=auth generate
	make service=blob generate
	make service=car generate
	make service=profile generate
	make service=trip generate
	make service=errno generate
