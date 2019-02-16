const es6Engine = require('express-es6-template-engine')
const express = require('express')
const bodyParser = require('body-parser')

module.exports = (app) => {

    const serverErrorHandler = (err, req, res, next) => {
        res.status(500).send('view 500')
        console.log(err)

    }

    const clientErrorHandler = (req, res) => {
        res.status(404).send('view 404')
    }

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.engine('html', es6Engine)
    app.set('views', 'src/frontend/views')
    app.set('view engine', 'html')
    app.use(express.static(__dirname + '/public'))


    require('./routes/Routes')(app)

    app.use(serverErrorHandler)
    app.use(clientErrorHandler)

    return app
}