const Purchase = require('../models/Purchase')
const Category = require('../models/Category')
const Consumer = require('../models/Consumer')
const messages = require('../messages/PurchaseMessages')
const Base = require('./BaseController')

const validateRegister = (req, callback) => {
    registerFields = req.body
    registerFields.value = req.body.value.replace(',','.')
    callback(registerFields)
}

const validateUpdate = (req, callback) => {
    callback(req.body.old, req.body.new)
}

const validateDelete = (req, callback) => {
    callback(req.body)
}

const validateGet = (req, callback) => {
    callback(req.query)
}

const api = (Model) => {

    /**
     * Get a category
     * 
     * @param {String} name 
     * @param {Function} callback 
     */
    const getCategory = (name, callback) => {

        Base.api(Category).get({
            name
        }, {
            _id: 1
        }, (err, category) => callback(err, category[0]))
    }

    /**
     * Get a consumer
     * 
     * @param {String} name 
     * @param {Function} callback 
     */
    const getConsumer = (name, callback) => {

        Base.api(Consumer).get({
            name
        }, {
            _id: 1
        }, (err, consumer) => callback(err, consumer[0]))
    }

    return {
        /**
         * Register a model
         * 
         * @param {Object} registerFields 
         * @param {Function} callback 
         */
        register(registerFields, callback) {

            callbackRegister = (category, consumer) => {

                registerFields.category = category._id
                registerFields.consumer = consumer._id

                Purchase.create(registerFields, err => callback(err))
            }

            getConsumer(registerFields.consumer, (err, consumer) => {

                if (err || consumer == null) return callback('consumer is null')

                getCategory(registerFields.category, (err, category) => {

                    if (err || category == null) return callback('category is null')

                    callbackRegister(category, consumer)
                })
            })
        },
        /**
         * 
         * Fetch a collection of model
         * 
         * @param {Function} callback 
         */
        fetch(callback) {
            Purchase
                .find()
                .select({
                    _id: 0
                })
                .populate({
                    path: 'category',
                    select: {
                        _id: 0,
                        __v: 0
                    }
                })
                .populate({
                    path: 'consumer',
                    select: {
                        _id: 0,
                        __v: 0
                    }
                })
                .exec((err, docs) => {

                    if (err) new Error(err)

                    callback(err, docs)
                })
        },
        /**
         * 
         * Get a model
         * 
         * @param {Object} getFilter 
         * @param {Function} callback 
         */
        get(getFilter, callback) {

            getPurchase = (getFilter) => {

                Purchase
                    .find(getFilter)
                    .select({
                        _id: 0
                    })
                    .populate({
                        path: 'category',
                        select: {
                            _id: 0,
                            __v: 0
                        }
                    })
                    .populate({
                        path: 'consumer',
                        select: {
                            _id: 0,
                            __v: 0
                        }
                    })
                    .exec((err, doc) => {

                        if (err) new Error(err)

                        callback(err, doc)
                    })
            }

            _getCategory = (getFilterCategory, callbackCategory) => {

                getCategory(getFilterCategory.category, (err, category) => {

                    if (err || null == category) return callback('category is null')

                    getFilterCategory.category = category._id

                    callbackCategory(getFilterCategory)
                })
            }

            _getConsumer = (getFilterConsumer, callbackConsumer) => {

                getConsumer(getFilterConsumer.consumer, (err, consumer) => {

                    if (err || null == consumer) return callback('consumer is null')

                    getFilterConsumer.consumer = consumer._id

                    callbackConsumer(getFilterConsumer)
                })
            }

            if ('consumer' in getFilter && 'category' in getFilter) {

                _getCategory(getFilter, getFilter => {

                    _getConsumer(getFilter, getFilter => {

                        getPurchase(getFilter)
                    })
                })

            } else if ('category' in getFilter) {

                _getCategory(getFilter, getFilter => {

                    getPurchase(getFilter)

                })

            } else if ('consumer' in getFilter) {

                _getConsumer(getFilter, getFilter => {

                    getPurchase(getFilter)
                })

            } else {

                getPurchase(getFilter)
            }
        },
        /**
         * Update a model
         * 
         * @param {Object} updateFilter 
         * @param {Object} updateFields 
         * @param {Function} callback 
         */
        update(updateFilter, updateFields, callback) {

            callbackUpdate = (categoryOld, categoryNew, consumerOld, consumerNew) => {

                updateFilter.category = categoryOld._id
                updateFields.category = categoryNew._id
                updateFilter.consumer = consumerOld._id
                updateFields.consumer = consumerNew._id

                Purchase
                    .findOneAndUpdate(updateFilter, {
                        $set: updateFields
                    }, {
                        new: true
                    }, (err, doc) => {

                        if (err) new Error(err)

                        callback(err, doc)

                    })
            }

            getCategoryOldAndNew = (validateOld, validateNew, callback) => {

                getCategory(validateOld.category, (err, categoryOld) => {

                    if (err || null == categoryOld) return callback('category old is null')

                    getCategory(validateNew.category, (err, categoryNew) => {

                        if (err || null == categoryNew) return callback('category new is null')

                        callback(categoryOld, categoryNew)
                    })
                })
            }

            getConsumerOldAndNew = (validateOld, validateNew, callback) => {

                getConsumer(validateOld.consumer, (err, consumerOld) => {

                    if (err || null == consumerOld) return callback('consumer old is null')

                    getConsumer(validateNew.consumer, (err, consumerNew) => {

                        if (err || null == consumerNew) return callback('consumer new is null')

                        callback(consumerOld, consumerNew)
                    })
                })
            }

            getCategoryOldAndNew(updateFilter, updateFields, (categoryOld, categoryNew) => {
                getConsumerOldAndNew(updateFilter, updateFields, (consumerOld, consumerNew) => {
                    callbackUpdate(categoryOld, categoryNew, consumerOld, consumerNew)
                })
            })
        },
        /**
         * Delete a model
         * 
         * @param {Object} deleteFilter 
         * @param {Function} callback 
         */
        delete(deleteFilter, callback) {

            callbackDelete = (category, consumer) => {

                deleteFilter.category = category._id
                deleteFilter.consumer = consumer._id

                Purchase
                    .findOneAndDelete(deleteFilter, (err, doc) => {

                        if (err) new Error(err)

                        callback(err, doc)

                    })
            }

            getConsumer(deleteFilter.consumer, (err, consumer) => {

                if (err || consumer == null) return callback('consumer is null')

                getCategory(deleteFilter.category, (err, category) => {

                    if (err || null == category) return callback('category is null')

                    callbackDelete(category,consumer)
                })
            })
        }
    }
}

