//imported module declarations
const { Thought } = require('../models')
const { User } = require('../models')

//object that stores functions as methods to be used as callback functions for the Express.js routes
const thoughtController = {
    //POST to create a new thought 
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(400).json({ message: 'No user found with this ID!' })
                    return;
                }
                res.json(dbThought)
            })
            .catch(err => res.json(err))
    },
    //GET to get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughts => {
                res.json(dbThoughts)
            })
            .catch(err => res.json(err))
    },
    //GET to get a single thought by its _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(400).json({ message: 'There is no user ID associated with that thought' })
                    return
                }
                res.json(dbThought)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },
    //PUT to update a thought by its _id
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(400).json({ message: 'There is no thought with that ID to update' })
                    return
                }
                res.json(dbThought)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    //DELETE to remove a thought by its _id
    removeThoughtById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId },)
            .then(deletedThought => {
                if (!deletedThought) {
                    res.status(400).json({ message: 'There is no thought with that ID to delete' })
                    return
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                )
            })
            .then(dbthought => {
                if (!dbthought) {
                    res.status(400).json({ message: 'This thought has now been deleted!' });
                    return
                }
                res.json(dbthought)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    //POST to create a reaction stored in a single thought's reactions array field
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbReaction => {
                if (!dbReaction) {
                    res.status(400).json({ message: 'There is no thought associated with that ID' })
                    return
                }
                res.json(dbReaction)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(dbReaction => {
                if (!dbReaction) {
                    return res.status(404).json({ message: 'There is no reaction to delete' })
                }
                res.json(dbReaction);
            })
            .catch(err => res.json(err))
    }
}

//export thoughtController object
module.exports = thoughtController