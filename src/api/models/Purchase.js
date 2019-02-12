const mongoose = require('mongoose')
const Schema = mongoose.Schema


const schema = new Schema({
    datetime: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    quant: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    payment: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    consumer: {
        type: Schema.Types.ObjectId,
        ref: 'Consumer',
        require: true
    },


})

module.exports = mongoose.model('Purchase',schema)