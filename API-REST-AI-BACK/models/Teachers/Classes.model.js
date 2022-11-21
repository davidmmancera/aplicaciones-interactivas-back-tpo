var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClassSchema = new mongoose.Schema({
    key: Number,
    nombre: String,
    materia: String,
    duracion: Number,
    frecuencia: String,
    costo: Number,
})

ClassSchema.plugin(mongoosePaginate)
const classTeacher = mongoose.model('ClsTch', ClassSchema)

module.exports = classTeacher;