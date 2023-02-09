const request = require('supertest');
const app = require('../app');
let TRIP_ID;

describe('POST /trips', () => {
    describe('Given request body with missing property',  () => {
        test('Should give 400 status code with message in response body', async () => {
            const response = await request(app).post('/trips/create').send({
                "arrivalLocation": "HiThere",
                "pickUpLocation": "HiThere",
                "paymentType": "HiThere",
                "dropOffLocation": "HiThere",
                "passengerNote": "HiThere",
                "passengers": [1, 5],
                "fare": [60, 100]
            });
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toEqual("\"body.arrivalTime\" is required")
        })
    })

    describe('Give correct request body', () => {
        test('Should return new trip object', async () => {
            const response = await request(app).post('/trips/create').send({
                "arrivalTime": new Date().toISOString(),
                "arrivalLocation": "HiThere",
                "pickUpLocation": "HiThere",
                "paymentType": "HiThere",
                "dropOffLocation": "HiThere",
                "passengerNote": "HiThere",
                "passengers": [1, 5],
                "fare": [60, 100]
            });

            expect(response.statusCode).toBe(201);
            expect(response.body.id).toBeDefined()
            expect(response.body.passengerNote).toEqual("HiThere")
            TRIP_ID = response.body.id
        })
    })
})


describe('GET /trips', () => {
    describe('Request trips data', () => {
        test('Should return 200 status code', async () => {
            const response = await request(app).get('/trips');
            expect(response.statusCode).toBe(200)
        })
        
        test('Should return json array', async () => {
            const response = await request(app).get('/trips');
            expect(Array.isArray(response.body)).toBe(true)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
    })

    describe("Request invalid single trip", () => {
        test('Should return 404 status code', async () => {
            const response = await request(app).get(`/trips/${TRIP_ID}s`);
            expect(response.statusCode).toBe(404)
        })
        test('Should return 404 status code', async () => {
            const response = await request(app).get(`/trips/${TRIP_ID}s`);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toEqual('No trip with such id')
        })
    })

    describe("Request a valid single trip", () => {
        test('Should return 200 status code', async () => {
            const response = await request(app).get(`/trips/${TRIP_ID}`);
            expect(response.statusCode).toBe(200)
        })
        test('Should return 200 status code with trip id', async () => {
            const response = await request(app).get(`/trips/${TRIP_ID}`);
            expect(response.body.message).not.toBeDefined();
            expect(response.body.id).toEqual(TRIP_ID)
    })
    })
})


describe('UPDATE /trips', () => {
    describe('Update and return new updated trip object', () => {
        test('Should return updated trip object', async () => {
            const response = await request(app).put(`/trips/${TRIP_ID}`).send({
                passengerNote: "UpdatedNote"
            });

            expect(response.statusCode).toBe(200);
            expect(response.body.id).toEqual(TRIP_ID)
            expect(response.body.passengerNote).toEqual("UpdatedNote")
        })
    })
    describe('Invalid Update trip request body', () => {
        test('Should return 400 status code due to invalid request body', async () => {
            const response = await request(app).put(`/trips/${TRIP_ID}`).send({
                passengerNotes: "NoteUpdated"
            });

            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBeDefined()
            expect(response.body.message).toEqual("\"body.passengerNotes\" is not allowed")
        })
    })
    
    describe('Invalid trip id', () => {
        test('Should return 404 status code with message', async () => {
            const response = await request(app).put(`/trips/${TRIP_ID}s`).send({
                passengerNote: "Updated"
            });

            expect(response.statusCode).toBe(404);
            expect(response.body.message).toEqual("No trip with such id")
        })
    })
})


describe('DELETE /trips', () => {
    describe('Invalid trip id', () => {
        test('Should return 404 status code with message', async () => {
            const response = await request(app).delete(`/trips/${TRIP_ID}s`);

            expect(response.statusCode).toBe(404);
            expect(response.body.message).toEqual("No trip with such id")
        })
    })

    describe('Valid delete trip request', () => {
        test('Should return 404 status code with message', async () => {
            const response = await request(app).delete(`/trips/${TRIP_ID}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.id).toEqual(TRIP_ID)
    })
    })
})

