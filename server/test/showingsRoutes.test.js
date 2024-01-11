import { expect } from "chai";
import supertest from "supertest";
import app from "../index.js";

const request = supertest(app);

describe("Showings Routes", () => {
  let server;
  it("Get is valid request", () => {
    return request
      .get("/showings")
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });

  it("Get all Showings", () => {
    return request
      .get("/showings")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });
  
  it("Get One - ID = The Nice Guys", () => {
    return request
    .get("/showings/65993657aa3fac1da97de979")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(res.body).to.be.an("object");

      // Check startTime to see if it is a real date
      expect(res.body.startTime).to.be.a('string');
      expect(() => new Date(res.body.startTime)).to.not.throw();

      // Check seats are ints
      expect(res.body.totalSeats).to.be.a('number');
      expect(res.body.totalSeats % 1).to.equal(0);
      expect(res.body.seatsRemaining).to.be.a('number');
      expect(res.body.seatsRemaining % 1).to.equal(0);

      // Check other fields are string
      expect(res.body.filmID).to.be.a('string');
      expect(res.body.row1).to.be.a('string');
      expect(res.body.row2).to.be.a('string');
      expect(res.body.row3).to.be.a('string');
      expect(res.body.row4).to.be.a('string');
    });
});

it("Get One - No ID = Return All", () => {
    return request
    .get("/showings/")
    .expect(200) 
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(res.body).to.be.an("object");
    });
  });

  it("Get One - No ID in DB", () => {
    return request
    .get("/showings/111111111111111111111111")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(res.body).to.be.an("null");
    });
  });
  
// it("Create Showing", () => {
//   const newShowingData = {
//     filmID: "000000000000000000000000",
//     startTime: "2023-12-31T12:00:00.000Z",
//     row1: "Available,Available,Available,Aisle,Available,Available,Available,Available",
//     row2: "Available,Available,Available,Aisle,Available,Available,Available,Available",
//     row3: "Available,Available,Available,Aisle,Available,Available,Available,Available",
//     row4: "Available,Available,Available,Aisle,Available,Available,Available,Available",
//     totalSeats: 28,
//     seatsRemaining: 28,
//   };

//   return request
//     .post("/showings")
//     .send(newShowingData)
//     .expect(201)  
//     .expect("Content-Type", /json/)
//     .then((res) => {
//       expect(res.body).to.be.an('object');
//       expect(res.body.filmID).to.equal(newShowingData.filmID);
//       expect(res.body.startTime).to.equal(newShowingData.startTime);
//       expect(res.body.row1).to.equal(newShowingData.row1);
//       expect(res.body.row2).to.equal(newShowingData.row2);
//       expect(res.body.row3).to.equal(newShowingData.row3);
//       expect(res.body.row4).to.equal(newShowingData.row4);
//     });
// });

});
