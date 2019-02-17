const Expense = require('../models/Expense')
const Category = require('../models/Category')
const messages = require('../messages/ExpenseMessages')
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

    return {
        /**
         * Register a model
         * 
         * @param {Object} registerFields 
         * @param {Function} callback 
         */
        register(registerFields, callback) {

            callbackRegister = (category) => {

                registerFields.category = category._id

                Expense.create(registerFields, err => callback(err))
            }

            getCategory(registerFields.category, (err, category) => {

                if (err || category == null) return callback('category is null')

                callbackRegister(category)
            })
        },
        /**
         * Fetch a collection of model
         * 
         * @param {Function} callback 
         */
        fetch(callback) {
            Expense
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
                .exec((err, docs) => {

                    if (err) new Error(err)

                    callback(err, docs)
                })
        },
        /**
         * Get a model
         * 
         * @param {Object} getFilter 
         * @param {Function} callback 
         */
        get(getFilter, callback) {

            getExpense = (getFilter) => {

                Expense
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
                    .exec((err, doc) => {

                        if (err) new Error(err)

                        callback(err, doc)
                    })
            }

            if ('category' in getFilter) {
                getCategory(
                    getFilter.category, (err, category) => {

                        if (err || null == category) return callback('category is null')

                        getFilter.category = category._id

                        getExpense(getFilter)
                    })
            } else {
                getExpense(getFilter)
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

            callbackUpdate = (categoryOld, categoryNew) => {

                updateFilter.category = categoryOld._id
                updateFields.category = categoryNew._id

                Expense
                    .findOneAndUpdate(updateFilter, {
                        $set: updateFields
                    }, {
                        new: true
                    }, (err, doc) => {

                        if (err) new Error(err)

                        callback(err, doc)

                    })
            }

            getCategory(updateFilter.category, (err, categoryOld) => {

                if (err || null == categoryOld) return callback('category old is null')

                getCategory(updateFields.category, (err, categoryNew) => {

                    if (err || null == categoryNew) return callback('category new is null')

                    callbackUpdate(categoryOld, categoryNew)
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

            callbackDelete = (category) => {

                deleteFilter.category = category._id

                Expense
                    .findOneAndDelete(deleteFilter, (err, doc) => {

                        if (err) new Error(err)

                        callback(err, doc)

                    })
            }

            getCategory(deleteFilter.category, (err, category) => {

                if (err || null == category) return callback('category is null')

                callbackDelete(category)
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
            api(Expense).register(registerFields, err => {
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
        api(Expense).fetch((err, docs) => {
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
            api(Expense).get(getFilter, (err, doc) => {
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
            api(Expense).update(validateOld, validateNew, (err, doc) => {
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
            api(Expense).delete(validateDelete, (err, doc) => {
                if (err || doc == null) return next(new Error(err))
                res.status(202).send(messages.DELETED_SUCCESS)
            })
        }

        validateDelete(req, callback)
    }
}

module.exports.api = api(Expense)