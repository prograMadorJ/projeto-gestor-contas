const mongoose = require('mongoose')


module.exports = {

    connect(dbName, hostName = 'localhost', port = 27017) {
        databaseName = dbName
        stringConnection = 'mongodb://' + hostName + ':' + port + '/' + databaseName
        mongoose.connect(stringConnection, {
            useNewUrlParser: true
        }, (err) => {
            if (err) console.log(err)
        })

        // CONNECTION EVENTS
        // When successfully connected
        mongoose.connection.on('connected', () => {
            console.log('Mongoose default connection open to ' + stringConnection)
        })


        // If the connection throws an error
        mongoose.connection.on('error', (err) => {
            console.log('Mongoose default connection error: ' + err);
        })

        // When the connection is disconnected
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose default connection disconnected')
        })

        // If the Node process ends, close the Mongoose connection 
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('Mongoose default connection disconnected through app termination')
                process.exit(0)
            })
        })
    }
}