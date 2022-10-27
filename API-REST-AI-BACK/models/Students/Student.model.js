var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: Date
})

StudentSchema.plugin(mongoosePaginate)
const Student = mongoose.model('Student', StudentSchema)

module.exports = Student;