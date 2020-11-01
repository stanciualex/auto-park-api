const thinky = require('../lib/thinky');
const r = thinky.r;
const Car = require('../models/Car');

/*
 Returns all Cars as an array of JSON objects. Limit is set to 15 by default
 */
module.exports.getAll = (limit, page, q) => {
  return Car
    .filter((row) => {
      let res = row('deleted').eq(false);
      if (q.title) res = res.and(row('title').match("(?i)" + q.title));
      return res;
    })
    .skip(limit && page ? (page - 1) * limit : 0)
    .limit(limit ? limit : 0)
    .orderBy(r.asc((row) => {
      if (!q.sort) {
        return row('title');
      }
      return row(q.sort)
    }))
    .run();
};

/*
 Get a car
 Returns a single Car object. Request by id
 */
module.exports.getById = (id) => {
  return Car
    .get(id)
    .run();
};

/*
  Create a Car
  Creates a Car resource. Returns a Car object
 */
module.exports.create = (data) => {
  return Car
    .save(data)
    .then((result) => {
      return result;
    }).error((err) => {
      return err;
    });
};

/*
 Update a Car. Returns a Car object
 */
module.exports.update = (id, data) => {
  return Car
    .get(id)
    .update(data)
    .run()
    .then((result) => {
      return result;
    }).error((err) => {
      return err;
    });
};

/*
 Delete a car resource. Request by id
 Returns a Car object
 */
module.exports.delete = (id) => {
  return Car
    .get(id)
    .update({ deleted: true })
    .run()
    .then((result) => {
      return result;
    }).error((err) => {
      return err;
    });
};

/*
 Counts the number of entries in the Cars table
 */
module.exports.count = () => {
  return Car
    .filter(row => row('deleted').eq(false))
    .count()
    .execute();
};
