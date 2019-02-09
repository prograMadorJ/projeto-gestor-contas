
module.exports = (app) => {
    app.use(require('./TestRoute'))
    app.use(require('./ConsumerRoute'))
}