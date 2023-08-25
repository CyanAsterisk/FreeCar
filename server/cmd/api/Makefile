update:
	hz update -idl ./../../idl/http/$(service).thrift

user:
	make service=user update
car:
	make service=car update
profile:
	make service=profile update
trip:
	make service=trip update
gpt:
	make service=gpt update

all:
	make user
	make car
	make profile
	make trip
	make gpt