const { Schema, model } = require('mongoose');

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
        thoughts: {
            
        }
    })

    const User = model('User', UserSchema); 

    module.exports = User;