//imported schema constructor and model function
const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(

)
const ReactionSchema = new Schema(

    )

const Thought = model('Thought', ThoughtSchema);
const Reaction = model('Reaction', ReactionSchema);

module.exports = Thought, Reaction;