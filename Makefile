.PHONY: create update upload build lint

VERSION := 1.1.1
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

# Fixes formatting in place; CI runs the same check without --write.
lint:
	npx --yes prettier@3.9.10 --write src
