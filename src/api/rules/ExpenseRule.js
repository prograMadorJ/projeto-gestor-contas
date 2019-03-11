const {
    validateRequest,
    validateRelativeRequest,
    validateTest
} = require('./BaseRule')

const regex = {
    description: '^([A-zÀ-ú0-9]+)+?(\\s[A-zÀ-ú0-9]+)+|^([A-zÀ-ú0-9]+)+$',
    quant: '^[0-9]{1,6}$',
    value: '^[0-9]{1,6},[0-9]{1,2}$',
    category: '^[A-zÀ-ú]+$|[A-zÀ-ú]+?(\\s&\\s[A-zÀ-ú]+|\\s\\([A-zÀ-ú]+\\))$'
}

const messages = {
    FIELD_NO_MATCH(field) {
        return `Validation field \`${field}\` no match regex`
    },
    MISSING_FIELDS_OR_TOO_MANY_PARAM: 'Missing fields or too many parameters'
}

/**
 * Rule to register a expense
 * 
 * @param {Request} req 
 * @param {Function} callback 
 */
const registerRule = (req, callback) => {

    validateRequest(['expiry', 'description', 'category', 'quant', 'value'], req.body)
        .then(() => {

            const error = (field) => {
                console.log(new Error(messages.FIELD_NO_MATCH(field)))
                callback(null)
            }

            if (!validateTest(req.body.description.trim().match(regex.description))) return error('description')

            if (!validateTest(req.body.quant.toString().match(regex.quant))) return error('quant')

            if (!validateTest(req.body.value.trim().match(regex.value))) return error('value')

            if (!validateTest(req.body.category.trim().match(regex.category))) return error('category')

            req.body.value = req.body.value.replace(',', '.')

            callback(req.body)

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
        callback(null, null)
    }

    validateRequest(['old', 'new'], req.body).then(() => {

            validateRequest(['expiry', 'description', 'category', 'quant', 'value'], req.body.old).then(() => {

                validateRequest(['expiry', 'description', 'category', 'quant', 'value'], req.body.new).then(() => {

                    const error = (field) => {
                        console.log(new Error(messages.FIELD_NO_MATCH(field)))
                        callback(null, null)
                    }

                    if (!validateTest(req.body.old.description.trim().match(regex.description))) return error('description')
                    if (!validateTest(req.body.new.description.trim().match(regex.description))) return error('description')

                    if (!validateTest(req.body.old.quant.toString().match(regex.quant))) return error('quant')
                    if (!validateTest(req.body.new.quant.toString().match(regex.quant))) return error('quant')

                    if (!validateTest(req.body.old.value.trim().match(regex.value))) return error('value')
                    if (!validateTest(req.body.new.value.trim().match(regex.value))) return error('value')

                    if (!validateTest(req.body.old.category.trim().match(regex.category))) return error('category')
                    if (!validateTest(req.body.new.category.trim().match(regex.category))) return error('category')

                    req.body.new.value = req.body.new.value.replace(',', '.')
                    req.body.old.value = req.body.old.value.replace(',', '.')

                    callback(req.body.old, req.body.new)

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

    validateRelativeRequest(['expiry', 'description', 'category', 'quant', 'value'], req.query)
        .then(() => {

            const error = (field) => {
                console.log(new Error(messages.FIELD_NO_MATCH(field)))
                callback(null)
            }

            if ('description' in req.query && !validateTest(req.query.description.trim().match(regex.description))) return error('description')

            if ('quant' in req.query && !validateTest(req.query.quant.toString().match(regex.quant))) return error('quant')

            if ('value' in req.query && !validateTest(req.query.value.trim().match(regex.value))) return error('value')

            if ('category' in req.query && !validateTest(req.query.category.trim().match(regex.category))) return error('category')

            if ('value' in req.query) req.query.value = req.query.value.replace(',', '.')

            callback(req.query)
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