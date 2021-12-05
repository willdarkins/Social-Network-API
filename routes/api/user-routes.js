const router = require('express').Router();
const {
    addUser,
    getAllUsers
} = require('../../controllers/user-controller')

router
.route('/')
.post(addUser)
.get(getAllUsers)

module.exports = router