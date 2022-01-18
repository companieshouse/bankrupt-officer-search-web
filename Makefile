artifact_name       := bankrupt-officer-search-web
version             := "unversioned"

.PHONY: build
build: clean init build-app

.PHONY: clean
clean:
	rm -f ./$(artifact_name)-*.zip
	rm -rf ./build-*
	rm -rf ./dist
	rm -f ./build.log

.PHONY: build-app
build-app:
	npm run build

.PHONY: init
init:
	npm i

.PHONY: lint
lint:
	npm run lint

.PHONY: test
test:
	npm run test:coverage

.PHONY: test-unit
test-unit:
	npm run test

.PHONY: sonar
sonar:
	npm run analyse-code

.PHONY: package
package: build
ifndef version
	$(error No version given. Aborting)
endif
	$(info Packaging version: $(version))
	$(eval tmpdir := $(shell mktemp -d build-XXXXXXXXXX))
	cp -r ./dist/* $(tmpdir)
	cp -r ./package.json $(tmpdir)
	cp -r ./package-lock.json $(tmpdir)
	cp ./start.sh $(tmpdir)
	cp ./routes.yaml $(tmpdir)
	cd $(tmpdir) && npm i --production
	rm $(tmpdir)/package.json $(tmpdir)/package-lock.json
	cd $(tmpdir) && zip -r ../$(artifact_name)-$(version).zip .
	rm -rf $(tmpdir)

.PHONY: dist
dist: lint test-unit clean package