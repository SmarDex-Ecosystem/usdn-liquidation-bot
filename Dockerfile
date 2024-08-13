FROM node:20 AS install

WORKDIR /usr/app

COPY ./package*.json ./
COPY ./tsconfig*.json ./
COPY ./src ./src

# Copy .npmrc file (for CodeArtifact access)
ARG NPMRC 
RUN $(echo "$NPMRC" > .npmrc)

RUN npm install
RUN npm run build
RUN rm -f .npmrc

### DEV
FROM node:20-alpine AS development

WORKDIR /usr/app

COPY --from=install /usr/app/ ./
COPY ./nodemon.json ./

ENV PATH /usr/app/node_modules/.bin:$PATH

### PROD
FROM node:20-slim AS production

WORKDIR /usr/app

COPY --from=install /usr/app/dist ./dist
COPY --from=install /usr/app/node_modules ./node_modules

CMD node /usr/app/dist/index.cjs