const parsedSites = {};

function getDefaultNotifications() {
  return {
    notifications: [
      {
        code: 'string',
        level: 'INFO',
        message: 'string',
        timestamp: new Date()
      }
    ]
  };

}

function getPaginationInfo({ _limit = 25, _page = 0 }, data) {
  const totalElements = data.length;
  const maxPage = Math.ceil(totalElements / +_limit);
  return {
    first: +_page === 0,
    last: +_page === maxPage,
    limit: +_limit,
    paging: +_page,
    totalElements,
    totalPages: maxPage
  };
}

function generateMeta(query) {
  const meta = {};
  if (Object.prototype.hasOwnProperty.call(query, '_page')
    || Object.prototype.hasOwnProperty.call(query, '_limit')
    || Object.prototype.hasOwnProperty.call(query, '_pagination')) {
    meta.pagination = true;
  }
  if (Object.prototype.hasOwnProperty.call(query, '_notifications')) {
    meta.notifications = true;
  }
  return meta;
}

/**
 * Parse response to include pagination and generic "notifications" for response
 *
 * Check in url query data for _pagination, _page or _limit to include pagination
 * and for _notifications to include notifications
 */
module.exports = {
  parseBefore: (req, res, next, db) => {
    const { query } = req;
    const meta = generateMeta(query);
    if (meta.pagination || meta.notifications) {
      const { url } = req;
      const [id] = new RegExp('([^/?:&])+').exec(url);
      const content = db.get(id).value();
      if (content) {
        let parsedSite = {};
        if (meta.pagination) {
          parsedSite = { ...parsedSite, ...getPaginationInfo(req.query, content) };
        }
        if (meta.notifications) {
          parsedSite = { ...parsedSite, ...getDefaultNotifications() };
        }
        parsedSites[req.originalUrl] = parsedSite;
      }
    }
    next();
  },
  parseAfter: (req, res) => {
    const url = req.originalUrl;
    const { locals: { data } } = res;
    let result = data;
    if (Object.prototype.hasOwnProperty.call(parsedSites, url)) {
      result = { data, ...parsedSites[url] };
    }
    res.jsonp(result);
    return;
  }
};
