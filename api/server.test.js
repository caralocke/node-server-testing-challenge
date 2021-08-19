const request = require('supertest')
const db = require('../data/dbconfig')
const server = require('./server')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db.seed.run()
})

describe('[GET] /pets',  () => {
    it('should return a 200 OK status', async () => {
        const res = await request(server).get('/pets')
        expect(res.status).toBe(200)
    })
    it('should return JSON', async () => {
        const res = await request(server).get('/pets')
        expect(res.type).toBe('application/json')
    })
})

describe('[POST] /pets', () => {
    it('returns a 201 OK status', async () => {
        const res = await request(server).post('/pets').send({ name: 'Foxy'})
        expect(res.status).toBe(201)
    })
    it('responds with 422 if no name in payload', async () => {
        const res = await request(server).post('/pets').send({})
        expect(res.status).toBe(422)
    })
    it('responds with the newly created pet', async () => {
        let res = await request(server).post('/pets').send({ name: 'Foxy'})
        expect(res.body).toMatchObject({ name: 'Foxy' })
        res = await request(server).post('/pets').send({ name: 'Sofi'})
        expect(res.body).toMatchObject({ name: 'Sofi' })
    })
})