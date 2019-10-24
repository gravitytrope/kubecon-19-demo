DOCKER_REPO="quay.io/datawire/tour"

ci:
	docker login -u="datawire+releasebot" -p=$(DOCKER_PASSWORD) quay.io

	make -C backend image.push DOCKER_REPO=$(DOCKER_REPO) TAG=$(TRAVIS_TAG)
	make -C ui      image.push DOCKER_REPO=$(DOCKER_REPO) TAG=$(TRAVIS_TAG)
