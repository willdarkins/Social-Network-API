//import Express dependecy via router
const router = require('express').Router();

//import functionality of controller methods and hook it up to routes
const {
    addUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

//set up GET all and POST at /api/users
router
.route('/')
.post(addUser)
.get(getAllUsers);

//set up GET by id, PUT, and DELTE at /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);

//set up POST and DELTE friend at /api/users/:userID/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

//export router
module.exports = router