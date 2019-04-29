
all: build image

build:
	ng build --prod --base-href=/dreba/ #--deploy-url=http://192.168.99.100:30417/dreba/

image:
	docker image build -t dreba/web:1.0.0 .
