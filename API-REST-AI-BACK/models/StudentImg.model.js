var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var StudentImgSchema = new mongoose.Schema({
    date: Date,
    mail: String,
    nombreImagen: String
    
})

StudentImgSchema.plugin(mongoosePaginate)
const StudentImg = mongoose.model('StudentImagen', StudentImgSchema)

module.exports = StudentImg;