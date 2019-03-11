
const {
    messages,
    httpRequestPostTest,
    httpRequestPutTest,
    httpRequestGetTest,
    httpRequestDeleteTest
} = require('./Base.test')

const expenseMessages = require('../messages/ExpenseMessages')

describe('Cadastro Despesa', () => {

    it('Caso Teste: Despesa Válida', done => {

        httpRequestPostTest('/api/expense', {
            expiry: new Date('2013-01-01'),
            description: 'Descricao',
            category: 'SUPERMERCADO',
            quant: 1,
            value: '1,50'
        }, 201, expenseMessages.REGISTERED_SUCCESS, done)
    })

    it('Caso Teste: Despesa Inválida', done => {

        httpRequestPostTest('/api/expense', {
            expiry: new Date('2013-01-01'),
            description: 'Descricao#$',
            category: 'categoria',
            quant: 1,
            value: '1,50'
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Despesa com Campo Adicional', done => {

        httpRequestPostTest('/api/expense', {
            expiry: new Date('2013-01-01'),
            description: 'Descricao',
            category: 'categoria',
            quant: 1,
            value: '1,50',
            name: 'Teste'
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Despesa com Campo Não Existente', done => {

        httpRequestPostTest('/api/expense', {
            expiry: new Date('2013-01-01'),
            description: 'Descricao',
            quant: 1,
            value: '1,50'
        }, 500, messages.SERVER_ERROR, done)
    })
})

describe('Atualizar Despesa', () => {

    it('Caso Teste: Despesa Válida', done => {

        httpRequestPutTest('/api/expense', {
            old: {
                expiry: new Date('2013-01-01'),
                description: 'Descricao',
                category: 'SUPERMERCADO',
                quant: 1,
                value: '1,50'
            },
            new: {
                expiry: new Date('2013-01-01'),
                description: 'Descricao',
                category: 'SUPERMERCADO',
                quant: 1,
                value: '50,00'
            }
        }, 202, expenseMessages.UPDATED_SUCCESS, done)
    })

    it('Caso Teste: Despesa Inválida', done => {

        httpRequestPutTest('/api/expense', {
            old: {
                expiry: new Date('2013-01-01'),
                description: 'Descricao',
                category: 'categoria',
                quant: 1,
                value: '1,50'
            },
            new: {
                expiry: new Date('2013-01-01'),
                description: 'Descricao#@',
                category: 'categoria',
                quant: 1,
                value: '50,00'
            }
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Despesa com Campo Adicional (New)', done => {

        httpRequestPutTest('/api/category', {
            old: {
                expiry: new Date('2013-01-01'),
                description: 'Descricao',
                category: 'categoria',
                quant: 1,
                value: '1,50'
            },
            new: {
                expiry: new Date('2013-01-01'),
                description: 'Descricao',
                category: 'categoria',
                quant: 1,
                value: '50,00',
                name: 'teste'
            }
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Despesa com Campo Adicional (Old)', done => {

        httpRequestPutTest('/api/category', {
            old: {
                expiry: new Date('2013-01-01'),
                description: 'Descricao',
                category: 'categoria',
                quant: 1,
                value: '1,50',
                name: 'teste'
            },
            new: {
                expiry: new Date('2013-01-01'),
                description: 'Descricao',
                category: 'categoria',
                quant: 1,
                value: '50,00'
            }
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Categoria com Campo Não Existente (Old)', done => {

        httpRequestPutTest('/api/category', {
            old: {
                expiry: new Date('2013-01-01'),
                description: 'Descricao',
                quant: 1,
                value: '1,50'
            },
            new: {
                expiry: new Date('2013-01-01'),
                description: 'Descricao',
                category: 'categoria',
                quant: 1,
                value: '50,00'
            }
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Despesa com Campo Não Existente (New)', done => {

        httpRequestPutTest('/api/category', {
            old: {
                expiry: new Date('2013-01-01'),
                description: 'Descricao',
                category: 'categoria',
                quant: 1,
                value: '1,50'
            },
            new: {
                expiry: new Date('2013-01-01'),
                description: 'Descricao',
                quant: 1,
                value: '50,00'
            }
        }, 500, messages.SERVER_ERROR, done)
    })
})

describe('Buscar Despesas', () => {

    it('Caso Teste: Despesas Encontradas', done => {

        httpRequestGetTest('/api/expense', 200, done)
    })

    it('Caso Teste: Despesa Encontrada', done => {

        httpRequestGetTest('/api/expense/get?category=SUPERMERCADO', 200, done)
    })

    it('Caso Teste: Despesa Não Encontrada', done => {

        httpRequestGetTest('/api/expense/get?category=SUPERMER', 404, done)
    })

    it('Caso Teste: Despesa com Parâmetro Incorreto', done => {

        httpRequestGetTest('/api/expense/get?name=teste', 500, done)
    })

})


describe('Deletar Despesa', () => {

    it('Caso Teste: Despesa Válida', done => {

        httpRequestDeleteTest('/api/expense', {
            expiry: new Date('2013-01-01'),
            description: 'Descricao',
            category: 'SUPERMERCADO',
            quant: 1,
            value: '50,00'
        }, 202, expenseMessages.DELETED_SUCCESS, done)
    })

    it('Caso Teste: Despesa Inválida', done => {

        httpRequestDeleteTest('/api/expense', {
            expiry: new Date('2013-01-01'),
            description: 'Descricao#$',
            category: 'categoria',
            quant: 1,
            value: '1,50'
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Despesa com Campo Adicional', done => {

        httpRequestDeleteTest('/api/expense', {
            expiry: new Date('2013-01-01'),
            description: 'Descricao',
            category: 'categoria',
            quant: 1,
            value: '1,50',
            name: 'Teste'
        }, 500, messages.SERVER_ERROR, done)
    })

    it('Caso Teste: Despesa com Campo Não Existente', done => {

        httpRequestDeleteTest('/api/expense', {
            expiry: new Date('2013-01-01'),
            description: 'Descricao',
            quant: 1,
            value: '1,50'
        }, 500, messages.SERVER_ERROR, done)
    })
})