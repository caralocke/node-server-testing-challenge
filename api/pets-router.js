const express = require('express')
const router = express.Router()
const Pets = require('./pets-model')

router.get('/', (req, res, next) => {
    Pets.getAll()
        .then(pets => {
            res.status(200).json(pets)
        })
        .catch(err => {
            res.status(500).json({ message: `${err.message}`})
        })
})

module.exports = router