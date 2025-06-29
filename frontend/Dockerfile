# Stage 1: Build Angular App
FROM node:20 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY ./task-manager-app/package*.json ./
RUN npm install

# Copy full Angular app source
COPY ./task-manager-app ./

# Build Angular app (production mode)
RUN npm run build -- --configuration production

# Stage 2: Nginx server for Angular app
FROM nginx:alpine

# Clear the default Nginx HTML folder
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build output from "browser" directory
COPY --from=build /app/dist/task-manager-app/browser /usr/share/nginx/html

# Optional: custom nginx config
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
