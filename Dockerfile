# Use the official Node.js image as the base
FROM node:20-alpine AS base
RUN corepack enable

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install necessary dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Remix app
# Remix can use environment variables during the build process if needed.
# You can mount secrets or pass environment variables if needed for build-time
# secrets like API keys.
RUN --mount=type=secret,id=remix_env_variables \
    cat /run/secrets/remix_env_variables > .env

RUN pnpm build

# Production image, copy only necessary files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 remixjs

# Copy built assets and other required files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Set the correct permissions
RUN mkdir -p ./build
RUN chown remixjs:nodejs ./build

# Set the non-root user
USER remixjs

# Expose the Remix server port
EXPOSE 3000

# Set the PORT environment variable
ENV PORT 3000

# Start the Remix server
CMD ["pnpm", "start"]