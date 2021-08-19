const db = require('../data/dbconfig')

module.exports = {
    getAll
}

function getAll() {
    return db('pets')
}