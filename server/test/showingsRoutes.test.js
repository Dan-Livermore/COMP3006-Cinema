import { expect } from "chai";
import supertest from "supertest";
import app from "../index.js";

const request = supertest(app);

describe("Showings Routes", () => {
  let server;
  
  it("CREATE is a valid request", () => {
    const newShowingData = {
      filmID: "000000000000000000000000",
      startTime: "2023-01-01T00:00:00.000Z",
      row1: "Unit Test",
      row2: "Unit Test",
      row3: "Unit Test",
      row4: "Unit Test",
      totalSeats: 100,
      seatsRemaining: 100,
    };

    return request
      .post("/showings")
      .send(newShowingData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        return request
        .delete(`/showings/${res.body._id}`)
        .expect(200);
      });
  });

  it("READ is a valid request", () => {
    return request
      .get("/showings")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });
  
  it("UPDATE is a valid request", () => {
    const newShowingData = {
      filmID: "000000000000000000000000",
      startTime: "2023-01-01T00:00:00.000Z",
      row1: "Unit Test",
      row2: "Unit Test",
      row3: "Unit Test",
      row4: "Unit Test",
      totalSeats: 100,
      seatsRemaining: 100,
    };
    const updatedData = {
      filmID: "111111111111111111111111",
      startTime: "2023-01-01T00:00:00.000Z",
      row1: "Unit Test1",
      row2: "Unit Test2",
      row3: "Unit Test3",
      row4: "Unit Test4",
      totalSeats: 100,
      seatsRemaining: 100,
    };

    return request
      .post("/showings")
      .send(newShowingData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        return request
          .put(`/showings/${res.body._id}`)
          .send(updatedData)
          .expect(200)
          .expect("Content-Type", /json/)
          .then((updatedRes) => {
            expect(updatedRes.body).to.be.an("object");
            return request
              .delete(`/showings/${res.body._id}`)
              .expect(200);
          });
      });
  });

  it("DELETE is a valid request", () => {
    const newShowingData = {
      filmID: "000000000000000000000000",
      startTime: "2023-01-01T00:00:00.000Z",
      row1: "Unit Test",
      row2: "Unit Test",
      row3: "Unit Test",
      row4: "Unit Test",
      totalSeats: 100,
      seatsRemaining: 100,
    };

    return request
      .post("/showings")
      .send(newShowingData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((createRes) => {
        return request.delete(`/showings/${createRes.body._id}`).expect(200);
      });
  });

  it("GET ALL Showings", () => {
    return request
      .get("/showings")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });

  
  it("CREATE a Showing", () => {
    const newShowingData = {
      filmID: "000000000000000000000000",
      startTime: "2023-01-01T00:00:00.000Z",
      row1: "Unit Test",
      row2: "Unit Test",
      row3: "Unit Test",
      row4: "Unit Test",
      totalSeats: 100,
      seatsRemaining: 100,
    };

    return request
      .post("/showings")
      .send(newShowingData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.filmID).to.equal(newShowingData.filmID);
        expect(res.body.startTime).to.equal(newShowingData.startTime);
        expect(res.body.row1).to.equal(newShowingData.row1);
        expect(res.body.row2).to.equal(newShowingData.row2);
        expect(res.body.row3).to.equal(newShowingData.row3);
        expect(res.body.row4).to.equal(newShowingData.row4);
        expect(res.body.totalSeats).to.equal(newShowingData.totalSeats);
        expect(res.body.seatsRemaining).to.equal(newShowingData.seatsRemaining);
        return request
        .delete(`/showings/${res.body._id}`)
        .expect(200);
      });
  });

  it("CREATE Showing - startTime not a date", () => {
    const newShowingData = {
      filmID: "000000000000000000000000",
      startTime: "New Date",
      row1: "Unit Test",
      row2: "Unit Test",
      row3: "Unit Test",
      row4: "Unit Test",
      totalSeats: 100,
      seatsRemaining: 100,
    };

    return request
      .post("/showings")
      .send(newShowingData)
      .expect(500)
      .expect("Content-Type", /json/);
  });

  it("CREATE Showing - totalSeats & seatsRemaining are strings", () => {
    const newShowingData = {
      filmID: "000000000000000000000000",
      startTime: "New Date",
      row1: "Unit Test",
      row2: "Unit Test",
      row3: "Unit Test",
      row4: "Unit Test",
      totalSeats: "100",
      seatsRemaining: "100",
    };
    return request
      .post("/showings")
      .send(newShowingData)
      .expect(500)
      .expect("Content-Type", /json/);
  });

  


  it("UPDATE a Showing", () => {
    const newShowingData = {
      filmID: "000000000000000000000000",
      startTime: "2023-01-01T00:00:00.000Z",
      row1: "Unit Test",
      row2: "Unit Test",
      row3: "Unit Test",
      row4: "Unit Test",
      totalSeats: 100,
      seatsRemaining: 100,
    };
    const updatedData = {
      filmID: "111111111111111111111111",
      startTime: "2023-01-01T00:00:00.000Z",
      row1: "Unit Test1",
      row2: "Unit Test2",
      row3: "Unit Test3",
      row4: "Unit Test4",
      totalSeats: 100,
      seatsRemaining: 100,
    };

    return request
      .post("/showings")
      .send(newShowingData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        return request
          .put(`/showings/${res.body._id}`)
          .send(updatedData)
          .expect(200)
          .expect("Content-Type", /json/)
          .then((updatedRes) => {
            expect(updatedRes.body).to.be.an("object");
            return request
              .delete(`/showings/${res.body._id}`)
              .expect(200);
          });
      });
  });

  

  it("DELETE a Showing", () => {
    const newShowingData = {
      filmID: "000000000000000000000000",
      startTime: "2023-01-01T00:00:00.000Z",
      row1: "Unit Test",
      row2: "Unit Test",
      row3: "Unit Test",
      row4: "Unit Test",
      totalSeats: 100,
      seatsRemaining: 100,
    };

    return request
      .post("/showings")
      .send(newShowingData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((createRes) => {
        return request.delete(`/showings/${createRes.body._id}`).expect(200);
      });
  });
});
