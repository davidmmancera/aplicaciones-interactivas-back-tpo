var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var CommentSchema = new mongoose.Schema({
    key: Number,
    autor: String,
    descripcion: String,
})

CommentSchema.plugin(mongoosePaginate)
const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment;