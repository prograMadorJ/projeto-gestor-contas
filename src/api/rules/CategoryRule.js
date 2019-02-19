const validateRequest = (fields, object, callback) => callback(fields in object)

const regex = {
    categoryName: '^[A-zÀ-ú]+$|[A-zÀ-ú]+?(\\s&\\s[A-zÀ-ú]+|\\s\\([A-zÀ-ú]+\\))$'
}

module.exports = {
    regex,
    registerRule(req, callback) {

        validateRequest(['name'], req.body, isValid => {

            if (!isValid) return callback(null)

            test = req.body.name.trim().match(regex.categoryName)

            if (test != null && test[0] == test.input)
                callback(req.body)
            else
                return callback(null)
        })
    },
    updateRule(req, callback) {

        validateRequest(['name'], req.body.old, isValid => {

            if (!isValid) return callback(null)

            test = req.body.name.trim().match(regex.categoryName)

            if (test != null && test[0] == test.input)
                callback(req.body)
            else
                return callback(null)
        })
    }
}