module.exports = {
    /**
     * Register a model
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {Callback} next 
     */
    register(req, res, next) {

        callback = (registerFields) => {
            api(Purchase).register(registerFields, err => {
                if (err) return next(new Error(err))
                res.status(201).send(messages.REGISTERED_SUCCESS)
            })
        }

        validateRegister(req, callback)
    },
    /**
     * Fetch a collection of model
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {Callback} next 
     */
    fetch(req, res, next) {
        api(Purchase).fetch((err, docs) => {
            if (err) return next(new Error(err))
            res.send(docs)
        })
    },
    /**
     * Get one model
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {Callback} next 
     */
    get(req, res, next) {

        callback = (getFilter) => {
            api(Purchase).get(getFilter, (err, doc) => {
                if (err) return next(new Error(err))
                res.send(doc)
            })
        }

        validateGet(req, callback)
    },
    /**
     * Update a model
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {Callback} next 
     */
    update(req, res, next) {

        callback = (validateOld, validateNew) => {
            api(Purchase).update(validateOld, validateNew, (err, doc) => {
                if (err || doc == null) return next(new Error(err))
                res.status(202).send(messages.UPDATED_SUCCESS)
            })
        }

        validateUpdate(req, callback)
    },
    /**
     * Delete a model
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {Callback} next 
     */
    delete(req, res, next) {

        callback = (validateDelete) => {
            api(Purchase).delete(validateDelete, (err, doc) => {
                if (err || doc == null) return next(new Error(err))
                res.status(202).send(messages.DELETED_SUCCESS)
            })
        }

        validateDelete(req, callback)
    }
}
module.exports.api = api(Purchase)