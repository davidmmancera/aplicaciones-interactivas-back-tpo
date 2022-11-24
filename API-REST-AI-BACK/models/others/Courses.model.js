var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var CourseSchema = new mongoose.Schema({
    value: String,
    label: String,
    description: String,
})

CourseSchema.plugin(mongoosePaginate)
const Course = mongoose.model('Course', CourseSchema)

module.exports = Course;