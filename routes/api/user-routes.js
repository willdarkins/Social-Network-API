const router = require('express').Router();
const {
    addUser,
    getAllUsers,
    getUserById,
    updateUserById
} = require('../../controllers/user-controller')

router
.route('/')
.post(addUser)
.get(getAllUsers);

router
.route('/:id')
.get(getUserById)
.put(updateUserById)

module.exports = router