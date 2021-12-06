//imported schema constructor and model function dependencies
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//using Schema constructor imported from Mongoose to define fields with specific data types
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: [true, 'You must provide text for the reaction'],
            maxlength: 280
        },
        username: {
            type: String,
            required: [true, 'You must provide a username.']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'You must provide text for a thought!'],
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: [true, 'A username is required']
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

//created virtual to provide count number of reactions to Thoughts
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

//associate models with schemas
const Thought = model('Thought', ThoughtSchema);
const Reaction = model('Reaction', ReactionSchema);

//export models
module.exports = Thought, Reaction;