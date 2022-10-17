var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var TeacherImgSchema = new mongoose.Schema({
    date: Date,
    mail: String,
    nombreImagen: String
    
})

TeacherImgSchema.plugin(mongoosePaginate)
const TeacherImg = mongoose.model('TeacherImagen', TeacherImgSchema)

module.exports = TeacherImg;