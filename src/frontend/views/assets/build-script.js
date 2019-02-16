const path = require('path')

const publicPath = path.resolve(__dirname, '../../public')
const scripty = path => './src/frontend/views'.concat(path)

const entries = {
    style: ['/assets/build-css.js', './dump/[name].js'],
    index: ['/scripts.js', './js/scripts.js'],
    header: ['/header/scripts.js', './header/scripts.js'],
    register_category: ['/cadastrar/categoria/scripts.js', './cadastrar/categoria/scripts.js']

}

const buildFiles = (chunkData, arrayEntry) => arrayEntry[chunkData.chunk.name][1]

const output = {
    path: publicPath,
    filename: chunkData => buildFiles(chunkData, entries)
}

const entry = {}

Object.keys(entries).map(e =>
    entry[e] = scripty(entries[e][0])
)

module.exports = {
    entry,
    output
}