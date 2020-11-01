/*
 Returns a JSON object with an array of data, and a meta object
 The req param requires a meta object with:
 {
   page: page,
   limit: limit,
   count: count,
   endpoint: endpoint
 }
 */
const applyRichardsonLinks = (req, res) => {

  const nextPage = req.meta.page + 1;
  const prevPage = req.meta.page - 1;
  let queryString = '';
  if (req.meta.query) {
    for (let i = 0; i < req.meta.query.length; i++) {
      queryString += req.meta.query[i];
    }
  }

  res.json({
    data: req.data,
    meta: {
      limit: req.meta.limit,
      page: req.meta.page,
      next: (nextPage <= Math.ceil(req.meta.count / req.meta.limit)) ? '/' + req.meta.endpoint + '?limit=' + req.meta.limit + '&page=' + nextPage + queryString : null,
      prev: (prevPage >= 1) ? '/' + req.meta.endpoint + '?limit=' + req.meta.limit + '&page=' + prevPage + queryString : null,
      count: req.meta.count,
      totalItems: req.meta.totalItems,
      pages: Math.ceil(req.meta.totalItems / req.meta.limit)
    }
  });
};

module.exports = applyRichardsonLinks;
