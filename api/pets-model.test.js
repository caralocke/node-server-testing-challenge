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
})