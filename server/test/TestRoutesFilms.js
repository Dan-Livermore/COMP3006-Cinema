import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index.js';

const request = supertest(app);

describe('Film Routes', () => {
  // ...

  it('should get all films', (done) => {
    request
      .get('/films')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.be.an('object');
        // Add more assertions based on your expected behavior
        done();
      });
  });
});