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

                Model
                    .create(registerFields, (err) => {

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

            Model
                .find()
                .select({
                    _id: 0
                })
                .exec((err, docs) => {

                    if (err || docs == null) return next(new Error(err))

                    res.send(docs)
                })

        },
        /**
         * Get one model
         * 
         * @param {Object} getFilter 
         * @param {Object} selectFilter 
         * @param {Function} callback 
         */
        _get(getFilter, selectFilter, callback) {
            
            Model
                .findOne(getFilter)
                .select(selectFilter)
                .exec((err, doc) => {

                    if (err || doc == null) new Error(err)

                    callback(doc)
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
                this._get(getFilter, {
                    _id: 0
                }, doc => res.send(doc))
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

                Model
                    .findOneAndUpdate(updateFilter, {
                        $set: updateFields
                    }, {
                        new: true
                    }, (err, doc) => {

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

                const deleteFilter = validateDelete

                Model
                    .findOneAndDelete(deleteFilter, (err, doc) => {

                        if (err || doc == null) return next(new Error(err))

                        res.status(202).send(messages.DELETED_SUCCESS)

                    })
            }

            validateDelete(req, callback)
        }
    }
}