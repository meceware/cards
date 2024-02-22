FROM node:alpine as base

# -------------------------------------------

FROM base AS builder
WORKDIR /app
COPY . .
RUN npm install

# -------------------------------------------

FROM base AS production
ENV NEXT_TELEMETRY_DISABLED 1
ENV HOSTNAME "0.0.0.0"
ENV PORT 3000
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD npm run build && npm start

# -------------------------------------------

FROM base as dev
ENV NEXT_TELEMETRY_DISABLED 1
ENV HOSTNAME "0.0.0.0"
ENV PORT 3000
ENV NODE_ENV development
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD npm run dev
