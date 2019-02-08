const app = require('express')()
const bodyParser = require('body-parser')
const DB = require('./data/config')

DB.connect('localhost','27017','contas')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

require('./routes/Routes')(app)

module.exports = app