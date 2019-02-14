const es6Render = require('express-es6-template-engine')
const pathView = view => 'src/frontend/views'.concat(view).concat('/index.html')

module.exports = {
    pathView: pathView,
    view(view, params, response, next) {
        es6Render(pathView('/'), {
            locals: params,
            partials: {
                main: pathView(view)
            }
        }, (err, content) => {
            (err) ? next(new Error(err)): response.send(content)
        })
    },
    render(views, params, response, next) {
        es6Render(pathView('/'), {
            locals: params,
            partials: views
        }, (err, content) => {
            (err) ? next(new Error(err)): response.send(content)
        })
    }
}