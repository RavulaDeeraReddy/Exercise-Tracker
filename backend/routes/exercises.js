const router = require('express').Router();
let Exercise = require('../modules/exercise.model');

// First endpoint that handles incoming HTTP GET requests on the /exercises/ URL path
router.route('/').get((req, res) => {
    // Find all exercises in MongoDB Atlas database
    Exercise.find()
        // Return exercises in JSON format
        .then(exercises => res.json(exercises))
        // Return error if there is one
        .catch(err => res.status(400).json('Error: ' + err));
});

// Second endpoint that handles incoming HTTP POST requests on the /exercises/add URL path
router.route('/add').post((req, res) => {
    // Get username, description, duration, and date from request body
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = req.body.date;

    // Create new instance of Exercise
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    // Save new exercise to MongoDB Atlas database
    newExercise.save()
        // Return success message in JSON format
        .then(() => res.json('Exercise added!'))
        // Return error if there is one
        .catch(err => res.status(400).json('Error: ' + err));
});

// Third endpoint that handles incoming HTTP GET requests on the /exercises/:id URL path
router.route('/:id').get((req, res) => {
    // Find exercise by id in MongoDB Atlas database
    Exercise.findById(req.params.id)
        // Return exercise in JSON format
        .then(exercise => res.json(exercise))
        // Return error if there is one
        .catch(err => res.status(400).json('Error: ' + err));
});

// Fourth endpoint that handles incoming HTTP DELETE requests on the /exercises/:id URL path
router.route('/:id').delete((req, res) => {
    // Find exercise by id in MongoDB Atlas database and delete
    Exercise.findByIdAndDelete(req.params.id)
        // Return success message in JSON format
        .then(() => res.json('Exercise deleted.'))
        // Return error if there is one
        .catch(err => res.status(400).json('Error: ' + err));
});

// Fifth endpoint that handles incoming HTTP POST requests on the /exercises/update/:id URL path
router.route('/update/:id').post((req, res) => {
    // Find exercise by id in MongoDB Atlas database
    Exercise.findById(req.params.id)
        // Update exercise username, description, duration, and date
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = req.body.date;

            // Save updated exercise to MongoDB Atlas database
            exercise.save()
                // Return success message in JSON format
                .then(() => res.json('Exercise updated!'))
                // Return error if there is one
                .catch(err => res.status(400).json('Error: ' + err));
        })
        // Return error if there is one
        .catch(err => res.status(400).json('Error: ' + err));
});

// Export router
module.exports = router;