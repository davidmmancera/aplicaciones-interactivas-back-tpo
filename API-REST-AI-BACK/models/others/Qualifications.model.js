var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var QualificationsSchema = new mongoose.Schema({
    value: String,
    label: String
})

QualificationsSchema.plugin(mongoosePaginate)
const Qualifications = mongoose.model('Qualifications', QualificationsSchema)

module.exports = Qualifications;