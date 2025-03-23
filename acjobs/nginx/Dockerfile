# Etapa de produção com Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react_app /app/dist /usr/share/nginx/html
COPY --from=react_app /app/public /usr/share/nginx/html/public

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


