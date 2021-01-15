const rentalRepo = require('../repositories/rentalRepo');
const verifyPagination = require('../utils/verifyPagination');
const { handleError } = require('../utils/handleError');
const userRepo = require('../repositories/userRepo');
const carRepo = require('../repositories/carRepo');

/*
 Get all rentals
 Returns all rentals as an array of JSON objects. Limited by default to 15 results.
 */
module.exports.getAll = (req, res, next) => {
  rentalRepo.count()
    .then((count) => {
      if (count > 0) {
        // Verify if the page and limit provided through req.query strings are within range
        const pagination = verifyPagination(req.query.limit, req.query.page, count);
        const limit = pagination.limit;
        const page = pagination.page;

        // Fetch all the data now, with the page and limit assured to be in range
        rentalRepo.getAll(limit, page, req.query)
          .then(async (rentals) => {
              const rentalsDetailed = await Promise.all(rentals.map(async (rental) => {
                  const user = await userRepo.getById(rental.userId);
                  const car = await carRepo.getById(rental.carId);

                  rental.user = user;
                  rental.car = car;
                  return rental;
              }));
            req.data = rentalsDetailed;
            req.meta = {
              page,
              limit,
              count,
              endpoint: 'rentals'
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
 Get a single rental
 Returns a single Rental object. Request by id.
 */
module.exports.getById = (req, res) => {
  rentalRepo.getById(req.params.id)
    .then((rental) => {
      res.json(rental);
    })
    .catch(handleError(res));
};

/*
 Create a Rental
 Creates a Rental resource. Returns a Rental object
 */
module.exports.create = (req, res) => {
  rentalRepo.create(req.body)
    .then((rental) => {
      res.json(rental);
    })
    .catch(handleError(res));
};

/*
 Update a rental
 Returns a Rental object
 */
module.exports.update = (req, res) => {
  rentalRepo.update(req.params.id, req.body)
    .then((rental) => {
      res.json(rental);
    })
    .catch(handleError(res));
};

/*
 Soft Delete a Rental.
 Returns a Rental object
 */
module.exports.delete = (req, res) => {
  rentalRepo.delete(req.params.id)
    .then((rental) => {
      res.json(rental)
    })
    .catch(handleError(res));
};
