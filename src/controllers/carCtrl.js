const carRepo = require('../repositories/carRepo');
const verifyPagination = require('../utils/verifyPagination');
const { handleError } = require('../utils/handleError');

/*
 Get all cars
 Returns all cars as an array of JSON objects. Limited by default to 15 results.
 */
module.exports.getAll = (req, res, next) => {
  carRepo.count()
    .then((count) => {
      if (count > 0) {
        // Verify if the page and limit provided through req.query strings are within range
        const pagination = verifyPagination(req.query.limit, req.query.page, count);
        const limit = pagination.limit;
        const page = pagination.page;

        // Fetch all the data now, with the page and limit assured to be in range
        carRepo.getAll(limit, page, req.query)
          .then((cars) => {
            req.data = cars;
            req.meta = {
              page,
              limit,
              count,
              endpoint: 'cars'
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
 Get a single car
 Returns a single Car object. Request by id.
 */
module.exports.getById = (req, res) => {
  carRepo.getById(req.params.id)
    .then((car) => {
      res.json(car);
    })
    .catch(handleError(res));
};

/*
 Create a Car
 Creates a Car resource. Returns a Car object
 */
module.exports.create = (req, res) => {
  carRepo.create(req.body)
    .then((car) => {
      res.json(car);
    })
    .catch(handleError(res));
};

/*
 Update a car
 Returns a Car object
 */
module.exports.update = (req, res) => {
  carRepo.update(req.params.id, req.body)
    .then((car) => {
      res.json(car);
    })
    .catch(handleError(res));
};

/*
 Soft Delete a Car.
 Returns a Car object
 */
module.exports.delete = (req, res) => {
  carRepo.delete(req.params.id)
    .then((car) => {
      res.json(car)
    })
    .catch(handleError(res));
};
