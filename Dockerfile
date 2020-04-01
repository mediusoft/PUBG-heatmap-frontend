FROM node:13.8.0-alpine as development

ARG REACT_APP_API
ARG REACT_APP_GA
ENV REACT_APP_API $REACT_APP_API
ENV REACT_APP_GA $REACT_APP_GA

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn --production=false

COPY . .

RUN yarn build

FROM nginx:1.17.8-alpine as production

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=development /usr/src/app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

# Healthcheck tool. Set WAIT_HOSTS environment variable in docker-compose
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.2/wait /wait
RUN chmod +x /wait