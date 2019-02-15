const path = require('path')

const publicPath = path.resolve(__dirname, '../../public')
const scripty = path => './src/frontend/views'.concat(path)

const entries = {
    style: ['./src/frontend/views/assets/build-css.js', './dump/[name].js'],
    index: [scripty('/scripts.js'), './js/scripts.js'],
    header: [scripty('/header/scripts.js'), './header/scripts.js']

}

const buildFiles = (chunkData, arrayEntry) => arrayEntry[chunkData.chunk.name][1]

const output = {
    path: publicPath,
    filename: chunkData => buildFiles(chunkData, entries)
}

const entry = {}

Object.keys(entries).map(e =>
    entry[e] = entries[e][0]
)

module.exports = {
    entry,
    output
}