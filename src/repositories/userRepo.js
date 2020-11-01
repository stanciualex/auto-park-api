const thinky = require('../lib/thinky');
const r = thinky.r;
const User = require('../models/User');

/*
 Returns all Users as an array of JSON objects. Limit is set to 15 by default
 */
module.exports.getAll = (limit, page, q) => {
  return User
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
 Get a user
 Returns a single User object. Request by id
 */
module.exports.getById = (id) => {
  return User
    .get(id)
    .run();
};

/*
 Get a user
 Returns a single User object. Request by email
 */
module.exports.getByEmail = (email) => {
  return User
    .filter({ email: email, deleted: false })
    .nth(0)
    .default([])
    .run();
};

/*
  Create a User
  Creates a User resource. Returns a User object
 */
module.exports.create = (data) => {
  return User
    .save(data)
    .then((result) => {
      return result;
    }).error((err) => {
      return err;
    });
};

/*
 Update a User. Returns a User object
 */
module.exports.update = (id, data) => {
  return User
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
 Delete a user resource. Request by id
 Returns a User object
 */
module.exports.delete = (id) => {
  return User
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
 Counts the number of entries in the Users table
 */
module.exports.count = () => {
  return User
    .filter(row => row('deleted').eq(false))
    .count()
    .execute();
};
