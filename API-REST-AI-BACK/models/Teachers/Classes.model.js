var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClassSchema = new mongoose.Schema({
    key: Number,
    nombre: Number,
    materia: String,
    duracion: String,
    frecuencia: Number,
    costo: String,
})

ClassSchema.plugin(mongoosePaginate)
const classTeacher = mongoose.model('ClsTch', ClassSchema)

module.exports = classTeacher;