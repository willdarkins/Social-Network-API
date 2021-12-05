const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    updateThoughtById,
    addThought
} = require('../../controllers/thought-controller')

router
.route('/')
.get(getAllThoughts)

router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThoughtById)

router
.route('/:userId')
.post(addThought)

module.exports = router