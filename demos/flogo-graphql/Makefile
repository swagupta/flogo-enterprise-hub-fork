# Variables
FLOGO_FILE=flogo-graphql.flogo
IMAGE_NAME=flogo-graphql
TAG=latest
CONTAINER_NAME=flogo-graphql-container
REGISTRY=registry.vmlab.live
FLOGO_CONTEXT=latest

# Default target
.PHONY: all
all: build

.PHONY: build
build: build-binary build-container

.PHONY: build-binary
build-binary:
	flogo-cli build-exe -c ${FLOGO_CONTEXT} -n ./bin/${IMAGE_NAME} -f ./app/${FLOGO_FILE}

.PHONY: build-mock-binary
build-mock-binary:
	flogo-cli build-exe -c ${FLOGO_CONTEXT} -n ./mock/bin/${IMAGE_NAME} -f ./mock/${FLOGO_FILE}

# Build the Docker image
.PHONY: build-container
build-container:
	docker build -t $(IMAGE_NAME):$(TAG) .

# Tag the Docker image
.PHONY: docker-tag
docker-tag:
	docker tag $(IMAGE_NAME):$(TAG) $(IMAGE_NAME):$(TAG)
	docker tag $(IMAGE_NAME):$(TAG) $(REGISTRY)/$(IMAGE_NAME):$(TAG) 

# Push image to the registry
.PHONY: docker-push
docker-push:
	docker push $(REGISTRY)/$(IMAGE_NAME):$(TAG) 

.PHONY:  remove-binary
remove-binary:
	rm ./bin/${IMAGE_NAME}

.PHONY: start
start:
	docker compose up -d

.PHONY: stop
stop:
	docker compose down 
	
# Clean up images and containers
.PHONY: clean
clean: stop remove-image remove-binary
