.PHONY: test

test:
	npx jest --verbose

.PHONY: \
	build \
	build.install \
	build.setup \
	build.setup.validate \
	build.compile \

build: \
	build.install \
	build.setup \
	build.setup.validate \
	build.compile \

build.install:
	npm ci --ignore-scripts

build.clean:
	rm -rf build/workspace

build.setup:
	mkdir -p build/workspace

	cp package.json build/workspace/package.json
	cp package-lock.json build/workspace/package-lock.json

build.setup.validate:
	test -f build/workspace/package.json
	test -f build/workspace/package-lock.json

build.compile:
	npx tsc --version
	npx tsc -p build/tsconfig.json

build.compile.validate:
	test -f build/workspace/marshall.js
	test -f build/workspace/marshall.d.js