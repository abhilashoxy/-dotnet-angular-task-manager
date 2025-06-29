# Stage 1: Build the Angular app
FROM node:20 AS build

WORKDIR /app
COPY ./task-manager-app/package*.json ./
RUN npm install
COPY ./task-manager-app ./
RUN npm run build -- --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output
COPY --from=build /app/dist/task-manager-app /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
