.PHONY: create update upload build

VERSION := 1.0.8
MODULE_NAME := sample-multimachine-app-module
ORG_PUBLIC_NAMESPACE := nicolas-viam

create:
	viam module create --name=${MODULE_NAME} --public-namespace=${ORG_PUBLIC_NAMESPACE}

update:
	viam module update --module=meta.json

upload: build
	viam module upload --version=${VERSION} --platform=any --public-namespace=${ORG_PUBLIC_NAMESPACE} module

build:
	cd src && npm install && npm run build
	tar czf module.tar.gz module meta.json
