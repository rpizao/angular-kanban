FROM node:14.17.6

WORKDIR /usr/src/kanban_back
COPY ["package.json", "package-lock.json*", "./"]

# Instalando depend�ncias
RUN npm install --quiet --no-progress 

# Copiando conte�do para o diret�rio virtual
COPY ./ ./

EXPOSE 5000

CMD [ "node", "index.js" ]