FROM node:16-alpine AS base
WORKDIR /app
COPY . .

FROM base AS development
RUN npm ci

FROM base AS builder
RUN npm ci
RUN npm run compile

FROM base AS production
COPY --from=builder /app/build ./build/
RUN npm ci --production
