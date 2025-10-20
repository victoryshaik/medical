const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('Basic API', () => {
  let patientId;

  test('health check', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.service).toBe('medlab-sample');
  });

  test('create patient', async () => {
    const res = await request(app)
      .post('/patients')
      .send({ name: 'Alice', age: 30, gender: 'F' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Alice');
    patientId = res.body.id;
  });

  test('create test for patient', async () => {
    const res = await request(app)
      .post('/tests')
      .send({ patient_id: patientId, test_name: 'CBC', result: 'Normal' });
    expect(res.statusCode).toBe(201);
    expect(res.body.test_name).toBe('CBC');
  });

  afterAll((done) => {
    db.close(done);
  });
});
