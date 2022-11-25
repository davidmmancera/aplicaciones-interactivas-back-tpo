var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var HiringSchema = new mongoose.Schema({
    key: Number,
    profesorKey: Number,
    classKey: Number,
    studentKey: Number,
    nombre: String,
    alumno: String,
    email: String,
    telefono: String,
    horaContacto: String,
    comentario: String,
    estado: Boolean
});

HiringSchema.plugin(mongoosePaginate)
const Hiring = mongoose.model('Hiring', HiringSchema)

module.exports = Hiring;