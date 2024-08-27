PHONY: all modules-tidy build run dev test loadtest coverage dep lint tidy scheck check

ifeq ($(OS),Windows_NT)
	PLATFORM := Windows
else
	PLATFORM := $(shell uname)
endif

# Set an environment variable on Linux used to resolve `docker.host.internal` inconsistencies with
# docker. This can be reworked once https://github.com/docker/for-linux/issues/264 is resolved
# satisfactorily.
ifeq ($(PLATFORM),Linux)
	export IS_LINUX = -linux
else
	export IS_LINUX =
endif

IS_CI ?= false
# Build Flags
BUILD_DATE = $(shell date -u +"%s") # UNIX timestamp 
BUILD_HASH = $(shell git rev-parse HEAD)

all: build build-ui

modules-tidy:
	go mod tidy

build:
	go build -o bin/werank main.go 

build-ui:
	$(MAKE) -C frontend build
	
run:
	go run main.go

dev:
	export DEBUG=1 && air .

test:
	go test ./... -short -count=1 -timeout 30s

coverage:
	go test ./... -coverprofile=coverage.out && go tool cover -html=coverage.out -o coverage.html

dep:
	go mod download
	
lint:
	golines -m 120 -w --no-reformat-tags .
	gci write --skip-generated -s standard -s default .
	go fmt ./...
	golangci-lint run --fast -c ./golangci.yml
	

tidy:
	go mod tidy

scheck:
	staticcheck ./...

check: scheck