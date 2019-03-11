const {
    validateRequest,
    validateTest
} = require('./BaseRule')

const regex = {
    categoryName: '^[A-zÀ-ú]+$|[A-zÀ-ú]+?(\\s&\\s[A-zÀ-ú]+|\\s\\([A-zÀ-ú]+\\))$'
}

const messages = {
    FIELD_NAME_NO_MATCH: 'Validation field `name` no match regex',
    MISSING_FIELDS_OR_TOO_MANY_PARAM: 'Missing fields or too many parameters'
}

/**
 * Rule to register a category
 * 
 * @param {Request} req 
 * @param {Function} callback 
 */
const registerRule = (req, callback) => {

    validateRequest(['name'], req.body)
        .then(() => {

            test = validateTest(req.body.name.trim().match(regex.categoryName))

            if (test)
                callback(req.body)
            else {
                console.log(new Error(messages.FIELD_NAME_NO_MATCH))
                callback(null)
            }
        })
        .catch((err) => {

            if (err) return console.log(err)
            console.log(new Error(messages.MISSING_FIELDS_OR_TOO_MANY_PARAM));
            callback(null)

        })
}

/**
 * Rule to update a category
 * 
 * @param {Request} req 
 * @param {Function} callback 
 */
const updateRule = (req, callback) => {

    const error = (err) => {
        if (err) return console.log(err)
        console.log(new Error(messages.MISSING_FIELDS_OR_TOO_MANY_PARAM));
        callback(null,null)
    }

    validateRequest(['old', 'new'], req.body).then(() => {

            validateRequest(['name'], req.body.old).then(() => {

                validateRequest(['name'], req.body.new).then(() => {
                   
                    test =
                        validateTest(req.body.old.name.trim().match(regex.categoryName)) &&
                        validateTest(req.body.new.name.trim().match(regex.categoryName))

                    if (test)
                        callback(req.body.old, req.body.new)
                    else {
                        callback(null,null)
                        console.log(new Error(messages.FIELD_NAME_NO_MATCH))
                    }
                }).catch(error)

            }).catch(error)
        })
        .catch(error)
}


/**
 * Rule to delete a category
 */
const deleteRule = registerRule

/**
 * Rule to get a category
 * 
 * @param {Request} req 
 * @param {Function} callback 
 */
const getRule = (req, callback) => {

    validateRequest(['name'], req.query)
        .then(() => {

            test = validateTest(req.query.name.trim().match(regex.categoryName))

            if (test)
                callback(req.query)
            else {
                console.log(new Error(messages.FIELD_NAME_NO_MATCH))
                callback(null)
            }
        })
        .catch((err) => {

            if (err) return console.log(err)
            console.log(new Error(messages.MISSING_FIELDS_OR_TOO_MANY_PARAM));
            callback(null)

        })
}

module.exports = {
    regex,
    registerRule,
    updateRule,
    deleteRule,
    getRule
}