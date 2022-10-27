var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var TeacherSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: Date
})

TeacherSchema.plugin(mongoosePaginate)
const Teacher = mongoose.model('Teacher', TeacherSchema)

module.exports = Teacher;