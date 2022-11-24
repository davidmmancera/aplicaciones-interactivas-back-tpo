var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClassCommentSchema = new mongoose.Schema({
    key: Number,
    keyClass: Number,
    comment: String,
    estado: Boolean
})

// ESTADO = 0 --> PENDIENTES DE APROBACION
// ESTADO = 1 --> ACEPTADOS

ClassCommentSchema.plugin(mongoosePaginate)
const ClassCommentTeacher = mongoose.model('ClassCommentTch', ClassCommentSchema)

module.exports = ClassCommentTeacher;