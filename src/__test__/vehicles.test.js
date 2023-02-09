const request = require('supertest');
const app = require('../app');
let VEHICLE_ID;

describe('POST /vehicles', () => {
    describe('Given request body with missing property',  () => {
        test('Should give 400 status code with message in response body', async () => {
            const response = await request(app).post('/vehicles/create').send({
                "picture": "Hellothere",
                "name": "Hellothere",
                "make": "Hellothere",
                "model": "Hellothere",
            });
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBeDefined()
            expect(response.body.message).toEqual("\"body.color\" is required")
        })
    })

    describe('Give correct request body', () => {
        test('Should return new vehicle object', async () => {
            const response = await request(app).post('/vehicles/create').send({
                "picture": "Hellothere",
                "name": "Hellothere",
                "make": "Hellothere",
                "model": "Hellothere",
                "color": "Hellothere",
            });

            expect(response.statusCode).toBe(201);
            expect(response.body.id).toBeDefined()
            expect(response.body.name).toEqual("Hellothere")
            VEHICLE_ID = response.body.id
        })
    })
})


describe('GET /vehicles', () => {
    describe('Request vehicles data', () => {
        test('Should return 200 status code', async () => {
            const response = await request(app).get('/vehicles');
            expect(response.statusCode).toBe(200)
        })
        
        test('Should return json array', async () => {
            const response = await request(app).get('/vehicles');
            expect(Array.isArray(response.body)).toBe(true)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
    })

    describe("Request invalid single vehicle", () => {
        test('Should return 404 status code', async () => {
            const response = await request(app).get(`/vehicles/${VEHICLE_ID}s`);
            expect(response.statusCode).toBe(404)
        })
        test('Should return 404 status code', async () => {
            const response = await request(app).get(`/vehicles/${VEHICLE_ID}s`);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toEqual('No vehicle with such id')
        })
    })

    describe("Request a valid single vehicle", () => {
        test('Should return 200 status code', async () => {
            const response = await request(app).get(`/vehicles/${VEHICLE_ID}`);
            expect(response.statusCode).toBe(200)
        })
        test('Should return 200 status code with vehicle id', async () => {
            const response = await request(app).get(`/vehicles/${VEHICLE_ID}`);
            expect(response.body.message).not.toBeDefined();
            expect(response.body.id).toEqual(VEHICLE_ID)
    })
    })
})


describe('UPDATE /vehicles', () => {
    describe('Update and return new updated vehicle object', () => {
        test('Should return updated vehicle object', async () => {
            const response = await request(app).put(`/vehicles/${VEHICLE_ID}`).send({
                name: "UpdatedVehicle"
            });

            expect(response.statusCode).toBe(200);
            expect(response.body.id).toEqual(VEHICLE_ID)
            expect(response.body.name).toEqual("UpdatedVehicle")
        })
    })
    describe('Invalid Update vehicle request body', () => {
        test('Should return 400 status code due to invalid request body', async () => {
            const response = await request(app).put(`/vehicles/${VEHICLE_ID}`).send({
                names: "VehicleUpdated"
            });

            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBeDefined()
            expect(response.body.message).toEqual("\"body.names\" is not allowed")
        })
    })
    
    describe('Invalid vehicle id', () => {
        test('Should return 404 status code with message', async () => {
            const response = await request(app).put(`/vehicles/${VEHICLE_ID}s`).send({
                name: "UpdatedVehicle"
            });

            expect(response.statusCode).toBe(404);
            expect(response.body.message).toEqual("No vehicle with such id")
        })
    })
})


describe('DELETE /vehicles', () => {
    describe('Invalid vehicle id', () => {
        test('Should return 404 status code with message', async () => {
            const response = await request(app).delete(`/vehicles/${VEHICLE_ID}s`);

            expect(response.statusCode).toBe(404);
            expect(response.body.message).toEqual("No vehicle with such id")
        })
    })

    describe('Valid delete vehicle request', () => {
        test('Should return 404 status code with message', async () => {
            const response = await request(app).delete(`/vehicles/${VEHICLE_ID}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.id).toEqual(VEHICLE_ID)
    })
    })
})

