const server = require('../src/api/app')
const port = process.env.PORT || 3000

server.listen(port, () => {
    return console.log(`Server running on http://localhost:${port}`)
})