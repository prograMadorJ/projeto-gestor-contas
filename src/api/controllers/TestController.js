
module.exports = {
    test(req,res) {
        res.send('Test passed OK')
    },
    testParams(req,res) {
        res.send(req.query)
    },
    testPost(req,res) {
        res.send(req.body)
    }
}