const request = require('supertest');
const app = require('../app');
let DRIVER_ID;

describe('POST /drivers', () => {
    describe('Given request body with missing property',  () => {
        test('Should give 400 status code with message in response body', async () => {
            const response = await request(app).post('/drivers/create').send({
                name: "Hello",
                picture: "hi"
            });
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBeDefined()
            expect(response.body.message).toEqual("\"body.description\" is required")
        })
    })

    describe('Give correct request body', () => {
        test('Should return new driver object', async () => {
            const response = await request(app).post('/drivers/create').send({
                name: "Hello",
                picture: "hi",
                description: "Description"
            });

            expect(response.statusCode).toBe(201);
            expect(response.body.id).toBeDefined()
            expect(response.body.name).toEqual("Hello")
            DRIVER_ID = response.body.id
        })
    })
})


describe('GET /drivers', () => {
    describe('Request drivers data', () => {
        test('Should return 200 status code', async () => {
            const response = await request(app).get('/drivers');
            expect(response.statusCode).toBe(200)
        })
        
        test('Should return json array', async () => {
            const response = await request(app).get('/drivers');
            expect(Array.isArray(response.body)).toBe(true)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
    })

    describe("Request invalid single driver", () => {
        test('Should return 404 status code', async () => {
            const response = await request(app).get(`/drivers/${DRIVER_ID}s`);
            expect(response.statusCode).toBe(404)
        })
        test('Should return 404 status code', async () => {
            const response = await request(app).get(`/drivers/${DRIVER_ID}s`);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toEqual('No driver with such id')
        })
    })

    describe("Request a valid single driver", () => {
        test('Should return 200 status code', async () => {
            const response = await request(app).get(`/drivers/${DRIVER_ID}`);
            expect(response.statusCode).toBe(200)
        })
        test('Should return 404 status code', async () => {
            const response = await request(app).get(`/drivers/${DRIVER_ID}`);
            expect(response.body.message).not.toBeDefined();
            expect(response.body.id).toEqual(DRIVER_ID)
    })
    })
})


describe('UPDATE /drivers', () => {
    describe('Update and return new updated driver object', () => {
        test('Should return updated driver object', async () => {
            const response = await request(app).put(`/drivers/${DRIVER_ID}`).send({
                name: "Updated"
            });

            expect(response.statusCode).toBe(200);
            expect(response.body.id).toEqual(DRIVER_ID)
            expect(response.body.name).toEqual("Updated")
        })
    })
    describe('Invalid Update driver request body', () => {
        test('Should return 400 status code due to invalid request body', async () => {
            const response = await request(app).put(`/drivers/${DRIVER_ID}`).send({
                names: "Updated"
            });

            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBeDefined()
            expect(response.body.message).toEqual("\"body.names\" is not allowed")
        })
    })
    
    describe('Invalid driver id', () => {
        test('Should return 404 status code with message', async () => {
            const response = await request(app).put(`/drivers/${DRIVER_ID}s`).send({
                name: "Updated"
            });

            expect(response.statusCode).toBe(404);
            expect(response.body.message).toEqual("No driver with such id")
        })
    })
})


describe('DELETE /drivers', () => {
    describe('Invalid driver id', () => {
        test('Should return 404 status code with message', async () => {
            const response = await request(app).delete(`/drivers/${DRIVER_ID}s`);

            expect(response.statusCode).toBe(404);
            expect(response.body.message).toEqual("No driver with such id")
        })
    })

    describe('Valid delete user request', () => {
        test('Should return 404 status code with message', async () => {
            const response = await request(app).delete(`/drivers/${DRIVER_ID}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.id).toEqual(DRIVER_ID)
    })
    })
})

