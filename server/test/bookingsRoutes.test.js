import { expect } from "chai";
import supertest from "supertest";
import app from "../index.js";

const request = supertest(app);

describe("Bookings Routes", () => {
  let server;
  it("Get is valid request", () => {
    return request
      .get("/bookings")
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });

  it("Get all Bookings", () => {
    return request
      .get("/bookings")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });

});
