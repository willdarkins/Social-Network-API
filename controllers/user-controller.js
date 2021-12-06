const { User } = require('../models');

const userController = {
    addUser({ body }, res) {
        User.create(body)
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => res.status(400).json(err));
    },
    getAllUsers(req, res) {
        User.find({})
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(400).json({ message: 'There is no user with that ID!' });
                    return
                }
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(400).json({ message: 'There is no user with that ID to update' });
                    return
                }
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    deleteUserById({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(400).json({ message: 'There is no user with that ID to delete' })
                    return
                }
                res.json(dbUser)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $push: { friends: params.friendId}},
            { new: true}
        )
        .then(dbFriend => {
            if(!dbFriend) {
                res.status(404).json({ message: 'There is no user with that ID to associate with a friend'})
                return
            }
            res.json(dbFriend)
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId}},
            { new: true }
        )
        .then(dbFriend => {
            if(!dbFriend) {
            res.status(404).json({ message: 'There is no user with that ID to associate with a friend'})
            return
        }
        res.json(dbFriend)
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        }) 
    }
}
module.exports = userController;