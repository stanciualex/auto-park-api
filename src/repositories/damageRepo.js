const thinky = require('../lib/thinky');
const r = thinky.r;
const Damage = require('../models/Damage');

/*
 Returns all Damages as an array of JSON objects. Limit is set to 15 by default
 */
module.exports.getAll = (limit, page, q) => {
  return Damage
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
 Get a damage
 Returns a single Damage object. Request by id
 */
module.exports.getById = (id) => {
  return Damage
    .get(id)
    .run();
};

/*
  Create a Damage
  Creates a Damage resource. Returns a Damage object
 */
module.exports.create = (data) => {
  return Damage
    .save(data)
    .then((result) => {
      return result;
    }).error((err) => {
      return err;
    });
};

/*
 Update a Damage. Returns a Damage object
 */
module.exports.update = (id, data) => {
  return Damage
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
 Delete a damage resource. Request by id
 Returns a Damage object
 */
module.exports.delete = (id) => {
  return Damage
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
 Counts the number of entries in the Damages table
 */
module.exports.count = () => {
  return Damage
    .filter(row => row('deleted').eq(false))
    .count()
    .execute();
};
