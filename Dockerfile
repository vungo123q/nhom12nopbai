FROM nginx:alpine

# Copy static site to Nginx public directory
COPY . /usr/share/nginx/html

EXPOSE 80

