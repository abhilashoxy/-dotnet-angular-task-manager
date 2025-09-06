# ---------- Stage 1: Build Angular App ----------
FROM node:20-alpine AS build
WORKDIR /app

# 1) Pin deps via package-lock and leverage layer caching
COPY ./task-manager-app/package*.json ./
# If you use npm: prefer ci for clean installs
RUN npm ci --omit=dev=false

# 2) Copy source and build
COPY ./task-manager-app ./

# Optional: let CI pass CONFIG (e.g. production, staging)
ARG NG_CONFIGURATION=production
ENV NODE_OPTIONS=--max_old_space_size=4096

# For Angular 17–19 this outputs to dist/<project>/browser
RUN npm run build -- --configuration $NG_CONFIGURATION

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:1.27-alpine

# Remove default site
RUN rm -rf /usr/share/nginx/html/*

# Copy build with proper ownership to run as non-root 'nginx' user
COPY --from=build --chown=nginx:nginx /app/dist/task-manager-app/browser /usr/share/nginx/html

# Provide SPA-friendly nginx config (see below)
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Healthcheck (optional but recommended)
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1/health || exit 1

EXPOSE 80
USER nginx
CMD ["nginx", "-g", "daemon off;"]
