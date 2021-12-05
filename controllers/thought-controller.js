const { Thought } = require('../models')
const { User } = require('../models')

const thoughtController = {
    addThought({ params, body}, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id }},
                { new: true }
            )
        })
        .then(dbThought => {
            if(!dbThought) {
                res.status(400).json({message: 'No user found with this ID!'})
                return;
            }
            res.json(dbThought)
        })
        .catch(err => res.json(err))
    }
}

module.exports = thoughtController