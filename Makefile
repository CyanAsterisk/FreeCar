SHELL := /bin/bash

.PHONY: \
	help \
	coverage \
	vet \
	fmt \
	version

all: imports fmt vet errors build

help:
	@echo 'Usage: make <OPTIONS> ... <TARGETS>'
	@echo ''
	@echo 'Available targets are:'
	@echo ''
	@echo '    help               Show this help screen.'
	@echo '    coverage           Report code tests coverage.'
	@echo '    vet                Run go vet.'
	@echo '    fmt                Run go fmt.'
	@echo '    version            Display Go version.'
	@echo ''
	@echo 'Targets run by default are: lint, vet.'
	@echo ''

print-%:
	@echo $* = $($*)

deps:
	go get golang.org/x/lint/golint

coverage:
	go test $(go list ./... | grep -v examples) -coverprofile coverage.txt ./...

vet:
	go vet ./...

fmt:
	go install mvdan.cc/gofumpt@latest
	gofumpt -l -w -extra .

pre-dev:
	make pre-commit

pre-commit:
	bash script/pre-commit-hook

release: package-release sign-release

version:
	@go version