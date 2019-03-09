const validateRequest = (fields, object) => {

    return new Promise((resolve, reject) => {

        let result = true

        async function search() {

            await Object.keys(object).map(field => {

                if (!fields.includes(field))
                    return result = false
            })
        }

        search()

        if (result) resolve()
        else reject()
    })

}

const validateTest = test => (test != null && test[0] == test.input)

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
        .catch(() => {

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

    const error = () => {
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
const getRule = registerRule

module.exports = {
    regex,
    registerRule,
    updateRule,
    deleteRule,
    getRule
}