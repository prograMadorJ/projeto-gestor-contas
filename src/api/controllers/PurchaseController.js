const Purchase = require('../models/Purchase')
const Category = require('../models/Category')
const Consumer = require('../models/Consumer')
const messages = require('../messages/PurchaseMessages')
const Base = require('./BaseController')


const validateRegister = (req, callback) => {
    callback(req.body)
}

const validateUpdate = (req, callback) => {
    callback(req.body.old, req.body.new)
}

const validateDelete = (req, callback) => {
    callback(req.body)
}

const getCategory = (name, callback) => {

    Base(Category)._get({
        name
    }, {
        _id: 1
    }, category => callback(category[0]))
}

const getConsumer = (name, callback) => {

    Base(Consumer)._get({
        name
    }, {
        _id: 1
    }, consumer => callback(consumer[0]))
}

const validateGet = (req, callback) => {
    callback(req.query)
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

        callback = (validate) => {

            const registerFields = validate

            callbackRegister = (category, consumer) => {

                registerFields.category = category._id
                registerFields.consumer = consumer._id

                Purchase
                    .create(registerFields, (err) => {

                        if (err) return next(new Error(err))

                        res.status(201).send(messages.REGISTERED_SUCCESS)
                    })
            }

            getConsumer(validate.consumer, consumer => {

                if (consumer == null) return next(new Error('consumer is null'))

                getCategory(validate.category, category => {

                    if (category == null) return next(new Error('category is null'))

                    callbackRegister(category, consumer)
                })
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

                if (err || docs == null) return next(new Error(err))

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

                    if (err || doc == null) return next(new Error(err))

                    res.send(doc)
                })
        }

        callback = (getFilter) => {

            _getCategory = (getFilterCategory, callback) => {

                getCategory(getFilterCategory.category, category => {

                    if (null == category) return next(new Error('category is null'))

                    getFilterCategory.category = category._id

                    callback(getFilterCategory)
                })
            }

            _getConsumer = (getFilterConsumer, callback) => {

                getConsumer(getFilterConsumer.consumer, consumer => {

                    if (null == consumer) return next(new Error('consumer is null'))

                    getFilterConsumer.consumer = consumer._id

                    callback(getFilterConsumer)
                })
            }

            if ('consumer', 'category' in getFilter) {

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

            const updateFilter = validateOld
            const updateFields = validateNew

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

                        if (err || doc == null) return next(new Error(err))

                        res.status(202).send(messages.UPDATED_SUCCESS)

                    })
            }

            getCategoryOldAndNew = (validateOld, validateNew, callback) => {

                getCategory(validateOld.category, categoryOld => {

                    getCategory(validateNew.category, categoryNew => {

                        if (null == categoryOld || null == categoryNew) return next(new Error('category is null'))

                        callback(categoryOld, categoryNew)
                    })
                })
            }

            getConsumerOldAndNew = (validateOld, validateNew, callback) => {

                getConsumer(validateOld.consumer, consumerOld => {

                    getConsumer(validateNew.consumer, consumerNew => {

                        if (null == consumerOld || null == consumerNew) return next(new Error('consumer is null'))

                        callback(consumerOld, consumerNew)
                    })
                })
            }

            getCategoryOldAndNew(validateOld, validateNew, (categoryOld, categoryNew) => {
                getConsumerOldAndNew(validateOld, validateNew, (consumerOld, consumerNew) => {
                    callbackUpdate(categoryOld, categoryNew, consumerOld, consumerNew)
                })
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

            const deleteFilter = validateDelete

            callbackDelete = (category, consumer) => {

                deleteFilter.category = category._id
                deleteFilter.consumer = consumer._id

                Purchase
                    .findOneAndDelete(deleteFilter, (err, doc) => {

                        if (err || doc == null) return next(new Error(err))

                        res.status(202).send(messages.DELETED_SUCCESS)

                    })
            }

            getConsumer(validateDelete.consumer, consumer => {

                if (consumer == null) return next(new Error('consumer is null'))

                getCategory(validateDelete.category, category => {

                    if (category == null) return next(new Error('category is null'))

                    callbackDelete(category, consumer)
                })
            })
        }

        validateDelete(req, callback)
    }
}