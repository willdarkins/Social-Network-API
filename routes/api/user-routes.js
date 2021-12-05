const router = require('express').Router();
const {
    addUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
} = require('../../controllers/user-controller')

router
.route('/')
.post(addUser)
.get(getAllUsers);

router
.route('/:id')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);

router
.route('/:id/:friendId')

module.exports = router