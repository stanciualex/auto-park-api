const damageRepo = require('../repositories/damageRepo');
const verifyPagination = require('../utils/verifyPagination');
const { handleError } = require('../utils/handleError');

/*
 Get all damages
 Returns all damages as an array of JSON objects. Limited by default to 15 results.
 */
module.exports.getAll = (req, res, next) => {
  damageRepo.count()
    .then((count) => {
      if (count > 0) {
        // Verify if the page and limit provided through req.query strings are within range
        const pagination = verifyPagination(req.query.limit, req.query.page, count);
        const limit = pagination.limit;
        const page = pagination.page;

        // Fetch all the data now, with the page and limit assured to be in range
        damageRepo.getAll(limit, page, req.query)
          .then((damages) => {
            req.data = damages;
            req.meta = {
              page,
              limit,
              count,
              endpoint: 'damages'
            };
            next();
          })
          .catch(handleError(res));
      }
      else {
        res.json({ success: false, message: "No results found" });
      }
    }).catch(handleError(res));
};

/*
 Get a single damage
 Returns a single Damage object. Request by id.
 */
module.exports.getById = (req, res) => {
  damageRepo.getById(req.params.id)
    .then((damage) => {
      res.json(damage);
    })
    .catch(handleError(res));
};

/*
 Create a Damage
 Creates a Damage resource. Returns a Damage object
 */
module.exports.create = (req, res) => {
  damageRepo.create(req.body)
    .then((damage) => {
      res.json(damage);
    })
    .catch(handleError(res));
};

/*
 Update a damage
 Returns a Damage object
 */
module.exports.update = (req, res) => {
  damageRepo.update(req.params.id, req.body)
    .then((damage) => {
      res.json(damage);
    })
    .catch(handleError(res));
};

/*
 Soft Delete a Damage.
 Returns a Damage object
 */
module.exports.delete = (req, res) => {
  damageRepo.delete(req.params.id)
    .then((damage) => {
      res.json(damage)
    })
    .catch(handleError(res));
};
