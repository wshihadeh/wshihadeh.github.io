FROM node:22-alpine

# markdownlint is the only linter used by scripts/lint.sh
RUN npm install --global markdownlint-cli@0.45.0

# tini helps to terminate properly all the parallelized tasks when sending CTRL-C
RUN apk --no-cache --no-progress add tini

COPY ./scripts/lint.sh /lint.sh

WORKDIR /app
VOLUME ["/tmp","/app"]

ENTRYPOINT ["/sbin/tini","-g","sh"]
