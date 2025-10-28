# --------------------------------------------------------------
# Stage 1: Build the application
# --------------------------------------------------------------

FROM node:22.14-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --------------------------------------------------------------
# Stage 2: Serve the application with Nginx
# --------------------------------------------------------------

FROM nginx:alpine

COPY --from=builder /app/dist/angular-web-shell /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
