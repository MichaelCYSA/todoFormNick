const mongoose = require('mongoose')
const { Schema } = mongoose

const todo = new Schema({
   name: String,
   status: Boolean
})

const Todo = mongoose.model('Todo', todo)

module.exports = Todo