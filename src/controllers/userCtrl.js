const passwordHash = require('password-hash');
const passwordGenerator = require('generate-password');

const userRepo = require('../repositories/userRepo');
const verifyPagination = require('../utils/verifyPagination');
const { handleError } = require('../utils/handleError');

const generatePassword = () => {
    return passwordGenerator.generate({
       length: 16,
       numbers: true,
    });
};

/*
 Get a single User
 Validate the user. Request by email and password.
 */
module.exports.login = (req, res) => {
  userRepo.getByEmail(req.body.email)
    .then((user) => {
      if (user.length === 0) {
        res.json({success: false, message: "Invalid email"});
      } else {
        if (passwordHash.verify(req.body.password, user.password)) {
          res.json(user);
        } else {
          res.json({ success: false, message: "Invalid password" });
        }
      }
    })
    .catch(handleError(res));
};

/*
 Get all users
 Returns all users as an array of JSON objects. Limited by default to 15 results.
 */
module.exports.getAll = (req, res, next) => {
  userRepo.count()
    .then((count) => {
      if (count > 0) {
        // Verify if the page and limit provided through req.query strings are within range
        const pagination = verifyPagination(req.query.limit, req.query.page, count);
        const limit = pagination.limit;
        const page = pagination.page;

        // Fetch all the data now, with the page and limit assured to be in range
        userRepo.getAll(limit, page, req.query)
          .then((users) => {
            req.data = users;
            req.meta = {
              page,
              limit,
              count,
              endpoint: 'users'
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
 Get a single user
 Returns a single User object. Request by id.
 */
module.exports.getById = (req, res) => {
  userRepo.getById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch(handleError(res));
};

/*
 Create a User
 Creates a User resource. Returns a User object
 */
module.exports.create = (req, res) => {
  userRepo.create({
      ...req.body,
      password: passwordHash.generate(req.body.password)
  })
    .then((user) => {
      res.json(user);
    })
    .catch(handleError(res));
};

/*
 Update a user
 Returns a User object
 */
module.exports.update = (req, res) => {
  userRepo.update(req.params.id, req.body)
    .then((user) => {
      res.json(user);
    })
    .catch(handleError(res));
};

/*
 Soft Delete a User.
 Returns a User object
 */
module.exports.delete = (req, res) => {
  userRepo.delete(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(handleError(res));
};

/*
    Creates a user with provided and email & role and a generated password
    Returns the User object
 */
module.exports.invite = (req, res) => {
    const { email, role } = req.body;
    const generatedPassword = generatePassword();
    const hashedPassword = passwordHash.generate(generatedPassword);

    console.log(`New invited user { email: ${email}, password: ${generatedPassword} }`);

    userRepo.create({
        email,
        password: hashedPassword,
        role,
    })
        .then((user) => {
            res.json(user);
        })
        .catch(handleError(res));
};