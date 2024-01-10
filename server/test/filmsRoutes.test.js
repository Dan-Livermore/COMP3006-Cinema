import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index.js';

const request = supertest(app);

describe('Film Routes', () => {
  let server;

  // Start the server before tests
  before((done) => {
    server = app.listen(3000, done);
  });

  it('Get all films', () => {
  return request
  .get('/films')
  .expect(200)
  .expect('Content-Type', /json/)
  .then((res) => {
    expect(res.body).to.be.an('object');
  });
});

  // Shutdown the server after tests
  after((done) => {
    server.close(done);
  });
});
