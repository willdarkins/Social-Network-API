const router = require('express').Router();
const {
    addUser
} = require('../../controllers/user-controller')

router
.route('/users')
.post(addUser)

module.exports = router