//import Express dependecy via router
const router = require('express').Router();

//import functionality of controller methods and hook it up to routes
const {
    getAllThoughts,
    getThoughtById,
    updateThoughtById,
    addReaction,    
    removeThoughtById,
    deleteReaction,
    addThought
} = require('../../controllers/thought-controller')

//set up GET all Thoughts and POST a thought at /api/thoughts
router
.route('/')
.get(getAllThoughts)
.post(addThought)

//set up GET Thought by ID, PUT and DELETE Thought at api/thoughts/:thoughtId
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThoughtById)
.delete(removeThoughtById)

//set up POST a reaction at api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction)

//set up DELETE reaction at api/thoughts/:thoughtId/reactions/:reactionId
router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

//export router
module.exports = router