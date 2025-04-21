FROM nginx:1.23.3-alpine as build

LABEL name="forms-frontend" \
      description="Forms application Vuejs + Vite"

COPY nginx /etc/nginx

RUN touch ./off \
  && chmod o+rw ./off \
  && echo "forms-frontend: $COMMIT_SHA" >> /etc/nginx/commit.sha

WORKDIR /usr/static

COPY ./dist .

USER nginx
