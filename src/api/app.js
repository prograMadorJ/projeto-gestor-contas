const app = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const message = require('./messages/BaseMessages')
require('./data/config').connect('contas')
require('../frontend/app')(app)

app.enabled('trust proxy')

const serverErrorHandler = (err, req, res, next) => {
    res.status(500).send(message.SERVER_ERROR)
    console.log(err)

}

const clientErrorHandler = (req, res) => {
    res.status(404).send(message.RESOURCE_NOT_FOUND)
}


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(morgan('combined'))
app.use(helmet())

require('./routes/Routes')(app)

app.use(serverErrorHandler)
app.use(clientErrorHandler)

module.exports = app