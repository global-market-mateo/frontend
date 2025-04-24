# Base image setup
FROM node:18-alpine AS base

#Install necessary packages
RUN apk add --no-cache libc6-compat

# Set the working directory
WORKDIR /app

################
# Dependencies #
################
FROM base AS dependencies

COPY package.json ./
COPY package-lock.json* ./

RUN \
  if [ -f package-lock.json ]; then \
    npm ci --legacy-peer-deps || { echo "Initialization failed"; exit 1; }; \
  else \ 
    npm install --legacy-peer-deps || { echo "npm install failed"; exit 1; }; \
  fi

################
#    Build     #
################
FROM base AS build

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package-lock.json ./
COPY . .

# Verificar que .env existe antes de copiarlo
RUN test -f .env || { echo ".env file not found" >&2; exit 1; }
COPY .env .env

ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f package-lock.json ]; then \
    npm run build || { echo "Build failed"; exit 1; }; \
  else \
    echo "Lockfile not found during build stage." && exit 1; \
  fi

################
#    Target    #
################
FROM base AS target

# Create necessary system user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from build stage
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
COPY --from=build /app/next.config.mjs ./next.config.mjs
COPY --from=build /app/.env ./.env

# Set the correct permission for prerender cache
RUN mkdir -p .next
RUN chown nextjs:nodejs .next

# Copy Next.js build output
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules

# Set proper permissions for .env
RUN chown nextjs:nodejs .env

USER nextjs

EXPOSE 3000
ENV PORT=3000

# Usar next start en lugar de node server.js
CMD ["npx", "next", "start"]