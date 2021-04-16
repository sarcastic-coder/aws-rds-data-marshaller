# ---
# --- Code
# ---

.PHONY: \
	code \
	code.fix

code:
	npx eslint \
		--cache \
		--cache-location .eslintcache \
		--format codeframe \
			.

code.fix:
	npx eslint \
		--cache \
		--cache-location .eslintcache \
		--fix \
		--format codeframe \
			.

# ---
# --- Testing
# ---

.PHONY: test

test:
	npx jest --verbose

# ---
# --- Build
# ---

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