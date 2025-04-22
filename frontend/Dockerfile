FROM nginx:1.23.3-alpine as build

LABEL name="forms-frontend" \
      description="Forms application Vuejs + Vite"

COPY nginx /etc/nginx

RUN touch ./off \
  && chmod o+rw ./off \
  && echo "forms-frontend: $COMMIT_SHA" >> /etc/nginx/commit.sha

WORKDIR /usr/static

COPY ./dist .

# Gives nginx permission to write in the folder
RUN chmod o+rw /usr/static
RUN chmod o+rw /usr/static/assets

USER nginx

# replace env vars into environment.template.json and writes it into environment.json
CMD ["/bin/sh", "-c", "envsubst < environment.template.json > environment.json && exec nginx -g 'daemon off;'"]
