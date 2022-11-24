var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClassCommentSchema = new mongoose.Schema({
    key: Number,
    keyClass: Number,
    comment: String,
    estado: Boolean
})

ClassCommentSchema.plugin(mongoosePaginate)
const ClassCommentTeacher = mongoose.model('ClassCommentTch', ClassCommentSchema)

module.exports = ClassCommentTeacher;