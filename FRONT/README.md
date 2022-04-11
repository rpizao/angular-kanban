# Desafio Let's Code | Quadro Kanban 
O projeto é sobre uma solução, ao estilo Kanban Board, que visa entregar um bom visual, componentização e boa organização de código.

## Linguagens e bibliotecas utilizadas
Angular | 13.3.2
<br>Angular Material | 13.3.2
<br>class-transformer | 0.5.1 | (https://www.npmjs.com/package/class-transformer)
<br>Dompurify | 2.3.6 | (https://www.npmjs.com/package/dompurify)
<br>Ngx-markdown | 13.1.0 | (https://www.npmjs.com/package/ngx-markdown)
<br>ts-md5 | 1.2.11 | (https://www.npmjs.com/package/ts-md5)

**Importante**
<br>Utilizar IE11 ou posterior (versão 11 descontinuada nesta versão do Angular) e Node 12.20.0 ou posterior.

## Iniciar os serviços
Clone o repositório do endereço **https://github.com/rpizao/angular-kanban**
<br>Abra o console no diretório do projeto e execute <pre>docker-compose up -d --build</pre>
<br>Para acessar o projeto, entre na URL **http://localhost:4200**

## Parar os serviços
Abra o console no diretório do projeto e execute <pre>docker-compose down</pre>

## Rodando os testes
Acesse a pasta do projeto FRONT e execute <pre>npm test</pre>

## Cards para demonstração
Visando facilitar a visualização e as funcionalidades presentes no componente, alguns cards são carregados na inicialização da aplicação.
<br> A carga ocorre uma única vez, logo após a recuperação do token no back-end, e só se a "base" de cards estiver vazia.
