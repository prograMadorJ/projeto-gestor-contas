const api = (Model) => {
    return {
        /**
         * Register a model
         * 
         * @param {Object} registerFields 
         * @param {Function} callback 
         */
        register(registerFields, callback) {

            Model.create(registerFields, err => {
                if (err) new Error(err)
                callback(err)
            })
        },
        /**
         * Fetch a collection of model
         * 
         * @param {Function} callback 
         */
        fetch(callback) {
            Model
                .find()
                .select({
                    _id: 0,
                    __v: 0
                })
                .exec((err, docs) => {

                    if (err) new Error(err)

                    callback(err, docs)
                })
        },
        /**
         * Get one model
         *  
         * @param {Object} getFilter 
         * @param {Object} selectFilter 
         * @param {Function} callback 
         */
        get(getFilter, selectFilter, callback) {

            Model
                .find(getFilter)
                .select(selectFilter)
                .exec((err, doc) => {

                    if (err) new Error(err)

                    callback(err, doc)
                })

        },
        /**
         * Update a model
         * 
         * @param {Request} req 
         * @param {Response} res 
         * @param {Callback} next 
         */
        update(updateFilter, updateFields, callback) {
            Model
                .findOneAndUpdate(updateFilter, {
                    $set: updateFields
                }, {
                    new: true
                }, (err, doc) => {

                    if (err) new Error(err)

                    callback(err, doc)

                })
        },
        /**
         * Delete a model
         * 
         * @param {Request} req 
         * @param {Response} res 
         * @param {Callback} next 
         */
        delete(deleteFilter, callback) {
            Model
                .findOneAndDelete(deleteFilter, (err, doc) => {

                    if (err) new Error(err)

                    callback(err, doc)
                })
        }
    }
}


module.exports = (
    Model,
    messages,
    validateRegister,
    validateUpdate,
    validateDelete,
    validateGet
) => {
    return {
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

                api(Model).register(registerFields, err => {
                    if (err) return next(new Error(err))
                    res.send(messages.REGISTERED_SUCCESS)
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

            api(Model).fetch((err, docs) => {
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
                api(Model).get(getFilter, {
                    _id: 0
                }, (err, doc) => {
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
                api(Model).update(validateOld, validateNew, err => {
                    if (err) return next(new Error(err))
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
                api(Model).delete(validateDelete, err => {
                    if (err) return next(new Error(err))
                    res.status(202).send(messages.DELETED_SUCCESS)
                })
            }

            validateDelete(req, callback)
        }
    }
}

module.exports.api = api