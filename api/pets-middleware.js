function validatePet(req, res, next) {
    if(!req.body.name || !req.body.name.trim()) {
        res.status(422).json({ message: 'A name is required'})
    } else {
        next()
    }
}
module.exports = {
    validatePet
}