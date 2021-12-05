const { Thought } = require('../models')
const { User } = require('../models')

const thoughtController = {
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
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
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughts => {
                res.json(dbThoughts)
            })
            .catch(err => res.json(err))
    },
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
    }
}

module.exports = thoughtController