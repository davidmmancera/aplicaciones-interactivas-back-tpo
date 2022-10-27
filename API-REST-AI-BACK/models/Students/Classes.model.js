var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClassSchema = new mongoose.Schema({
    key: Number,
    materiaId: Number,
    materiaNombre: String,
    materiaDescription: String,
    tipoClaseId: Number,
    tipoClaseDescripcion: String,
    frecuenciaId: Number,
    frecuenciaDescripcion: String,
    calificacionId: Number,
    calificacion: String,
    costo: String,
})

ClassSchema.plugin(mongoosePaginate)
const Class = mongoose.model('Class', ClassSchema)

module.exports = Class;