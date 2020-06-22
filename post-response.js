const dataLogin = require('./login-data');
const data = require('./data');
const TIMEOUT_MS = 500;

module.exports = (req, res, next) => {
  setTimeout(() => {
      if (req.originalUrl.includes('/executives/me')) {
        var profile = req.headers.cookie.split('sessionId=')[1].split(';')[0];
        if (profile === 'ADMIN') {
          res.jsonp({
            data: dataLogin.adminProfileData
          });
        } else if (profile === 'SUBMANAGER') {
          res.jsonp({
            data: dataLogin.subdirectorProfileData
          });
        } else if (profile === 'MANAGER') {
          res.jsonp({
            data: dataLogin.gerenteProfileData
          });
        } else {
          res.sendStatus(404);
        }
      } else if (req.originalUrl.includes('/api/login/v1/public/execute')) {
        var query = req.query;
        if (!query.role) return res.sendStatus(400);

        if (query.role === 'ADMIN') {
          res.cookie('sessionId', 'ADMIN', { maxAge: 90 * 10000 });
          res.jsonp({});
        } else if (query.role === 'SUBMANAGER') {
          res.cookie('sessionId', 'SUBMANAGER', { maxAge: 90 * 10000 });
          res.jsonp({});
        } else if (query.role === 'MANAGER') {
          res.cookie('sessionId', 'MANAGER', { maxAge: 90 * 10000 });
          res.jsonp({});
        } else {
          res.sendStatus(404);
        }
      } else if (req.originalUrl === '/api/conversation-dialog') {
        if (req.method === 'GET') {
          res.jsonp({ ...data.getConversations });
        } else {
          res.sendStatus(404);
        }
      } else if (req.originalUrl === '/api/data') {
        if (req.method === 'GET') {
          res.jsonp({ ...data.getData });
        } else {
          res.sendStatus(404);
        }
      } else if (req.originalUrl.match(/api\/notifications\/\w+/)) {
        if (req.method === 'PUT') {
          res.jsonp({});
        }
      } else if (req.originalUrl === '/api/client/message/massive' && req.method === 'POST') {
        res.jsonp({ ...data.massiveMessage(req) });
      } else if (req.originalUrl.match(/api\/client\/message/) && req.method === 'POST') {
        res.jsonp({ ...data.postMessage(req) });
      } else if (req.originalUrl.match(/^(?:\/api\/conversation\b)(?:\/[\w]+){4}$/) && req.method === 'PUT') {
        res.jsonp({ ...data.putMessage(req) });
      }

      next();
    },
    TIMEOUT_MS);

};
