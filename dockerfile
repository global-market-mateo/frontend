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

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

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

# Set the correct permission for prerender cache
RUN mkdir -p .next
RUN chown nextjs:nodejs .next

# Copy Next.js build output
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

# Usar next start en lugar de node server.js
CMD ["npx", "next", "start"]