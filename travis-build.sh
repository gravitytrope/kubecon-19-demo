#! /bin/bash
DOCKER_REPO="nkrause/tour"
TRAVIS_TAG="latest"

( cd quote && make image.push DOCKER_REPO=$DOCKER_REPO TAG=$TRAVIS_TAG )

( cd ui && make image.push DOCKER_REPO=$DOCKER_REPO TAG=$TRAVIS_TAG )
