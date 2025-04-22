FROM node:22.14.0-alpine as build

ARG COMMIT_SHA=<not-specified>
ENV NODE_ENV=production

WORKDIR /build-dir

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY ./dist ./dist

RUN echo "froms backend: $COMMIT_SHA" >> ./commit.sha

########################################################################################################################

FROM node:22.14.0-alpine

LABEL maintainer="callebe.gomes@cnhind.com" \
      name="froms backend" \
      description="Nodejs express microservice"

ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV LOG_FORMAT=combined
ENV SERVICE_PREFIX=/
ENV FORM_HTTP_PORT=3000
ENV FORM_HTTP_HOST=0.0.0.0

WORKDIR /home/node/app

COPY --from=build /build-dir ./

USER node

CMD ["npm", "start"]
