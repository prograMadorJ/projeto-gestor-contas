const mongoose = require('mongoose')
const Schema = mongoose.Schema


const schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model('Category',schema)