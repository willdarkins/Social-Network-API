const { User } = require('../models');
const { Thought } = require('../models');

const userController = {
    addUser({body}, res) {
        User.create(body)
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err)
        })
    }
}

module.exports = userController;