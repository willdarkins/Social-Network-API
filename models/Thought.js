//imported schema constructor and model function
const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'You must provide text for a thought!'],
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: [true, 'A username is required']
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})


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
            required: [true, 'You mus provide a username.']
        },
        
    }
)

const Thought = model('Thought', ThoughtSchema);
const Reaction = model('Reaction', ReactionSchema);

module.exports = Thought, Reaction;