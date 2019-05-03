SHELL := /usr/bin/env bash

DOCKER_REPO ?= localhost:31000/tour
TAG ?= latest

.PHONY: diff build docker.tag docker.commit image.push

build:
	npm install && \
	npm run build

clean:
	rm -rf node_modules
	rm -rf build
	rm package-lock.json

build.image:
	docker build \
	-t $(DOCKER_REPO):ui-$(TAG) \
	-f Dockerfile \
	.

image.push: build.image
	docker push \
	$(DOCKER_REPO):ui-$(TAG)

