const router = require('express').Router();
let User = require('../modules/user.model');

// First endpoint that handles incoming HTTP GET requests on the /users/ URL path
router.route('/').get((req, res) => {
    // Find all users in MongoDB Atlas database
    User.find()
        // Return users in JSON format
        .then(users => res.json(users))
        // Return error if there is one
        .catch(err => res.status(400).json('Error: ' + err));
});

// Second endpoint that handles incoming HTTP POST requests on the /users/add URL path
router.route('/add').post((req, res) => {
    // Get username from request body
    const username = req.body.username;

    // Create new instance of User
    const newUser = new User({ username });

    // Save new user to MongoDB Atlas database
    newUser.save()
        // Return success message in JSON format
        .then(() => res.json('User added!'))
        // Return error if there is one
        .catch(err => res.status(400).json('Error: ' + err));
});

// Third endpoint that handles incoming HTTP GET requests on the /users/:id URL path
router.route('/:id').get((req, res) => {
    // Find user by id in MongoDB Atlas database
    User.findById(req.params.id)
        // Return user in JSON format
        .then(user => res.json(user))
        // Return error if there is one
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    // Find user by id in MongoDB Atlas database and delete
    User.findByIdAndDelete(req.params.id)
        // Return success message in JSON format
        .then(() => res.json('User deleted.'))
        // Return error if there is one
        .catch(err => res.status(400).json('Error: ' + err));
});

// Export router
module.exports = router;