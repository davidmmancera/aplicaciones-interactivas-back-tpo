var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var HiringSchema = new mongoose.Schema({
    key: Number,
    nombre: Number,
    alumno: String,
    estado: String
});

HiringSchema.plugin(mongoosePaginate)
const Hiring = mongoose.model('Hiring', HiringSchema)

module.exports = Hiring;