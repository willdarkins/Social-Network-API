//imported schema constructor and model function dependencies
const { Schema, model } = require('mongoose');

//using Schema constructor imported from Mongoose to define fields with specific data types
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'username is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('User', UserSchema);

//export User Model
module.exports = User;