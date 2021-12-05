const { User } = require('../models');

const userController = {
    addUser({body}, res) {
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
        .catch(err => res.status(400).json(err))
    }
}   
module.exports = userController;