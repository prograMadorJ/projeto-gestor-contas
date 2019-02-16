
module.exports = (app) => {
    app.use(require('./FetchRoute'))
    app.use(require('./RegisterRoute'))
}