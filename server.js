const fs = require('fs');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./api/db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

const routes = JSON.parse(fs.readFileSync('./api/routes.json'));
server.use(jsonServer.rewriter(routes));
server.use(router);

server.listen(port);