var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClassSchema = new mongoose.Schema({
    key: Number,
    classKey: Number,
    studentKey: Number,
    materia: String,
    frecuencia: String,
    calificacion: String,
    calificacionId: Number
})

ClassSchema.plugin(mongoosePaginate)
const ClassStudent = mongoose.model('ClassStd', ClassSchema)

module.exports = ClassStudent;