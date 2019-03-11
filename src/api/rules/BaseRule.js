const validateRequest = (fields, object) => {

    return new Promise((resolve, reject) => {

        let result = true

        async function search() {

            await fields.map(field => {

                if (Object.keys(object).length !== fields.length || !Object.keys(object).includes(field))
                    return result = false
            })
        }

        search()

        if (result) resolve()
        else reject()

    })

}

const validateRelativeRequest = (fields, object) => {

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

module.exports = {
    validateRequest,
    validateRelativeRequest,
    validateTest
}