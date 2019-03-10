process.env.NODE_ENV = 'test'

const {
    expect
} = require('chai')
const http = require('chai').use(require('chai-http'))
const app = require('../app')
const categoryMessages = require('../messages/CategoryMessages')
const messages = require('../messages/BaseMessages')


prettyLog = (route, json, respText) => {
    console.log(
        '\n\t', 'route => ', route,
        '\n\t',
        'json =>', JSON.stringify(json, null, '\t\t'),
        '\n\t',
        'res => ', respText, '\n')
}


const send = (http, route, json, expectStatusCode, expectMessage, callbackDone, callback) => {

    http.send(json).end((err, res) => {
        expect(err).be.null
        expect(res).status(expectStatusCode)
        expect(res.text).eq(expectMessage)
        if (typeof callback == 'function') callback(res)
        prettyLog(route, json, res.text)
        callbackDone()
    })
}

httpRequestPostTest = (route, json, expectStatusCode, expectMessage, callbackDone, callback) => {
    send(http.request(app).post(route), route, json, expectStatusCode, expectMessage, callbackDone, callback)
}

httpRequestPutTest = (route, json, expectStatusCode, expectMessage, callbackDone, callback) => {
    send(http.request(app).put(route), route, json, expectStatusCode, expectMessage, callbackDone, callback)
}

httpRequestDeleteTest = (route, json, expectStatusCode, expectMessage, callbackDone, callback) => {
    send(http.request(app).delete(route), route, json, expectStatusCode, expectMessage, callbackDone, callback)
}

httpRequestGetTest = (route, expectStatusCode, callbackDone, callback) => {
    http.request(app).get(route).send().end((err, res) => {
        expect(err).be.null
        expect(res).status(expectStatusCode)
        if (typeof callback == 'function') callback(res)
        prettyLog(route, '', res.text)
        callbackDone()
    })
}

describe('Cadastro Categoria', () => {

    it('Caso Teste: Categoria Válida', done => {

        httpRequestPostTest('/api/category', {
            name: 'categoria'
        }, 200, categoryMessages.REGISTERED_SUCCESS, done)
    })

    it('Caso Teste: Categoria Inválida', done => {

        httpRequestPostTest('/api/category', {
            name: 'categoria#%'
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Categoria com Campo Adicional', done => {

        httpRequestPostTest('/api/category', {
            name: 'categoria',
            description: 'description'
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Categoria com Campo Não Existente', done => {

        httpRequestPostTest('/api/category', {
            description: 'categoria'
        }, 500, messages.SERVER_ERROR, done)
    })
})

describe('Atualizar Categoria', () => {

    it('Caso Teste: Categoria Válida', done => {

        httpRequestPutTest('/api/category', {
            old: {
                name: 'categoria'
            },
            new: {
                name: 'categorias'
            }
        }, 202, categoryMessages.UPDATED_SUCCESS, done)
    })

    it('Caso Teste: Categoria Inválida', done => {

        httpRequestPutTest('/api/category', {
            old: {
                name: 'categoria'
            },
            new: {
                name: 'categorias%#'
            }
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Categoria com Campo Adicional (New)', done => {

        httpRequestPutTest('/api/category', {
            old: {
                name: 'categoria'
            },
            new: {
                name: 'categorias%#',
                description: 'description'
            }
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Categoria com Campo Adicional (Old)', done => {

        httpRequestPutTest('/api/category', {
            old: {
                name: 'categoria',
                description: 'description'
            },
            new: {
                name: 'categorias%#'
            }
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Categoria com Campo Não Existente (Old)', done => {

        httpRequestPutTest('/api/category', {
            old: {
                description: 'description'
            },
            new: {
                name: 'categorias%#'
            }
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Categoria com Campo Não Existente (New)', done => {

        httpRequestPutTest('/api/category', {
            old: {
                name: 'categoria'
            },
            new: {
                description: 'description'
            }
        }, 500, messages.SERVER_ERROR, done)
    })
})

describe('Buscar Categorias', () => {

    it('Caso Teste: Categorias Encontradas', done => {

        httpRequestGetTest('/api/category', 200, done)
    })

    it('Caso Teste: Categoria Encontrada', done => {

        httpRequestGetTest('/api/category/get?name=categorias', 200, done)
    })

    it('Caso Teste: Categoria Não Encontrada', done => {

        httpRequestGetTest('/api/category/get?name=categori', 200, done)
    })

    it('Caso Teste: Categoria com Parâmetro Incorreto', done => {

        httpRequestGetTest('/api/category/get?description=categorias', 500, done)
    })

})


describe('Deletar Categoria', () => {

    it('Caso Teste: Categoria Válida', done => {

        httpRequestDeleteTest('/api/category', {
            name: 'categorias'
        }, 202, categoryMessages.DELETED_SUCCESS, done)
    })

    it('Caso Teste: Categoria Inválida', done => {

        httpRequestDeleteTest('/api/category', {
            name: 'categoria#%'
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Categoria com Campo Adicional', done => {

        httpRequestDeleteTest('/api/category', {
            name: 'categoria',
            description: 'description'
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Categoria com Campo Não Existente', done => {

        httpRequestDeleteTest('/api/category', {
            description: 'categoria'
        }, 500, messages.SERVER_ERROR, done)
    })
})