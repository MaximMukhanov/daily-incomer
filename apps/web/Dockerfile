# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!
FROM node:16-alpine AS base

# BUILDER
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=web --docker

# INSTALLER
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
RUN yarn install

# SOURCER
FROM base AS sourcer
RUN apk update
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN yarn turbo run build --scope=web --include-dependencies --no-deps

# RUNNER
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs=
COPY --from=sourcer /app/apps/web/next.config.js .
COPY --from=sourcer /app/apps/web/package.json .
COPY --from=sourcer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=sourcer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=sourcer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
CMD ["node" , "apps/web/server.js"]
