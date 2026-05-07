FROM node:20-alpine
WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY tsconfig.json ./

COPY packages/backend/package.json ./packages/backend/
COPY packages/common/package.json ./packages/common/

RUN pnpm install --frozen-lockfile

COPY packages/backend ./packages/backend
COPY packages/common ./packages/common

RUN pnpm --filter @observe-kit/backend add @types/node --save-dev
RUN pnpm --filter @observe-kit/backend build

CMD ["pnpm", "--filter", "@observe-kit/backend", "start"]