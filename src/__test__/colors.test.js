const request = require('supertest');
const app = require('../app');
let COLOR_ID;

describe('POST /colors', () => {
    describe('Given request body with missing property',  () => {
        test('Should give 400 status code with message in response body', async () => {
            const response = await request(app).post('/colors/create').send({
                "backgroundColor": {
                    "r": 255,
                    "g": 255,
                    "b": 255
                },
            });
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBeDefined()
            expect(response.body.message).toEqual("\"body.colors\" is required")
        })
    })

    describe('Give correct request body', () => {
        test('Should return new color object', async () => {
            const response = await request(app).post('/colors/create').send({
                "backgroundColor": {
                    "r": 255,
                    "g": 255,
                    "b": 255
                },
                "colors": [
                    {
                        "r": 255,
                        "g": 255,
                        "b": 255
                    }
                ],
            });

            expect(response.statusCode).toBe(201);
            expect(response.body.id).toBeDefined()
            expect(response.body.backgroundColor).toEqual({
                "r": 255,
                "g": 255,
                "b": 255
            })
            COLOR_ID = response.body.id
        })
    })
})


describe('GET /colors', () => {
    describe('Request colors data', () => {
        test('Should return 200 status code', async () => {
            const response = await request(app).get('/colors');
            expect(response.statusCode).toBe(200)
        })
        
        test('Should return json array', async () => {
            const response = await request(app).get('/colors');
            expect(Array.isArray(response.body)).toBe(true)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
    })

    describe("Request invalid single color", () => {
        test('Should return 404 status code', async () => {
            const response = await request(app).get(`/colors/${COLOR_ID}s`);
            expect(response.statusCode).toBe(404)
        })
        test('Should return 404 status code', async () => {
            const response = await request(app).get(`/colors/${COLOR_ID}s`);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toEqual('No color with such id')
        })
    })

    describe("Request a valid single color", () => {
        test('Should return 200 status code', async () => {
            const response = await request(app).get(`/colors/${COLOR_ID}`);
            expect(response.statusCode).toBe(200)
        })
        test('Should return 200 status code with color id', async () => {
            const response = await request(app).get(`/colors/${COLOR_ID}`);
            expect(response.body.message).not.toBeDefined();
            expect(response.body.id).toEqual(COLOR_ID)
    })
    })
})


describe('UPDATE /colors', () => {
    describe('Update and return new updated color object', () => {
        test('Should return updated color object', async () => {
            const response = await request(app).put(`/colors/${COLOR_ID}`).send({
                backgroundColor: {
                    "r": 233,
                    "g": 255,
                    "b": 255
                }
            });

            expect(response.statusCode).toBe(200);
            expect(response.body.id).toEqual(COLOR_ID)
            expect(response.body.backgroundColor).toEqual({
                "r": 233,
                "g": 255,
                "b": 255
            })
        })
    })
    describe('Invalid Update color request body', () => {
        test('Should return 400 status code due to invalid request body', async () => {
            const response = await request(app).put(`/colors/${COLOR_ID}`).send({
                backgroundColors: {
                    "r": 233,
                    "g": 255,
                    "b": 255
                }
            });

            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBeDefined()
            expect(response.body.message).toEqual("\"body.backgroundColors\" is not allowed")
        })
    })
    
    describe('Invalid color id', () => {
        test('Should return 404 status code with message', async () => {
            const response = await request(app).put(`/colors/${COLOR_ID}s`).send({
                backgroundColor: {
                    "r": 233,
                    "g": 255,
                    "b": 255
                }
            });

            expect(response.statusCode).toBe(404);
            expect(response.body.message).toEqual("No color with such id")
        })
    })
})


describe('DELETE /colors', () => {
    describe('Invalid color id', () => {
        test('Should return 404 status code with message', async () => {
            const response = await request(app).delete(`/colors/${COLOR_ID}s`);

            expect(response.statusCode).toBe(404);
            expect(response.body.message).toEqual("No color with such id")
        })
    })

    describe('Valid delete color request', () => {
        test('Should return 404 status code with message', async () => {
            const response = await request(app).delete(`/colors/${COLOR_ID}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.id).toEqual(COLOR_ID)
    })
    })
})

