const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    updateThoughtById,
    addReaction,    
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
.put(addReaction)
.delete(removeThoughtById)

router
.route('/:userId')
.post(addThought)

module.exports = router