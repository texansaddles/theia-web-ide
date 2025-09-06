# Simple Dockerfile to run the Theia browser example locally or on Render
FROM node:20-bullseye

# Native module prerequisites (Linux)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ pkg-config libx11-dev libxkbfile-dev libsecret-1-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# Copy repo
COPY . .

# Install deps (use install to update lock for local workspaces) and build
RUN npm install \
 && npm run build:browser \
 && npm run download:plugins

ENV THEIA_HOSTS="*"
EXPOSE 3000

# Start the browser example; Render sets PORT, default to 3000
CMD ["sh","-lc","cd examples/browser && theia start --hostname 0.0.0.0 --port ${PORT:-3000} --plugins=local-dir:../../plugins --ovsx-router-config=../ovsx-router-config.json"]

