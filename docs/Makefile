
#######
# This Makefile contains all targets related to the documentation
#######

DOCS_LINT_SKIP ?= false

DOCS_BUILD_IMAGE ?= wshihadeh-docs
DOCS_CHECK_IMAGE ?= $(DOCS_BUILD_IMAGE)-check

SITE_DIR := $(CURDIR)/site
REPO_ROOT := $(abspath $(CURDIR)/..)
WEB_BUILD_IMAGE ?= node:22-alpine

DOCKER_RUN_DOC_PORT := 8000
DOCKER_RUN_DOC_MOUNTS := -v $(CURDIR):/mkdocs
DOCKER_RUN_DOC_OPTS := --rm $(DOCKER_RUN_DOC_MOUNTS) -p $(DOCKER_RUN_DOC_PORT):8000

# Default: generates the documentation into $(SITE_DIR)
# The landing page (web/) is built first because it owns the site root,
# then MkDocs writes the documentation into $(SITE_DIR)/docs.
docs: docs-clean docs-image docs-lint docs-landing docs-build

# Writer Mode: build and serve docs on http://localhost:8000 with livereload
docs-serve: docs-image
	docker run  $(DOCKER_RUN_DOC_OPTS) $(DOCS_BUILD_IMAGE) mkdocs serve

# Utilities Targets for each step
docs-image:
	docker build -t $(DOCS_BUILD_IMAGE) -f docs.Dockerfile ./

# Build the Astro landing page into $(SITE_DIR). The sources are copied inside the
# container so host node_modules (other OS, other native binaries) are never touched.
docs-landing:
	docker run --rm -v $(REPO_ROOT):/repo $(WEB_BUILD_IMAGE) sh -c "\
		mkdir /build \
		&& tar -C /repo/web --exclude=node_modules --exclude=.astro -cf - . | tar -C /build -xf - \
		&& cd /build && npm ci --no-audit --no-fund \
		&& npx astro build --outDir /build/dist \
		&& mkdir -p /repo/docs/site && cp -R /build/dist/. /repo/docs/site/ \
		&& chown -R $(shell id -u):$(shell id -g) /repo/docs/site"

docs-build: docs-image
	docker run $(DOCKER_RUN_DOC_OPTS) $(DOCS_BUILD_IMAGE) sh -c "mkdocs build \
		&& chown -R $(shell id -u):$(shell id -g) ./site"

docs-lint:
	@if [ "$(DOCS_LINT_SKIP)" != "true" ]; then \
		docker build -t $(DOCS_CHECK_IMAGE) -f check.Dockerfile ./ && \
		docker run --rm -v $(CURDIR):/app $(DOCS_CHECK_IMAGE) /lint.sh; \
	else \
		echo "DOCS_LINT_SKIP is true: no linting done."; \
	fi

docs-clean:
	rm -rf $(SITE_DIR)

.PHONY: all docs docs-clean docs-landing docs-build docs-lint
