#! /bin/bash
DOCKER_REPO="quay.io/datawire/tour"

docker login -u="datawire+releasebot" -p=$DOCKER_PASSWORD quay.io

( cd backend && make image.push DOCKER_REPO=$DOCKER_REPO TAG=$TRAVIS_TAG )

( cd ui && make image.push DOCKER_REPO=$DOCKER_REPO TAG=$TRAVIS_TAG )
