FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

FROM base AS deps
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY tsconfig.json ./
COPY packages/frontend/package.json ./packages/frontend/
COPY packages/common/package.json ./packages/common/
RUN pnpm install --frozen-lockfile

FROM deps AS builder
COPY packages/frontend ./packages/frontend
COPY packages/common ./packages/common
WORKDIR /app/packages/frontend
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

COPY --from=builder /app/packages/frontend/.next/standalone ./
COPY --from=builder /app/packages/frontend/.next/static ./packages/frontend/.next/static
COPY --from=builder /app/packages/frontend/public ./packages/frontend/public

USER nextjs
EXPOSE 3001
CMD ["node", "packages/frontend/server.js"]
