import { expect } from 'chai';
import supertest from 'supertest';
import app from '../index.js';
import mongoose from 'mongoose';
import { mongoDBURL } from '../config.js';

const request = supertest(app);

describe('Film Routes', () => {
  before(function () {
    // Increase the timeout for the entire test suite (if needed)
    this.timeout(5000);
  });

  let server;

  before(async function () {
    // Connect to MongoDB Atlas before running the tests
    await mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async function () {
    // Disconnect from MongoDB Atlas after the tests are completed
    await mongoose.disconnect();
  });

  it('should connect to MongoDB Atlas', function () {
    // This test is now asynchronous and returns a promise
    return mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        // Your test logic
        // You can also add assertions related to the MongoDB connection here if needed
      });
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
});
