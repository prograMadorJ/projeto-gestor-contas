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

const getCategory = (name, callback) => {

    Base(Category)._get({
        name
    }, {
        _id: 1
    }, category => callback(category))
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

            callbackRegister = (category) => {

                registerFields.category = category._id

                Expense
                    .create(registerFields, (err) => {

                        if (err) return next(new Error(err))

                        res.status(201).send(messages.REGISTERED_SUCCESS)
                    })
            }

            getCategory(validate.category, category => {

                if (category == null) return next(new Error('category is null'))

                callbackRegister(category)
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

                if (err || docs == null) return next(new Error(err))

                res.send(docs)
            })
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

            callbackUpdate = (categoryOld, categoryNew) => {

                updateFilter.category = categoryOld._id
                updateFields.category = categoryNew._id

                Expense
                    .findOneAndUpdate(updateFilter, {
                        $set: updateFields
                    }, {
                        new: true
                    }, (err, doc) => {

                        if (err || doc == null) return next(new Error(err))

                        res.status(202).send(messages.UPDATED_SUCCESS)

                    })
            }

            getCategory(validateOld.category, categoryOld => {

                getCategory(validateNew.category, categoryNew => {

                    if (null == categoryOld || null == categoryNew) return next(new Error('category is null'))

                    callbackUpdate(categoryOld, categoryNew)
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

            callbackDelete = (category) => {

                deleteFilter.category = category._id

                Expense
                    .findOneAndDelete(deleteFilter, (err, doc) => {

                        if (err || doc == null) return next(new Error(err))

                        res.status(202).send(messages.DELETED_SUCCESS)

                    })
            }

            getCategory(validateDelete.category, category => {

                if (null == category) return next(new Error('category is null'))

                callbackDelete(category)
            })
        }

        validateDelete(req, callback)
    }
}