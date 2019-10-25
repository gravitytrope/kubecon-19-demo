SHELL := /usr/bin/env bash

DOCKER_REPO ?= localhost:31000/demo
TAG ?= latest

.PHONY: diff build docker.tag docker.commit image.push

build:
	npm install && \
	npm run build

clean:
	rm -rf node_modules
	rm -rf build
	rm package-lock.json

image.build:
	docker build \
	-t $(DOCKER_REPO):ui-$(TAG) \
	-f Dockerfile \
	.

image.push: image.build
	docker push \
	$(DOCKER_REPO):ui-$(TAG)
