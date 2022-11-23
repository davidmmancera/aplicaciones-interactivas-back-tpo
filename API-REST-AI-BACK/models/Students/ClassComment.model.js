var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClassCommentSchema = new mongoose.Schema({
    key: Number,
    keyClass: Number,
    comment: String
})

ClassCommentSchema.plugin(mongoosePaginate)
const ClassCommentStudent = mongoose.model('ClassCommentStd', ClassCommentSchema)

module.exports = ClassCommentStudent;