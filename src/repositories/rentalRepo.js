const thinky = require('../lib/thinky');
const r = thinky.r;
const Rental = require('../models/Rental');

/*
 Returns all Rentals as an array of JSON objects. Limit is set to 15 by default
 */
module.exports.getAll = (limit, page, q) => {
  return Rental
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
 Get a rental
 Returns a single Rental object. Request by id
 */
module.exports.getById = (id) => {
  return Rental
    .get(id)
    .run();
};

/*
  Create a Rental
  Creates a Rental resource. Returns a Rental object
 */
module.exports.create = (data) => {
  return Rental
    .save(data)
    .then((result) => {
      return result;
    }).error((err) => {
      return err;
    });
};

/*
 Update a Rental. Returns a Rental object
 */
module.exports.update = (id, data) => {
  return Rental
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
 Delete a rental resource. Request by id
 Returns a Rental object
 */
module.exports.delete = (id) => {
  return Rental
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
 Counts the number of entries in the Rentals table
 */
module.exports.count = () => {
  return Rental
    .filter(row => row('deleted').eq(false))
    .count()
    .execute();
};

/*
 Get rentals by carId
 Returns a list of Rental objects.
 */
module.exports.getByCarId = (carId) => {
    return Rental
        .filter(
            r.row("carId").eq(carId).and(r.row('state').eq('requested').or(r.row('state').eq('approved')))
        )
        .default([])
        .run();
};

/*
 Get rentals by carId
 Returns a list of Rental objects.
 */
module.exports.getByUserId = (carId) => {
    return Rental
        .filter(
            r.row("userId").eq(carId)
        )
        .default([])
        .run();
};