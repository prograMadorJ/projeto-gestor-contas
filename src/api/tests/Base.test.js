process.env.NODE_ENV = 'test'

const {
    expect
} = require('chai')
const http = require('chai').use(require('chai-http'))
const app = require('../app')
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

module.exports = {
    messages,
    httpRequestPostTest,
    httpRequestPutTest,
    httpRequestDeleteTest,
    httpRequestGetTest
}