var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


const StudentSchema = new mongoose.Schema({
    key: Number,
    name: String,
    email: String,
    password: String,
    date: Date,
    phone: String,
    birth: Date,
    primary: String,
    secondary: String,
    associate: String,
    bachelor: String
});

StudentSchema.plugin(mongoosePaginate)
const Student = mongoose.model('Student', StudentSchema)

module.exports = Student;