const app = require('express')()
const bodyParser = require('body-parser')



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

require('./routes/Routes')(app)

module.exports = app