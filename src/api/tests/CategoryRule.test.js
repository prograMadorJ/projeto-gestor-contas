
const {
    messages,
    httpRequestPostTest,
    httpRequestPutTest,
    httpRequestGetTest,
    httpRequestDeleteTest
} = require('./Base.test')

const categoryMessages = require('../messages/CategoryMessages')

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