var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var StudiesSchema = new mongoose.Schema({
    value: Number,
    label: String,
})

StudiesSchema.plugin(mongoosePaginate)
const Studies = mongoose.model('Studies', StudiesSchema)

module.exports = Studies;