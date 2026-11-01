
# Stage 1: Build React application
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# Stage 2: Non-root Nginx production server
FROM nginx:alpine AS production

# Create dedicated non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Add custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React production files
COPY --from=builder /app/dist /usr/share/nginx/html

# Configure writable directories
RUN chown -R appuser:appgroup /usr/share/nginx/html \
    /var/cache/nginx \
    /var/log/nginx \
    /etc/nginx/conf.d \
    && touch /var/run/nginx.pid \
    && chown appuser:appgroup /var/run/nginx.pid

USER appuser

EXPOSE 8080

# Docker health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
