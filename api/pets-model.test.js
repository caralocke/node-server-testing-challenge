const Pets = require('./pets-model')
const db = require('../data/dbconfig')

test('it is the correct environment for the tests', () => {
    expect(process.env.DB_ENV).toBe('testing')
})

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db.seed.run()
})

describe('Pet db access functions', () => {
    describe('Pets.getAll', () => {
        it('returns all of the pets in the table', async () => {
            const pets = await Pets.getAll()
            expect(pets).toHaveLength(3)
        })
        it('returns the correct pet shape', async () => {
            const pets = await Pets.getAll()
            expect(pets[1]).toHaveProperty('name', 'Fred')
            expect(pets[0]).toMatchObject({ pet_id: 1, name: 'Scooby'})
        })
    })
    
    describe('Pets.insert', () => {
        it('adds a new pet to the table', async () => {
            const newPet = { pet_id: 4, name: 'Foxy'}
            await Pets.insert(newPet)
            const pets = await db('pets')
            expect(pets).toHaveLength(4)
        })
        it('returns the newly created pet', async () => {
            const pet = { pet_id: 4, name: 'Foxy'}
            const newPet = await Pets.insert(pet)
            expect(newPet).toMatchObject(pet)
        })
    })
})