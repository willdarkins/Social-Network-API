const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    updateThoughtById,
    removeThoughtById,
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
.route('/:userId/:thoughtId')
.delete(removeThoughtById)

router
.route('/:userId')
.post(addThought)

module.exports = router