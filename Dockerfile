#stage 1
# npm install and cleanups
FROM dapulse/node:20.11-latest AS build

WORKDIR /private-app
COPY . /private-app

RUN npm install yarn -g && \
    yarn install && \
    yarn transpile && \
    yarn cache clean && \
    rm -rf .npmrc .git

# stage 2
# copy compiled to final image
FROM dapulse/node:20.11-latest
USER node

COPY --from=build --chown=node /private-app /app

EXPOSE 59999
WORKDIR /app

ENTRYPOINT ["/bin/tini", "--"]
CMD ["node", "./dist/app.js"]
