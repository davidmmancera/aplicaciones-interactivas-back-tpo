var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClassSchema = new mongoose.Schema({
    key: Number,
    calificacion: String,
    profesor: String,
    experiencia: String,
    descripcion: String,
    nombre: String,
    materia: String,
    duracion: Number,
    frecuencia: String,
    costo: Number,
    activo: Boolean,
})

ClassSchema.plugin(mongoosePaginate)
const classTeacher = mongoose.model('ClsTch', ClassSchema)

module.exports = classTeacher;