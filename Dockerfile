# Simple Dockerfile to run the Theia browser example locally or on Render
FROM node:20-bullseye

# Native module prerequisites (Linux)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ pkg-config git libx11-dev libxkbfile-dev libsecret-1-dev \
    && rm -rf /var/lib/apt/lists/*

# No global installs; use local devDependencies installed by npm

WORKDIR /workspace

# Copy repo
COPY . .

# Full install to satisfy repo postinstall hooks and build (include dev deps)
ENV PUPPETEER_SKIP_DOWNLOAD=1 \
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
RUN npm install \
 && npm run build:browser \
 && npm run download:plugins

ENV THEIA_HOSTS="*"
EXPOSE 3000

# Start the browser example; Render sets PORT, default to 3000
# Use npm script so node_modules/.bin is on PATH (resolves `theia`)
CMD ["sh","-lc","cd examples/browser && npm run start -- --hostname 0.0.0.0 --port ${PORT:-3000}"]
