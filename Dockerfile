# Simple Dockerfile to run the Theia browser example locally or on Render
FROM node:20-bullseye

# Native module prerequisites (Linux)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ pkg-config libx11-dev libxkbfile-dev libsecret-1-dev \
    && rm -rf /var/lib/apt/lists/*

# Ensure mono-repo postinstall can run (lerna CLI required by root scripts)
RUN npm i -g lerna@7.4.2

WORKDIR /workspace

# Copy repo
COPY . .

# Install only required workspaces to avoid native electron/git deps
ENV NODE_ENV=production
RUN npm ci --workspaces --include-workspace-root=false \
      --workspace @theia/ext-scripts \
      --workspace @theia/example-browser \
 && npm run -w @theia/example-browser build \
 && npm run -w @theia/example-browser download:plugins

ENV THEIA_HOSTS="*"
EXPOSE 3000

# Start the browser example; Render sets PORT, default to 3000
# Use npm script so node_modules/.bin is on PATH (resolves `theia`)
CMD ["sh","-lc","cd examples/browser && npm run start -- --hostname 0.0.0.0 --port ${PORT:-3000}"]
