FROM node:14.17.6

WORKDIR /usr/src/kanban_back
COPY ["package.json", "package-lock.json*", "./"]

# Instalando dependências
RUN npm install --quiet --no-progress 

# Copiando conteúdo para o diretório virtual
COPY ./ ./

EXPOSE 5000

CMD [ "node", "index.js" ]