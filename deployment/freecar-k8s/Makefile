generate:
	kubectl apply -f $(basic).yaml

ingress:
	make basic=ingress generate

dashboard:
	make basic=dashboard generate
	make basic=auth generate

sc:
	make basic=sc generate

test:
	make ingress
	make sc