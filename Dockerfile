# For platforms that build from the repo (Coolify, Dokploy, any Docker host).
# The container serves plain HTTP on port 80; the platform adds HTTPS.
# For a bare VPS use `npm run deploy` instead.
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY deploy/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80
