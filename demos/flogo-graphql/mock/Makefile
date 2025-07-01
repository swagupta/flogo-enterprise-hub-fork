# Variables
FLOGO_FILE=flogo-graphql.flogo
IMAGE_NAME=flogo-graphql
FLOGO_CONTEXT=130

# Default target
.PHONY: all
all: build

.PHONY: build
build: build-binary build-tp

.PHONY: build-binary
build-binary:
	flogo-cli build-exe -c ${FLOGO_CONTEXT} -n ./bin/${IMAGE_NAME} -f ./${FLOGO_FILE}

.PHONY: build-tp
build-tp:
	flogo-cli build-tp-deployment -c ${FLOGO_CONTEXT} -f ./${FLOGO_FILE}  -o ./tp

.PHONY:  remove-binary
remove-binary:
	rm ./bin/${IMAGE_NAME}

# Clean up images and containers
.PHONY: clean
clean: stop remove-binary
