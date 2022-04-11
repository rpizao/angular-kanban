# Copiando arquivos para o servidor virtual e instalando dependências
FROM node:14.17.6 AS build
WORKDIR /usr/src/kanban_front
COPY package.json ./
RUN npm install --quiet --no-progress 
COPY . .
RUN npm run build.production

# Instalando, configurando servidor Nginx e iniciando a aplicação
FROM nginx:1.17.1-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/kanban_front/dist/FRONT /usr/share/nginx/html
EXPOSE 80