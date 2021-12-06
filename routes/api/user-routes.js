const router = require('express').Router();
const {
    addUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    addFriend
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
.route('/:userId/friends/:friendId')
.post(addFriend)

module.exports = router