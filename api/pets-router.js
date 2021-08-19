const express = require('express')
const router = express.Router()
const Pets = require('./pets-model')
const { validatePet } = require('./pets-middleware')

router.get('/', (req, res, next) => {
    Pets.getAll()
        .then(pets => {
            res.status(200).json(pets)
        })
        .catch(err => {
            res.status(500).json({ message: `${err.message}`})
        })
})

router.post('/', validatePet, async (req, res) => {
    try {
      res.status(201)
        .json(await Pets.insert(req.body))
    } catch (err) {
      next(err)
    }
  })

  router.delete('/:id', async (req, res, next) => {
      try {
          res.status(202).json(await Pets.remove(req.params.id))
      } catch (err) {
          next()
      }
  })

module.exports = router