const app = require('express')()
const bodyParser = require('body-parser')
const DB = require('./data/config')

DB.connect('localhost','27017','contas')

app.enabled('trust proxy')

const serverErrorHandler = (err, req, res, next) => {
    res.status(500).send('Algo de errado aconteceu, tente novamente')
    console.log(err)

}

const clientErrorHandler = (req, res) => {
    res.status(404).send('Recurso ou serviço não disponível no momento')
}


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

require('./routes/Routes')(app)

app.use(serverErrorHandler)
app.use(clientErrorHandler)

module.exports = app