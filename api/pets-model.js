const db = require('../data/dbconfig')

module.exports = {
    getAll,
    getById,
    insert
}

function getAll() {
    return db('pets')
}

function getById(id) {
    return db('pets').where('pet_id', id).first()
}
  
async function insert(pet) {
    return await db('pets').insert(pet).then(([id]) => {
      return getById(id)
    })
}