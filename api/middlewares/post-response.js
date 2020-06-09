const data = require('./data');
const TIMEOUT_MS = 500;
let postMessageCount = 0;

module.exports = (req, res, next) => {
  setTimeout(() => {
    if (!req.body) return res.sendStatus(400);
    if (req.originalUrl === '/api/conversation' && req.method === 'POST') {
        res.jsonp({
            ...data.conversation
        });
    } else if (req.originalUrl.match(/api\/manager\/message/) && req.method === 'POST') {
      if(postMessageCount > 0){
        res.jsonp({ ...data.postMessage(req) });
      }else{
        res.sendStatus(500);
      }
      postMessageCount++;
    }

    next();
  },
  TIMEOUT_MS);
};
