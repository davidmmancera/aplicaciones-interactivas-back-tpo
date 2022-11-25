var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var TeacherSchema = new mongoose.Schema({
    key: Number,
    name: String,
    email: String,
    password: String,
    date: Date,
    phone: String,
    title: String,
    experience: String
})

TeacherSchema.plugin(mongoosePaginate)
const Teacher = mongoose.model('Teacher', TeacherSchema)

module.exports = Teacher;