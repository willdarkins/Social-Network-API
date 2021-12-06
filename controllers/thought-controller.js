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
    },
    removeThoughtById({ params }, res) {
        Thought.findOneAndDelete({_id: params.thoughtId},)
        .then(deletedThought => {
            if(!deletedThought) {
                res.status(400).json({ message: 'There is no thought with that ID to delete'})
                return
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId }},
                { new: true }
            )
        })
        .then(deletedThought => {
            if(!deletedThought) {
                res.status(400).json({ message: 'There is no user associated with this ID'});
                return
            }
            res.json(deletedThought)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: {reactions: body}},
            { new: true }
        )
        .then(dbReaction => {
            if(!dbReaction) {
                res.status(400).json({ message: 'There is no thought associated with that ID'})
                return
            }
            res.json(dbReaction)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    deleteReaction({ params }, res) {
        console.log('IM HIT!!!!!!!')
        console.log(params)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions:{ _id: params.reactionId }}},
            { runValidators: true,  new: true }
        )
        .then(dbReaction => {
            if(!dbReaction) {
            return res.status(404).json({ message: 'There is no reaction to delete'})
            }
            res.json(dbReaction);
        })
        .catch(err => res.json(err))
    }
}

module.exports = thoughtController