# Executar o projeto
Para executar o projeto é preciso ter instalado: [Node](https://nodejs.org/en/download) e [NPM](npmjs.com).
Tendo todos os itens citados instalados basta rodar o comando "npm install" ou "npm i" e caso tenha configurado uma porta diferente de 3030 para o servidor, alterar o apontamento da API contido no arquivo "environment".
Para rodar o projeto em modo de desenvolvimento rode o comando: npm run dev.
Para rodar o processo de build e depois subir o projeto em ambiente externo rode os comandos: npm run build e em seguida npm run start:prod.

Observações:
- Para executar o projeto é preciso executar também o projeto de API, caso esteja vá rodar localmente com npm run dev.
- Ao executar npm start:prod o apontamento de API é na app que está no Heroku, como é uma aplicação no plano gratuito pode demorar um pouco na primiera requisição pois a aplicação vai estar sendo reiniciada (caso fique sem requisições por 30min o Heroku desativa a aplicação).
- O Mongo está configurado para usar o MongoDB Atlas, então não é preciso ter o mesmo instalado para rodar o projeto.
