const mongoose = require('mongoose')
const Schema = mongoose.Schema


const schema = new Schema({
    expiry: {
        type: Date,
        default: Date.now,
        required: true
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
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    datetime: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Expense',schema)