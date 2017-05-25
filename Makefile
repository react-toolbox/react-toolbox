MAKEFLAGS = -j1

export NODE_ENV = test

bootstrap:
	make clean-all
	yarn
	./node_modules/.bin/lerna bootstrap

clean-all:
	rm -rf packages/*/build
	rm -rf packages/*/lib
	rm -rf node_modules
	rm -rf packages/*/node_modules
	make clean

clean:
	rm -rf coverage
	rm -rf packages/*/npm-debug*

test-only:
	./scripts/test.sh
	make test-clean

test-ci:
	make bootstrap
	make test
	make lint

test:
	node node_modules/.bin/jest

test-watch:
	node node_modules/.bin/jest --watch --no-watchman

prettier:
	./node_modules/.bin/prettier --write --single-quote "packages/react-toolbox-themr/{src,bin}/**/*.js"

lint:
	make lint-js
	make lint-css
	make lint-ts

lint-js:
	./node_modules/.bin/eslint scripts packages *.js --format=codeframe

lint-css:
	./node_modules/.bin/stylelint packages/*/src/**/*.css

lint-ts:
	./node_modules/.bin/tslint "packages/react-toolbox-core/src/**/*.{ts,tsx}" --type-check --project tsconfig.base.json

fix:
	./node_modules/.bin/eslint scripts packages *.js --format=codeframe --fix
