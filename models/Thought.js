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
        }
    }
)
const ReactionSchema = new Schema(

    )

const Thought = model('Thought', ThoughtSchema);
const Reaction = model('Reaction', ReactionSchema);

module.exports = Thought, Reaction;