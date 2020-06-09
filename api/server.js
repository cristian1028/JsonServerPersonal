const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const port = 3003;
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
server.use(router);
server.listen(port);
