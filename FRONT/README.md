# Desafio Let's Code | Quadro Kanban 
O projeto é sobre uma solução, ao estilo Kanban Board, que visa entregar um bom visual, componentização e boa organização de código.

## Linguagens e bibliotecas utilizadas
Angular
<br>Angular Material
<br>class-transformer (https://www.npmjs.com/package/class-transformer)
<br>Dompurify (https://www.npmjs.com/package/dompurify)
<br>Ngx-markdown (https://www.npmjs.com/package/ngx-markdown)
<br>ts-md5 (https://www.npmjs.com/package/ts-md5)
<br>ts-md5 (https://www.npmjs.com/package/ts-md5)

*Importante*
<br>Utilizar IE11 ou posterior (versão 11 descontinuada nesta versão do Angular) e Node 12.20.0 ou posterior.

## Iniciar os serviços
Clone o repositório do endereço **https://github.com/rpizao/angular-kanban**
<br>Abra o console no diretório do projeto e execute <pre>docker-compose up -d --build</pre>
<br>Para acessar o projeto, entre na URL **http://localhost:4200**

## Parar os serviços
Abra o console no diretório do projeto e execute <pre>docker-compose down</pre>

## Rodando os testes
Acesse a pasta do projeto FRONT e execute <pre>npm test</pre>

## Cards carregados como exemplo
Carreguei alguns cards para facilitar a visualização do componente e as suas funcionalidades.
<br> A carga ocorre uma única vez, logo após a recuperação do token, e só se a "base" de cards estiver vazia.
