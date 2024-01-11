import { expect } from "chai";
import supertest from "supertest";
import app from "../index.js";

const request = supertest(app);

describe("Showings Routes", () => {
  let server;
  it("Get all Showings", () => {
    return request
      .get("/showings")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });
});
