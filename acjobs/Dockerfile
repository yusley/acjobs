# Etapa de build do React
FROM node:22 AS build

WORKDIR /app

# Copiar package.json e yarn.lock para instalar dependências
COPY package.json yarn.lock ./
RUN yarn install

# Copiar todo o código e executar o build
COPY . .
RUN yarn build

# Etapa de execução com Nginx
FROM nginx:alpine

# Copiar o arquivo de configuração do Nginx para a configuração padrão
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copiar os arquivos do build do React para o diretório de arquivos estáticos do Nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/public /usr/share/nginx/html/public

# Expor a porta 80 para acessar via HTTP
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
