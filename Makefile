# ---
# --- Install
# ---

.PHONY: install

install:
	npm ci --no-scripts

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
	find build/workspace/ -type f -name *.test.js -delete
	find build/workspace/ -type f -name *.test.js.map -delete
	find build/workspace/ -type f -name *.test.d.ts -delete

build.compile.validate:
	test -f build/workspace/marshall.js
	test -f build/workspace/marshall.d.js

# ---
# --- Change Log
# ---

# The dependencies here are not installed in the package.json.
# Instead we just use npx to download as needed.
# Do not want to bloat the package file as it increases CI times.

.PHONY: \
	changelog \
	changelog.update

changelog:
	npx standard-version \
		--skip.commit \
		--skip.tag \
		--release-as $(VERSION) \
		--dry-run
	# An npm install will be ran after this.
	# Forces an update on the lockfile
	# New lockfile stores the version in more places than the above command knows.
	# > npm install

changelog.update:
	npx standard-version \
		--skip.commit \
		--skip.tag \
		--release-as $(VERSION)
	# Forces an update on the lockfile
	# New lockfile stores the version in more places than the above command knows.
	npm install
