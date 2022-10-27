var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var FrequencySchema = new mongoose.Schema({
    value: String,
    label: String
})

FrequencySchema.plugin(mongoosePaginate)
const Frequency = mongoose.model('Frequency', FrequencySchema)

module.exports = Frequency;