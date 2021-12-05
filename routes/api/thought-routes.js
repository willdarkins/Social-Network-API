const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought
} = require('../../controllers/thought-controller')

router
.route('/')
.get(getAllThoughts)

router
.route('/:thoughtId')
.get(getThoughtById)

router
.route('/:userId')
.post(addThought)

module.exports = router