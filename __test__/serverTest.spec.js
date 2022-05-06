const request = require('supertest');
const app = require('../src/server/index')

describe('Root path testing', () => {
    test('GET method testing', async () => {
     const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    });
})


