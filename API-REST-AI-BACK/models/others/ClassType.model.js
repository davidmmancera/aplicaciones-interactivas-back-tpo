var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClassTypeSchema = new mongoose.Schema({
    value: String,
    label: String
})

ClassTypeSchema.plugin(mongoosePaginate)
const ClassType = mongoose.model('ClassType', ClassTypeSchema)

module.exports = ClassType;