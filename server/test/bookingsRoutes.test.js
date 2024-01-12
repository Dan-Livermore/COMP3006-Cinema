import { expect } from "chai";
import supertest from "supertest";
import app from "../index.js";

const request = supertest(app);

describe("Bookings Routes", () => {
  let server;
  it("CREATE is a valid request", () => {
    const newBookingData = {
      userID: "000000000000000000000000",
      showingID: "65a1b44d3f3b520b32f42e74",
      seatNo: "A0",
    };

    return request
      .post("/bookings")
      .send(newBookingData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        return request
        .delete(`/bookings/${res.body._id}`)
        .expect(200);
      });
  });

  it("READ is a valid request", () => {
    return request
      .get("/bookings")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });
  
  it("UPDATE is a valid request", () => {
    const newBookingData = {
      userID: "000000000000000000000000",
      showingID: "65a1b44d3f3b520b32f42e74",
      seatNo: "A0",
    };
    const updatedData = {
        userID: "111111111111111111111111",
        showingID: "65a1b44d3f3b520b32f42e74",
        seatNo: "D8",
      };

    return request
      .post("/bookings")
      .send(newBookingData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        return request
          .put(`/bookings/${res.body._id}`)
          .send(updatedData)
          .expect(200)
          .expect("Content-Type", /json/)
          .then((updatedRes) => {
            expect(updatedRes.body).to.be.an("object");
            return request
              .delete(`/bookings/${res.body._id}`)
              .expect(200);
          });
      });
  });

  it("DELETE is a valid request", () => {
    const newBookingData = {
      userID: "000000000000000000000000",
      showingID: "65a1b44d3f3b520b32f42e74",
      seatNo: "A0",
    };

    return request
      .post("/bookings")
      .send(newBookingData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((createRes) => {
        return request.delete(`/bookings/${createRes.body._id}`).expect(200);
      });
  });

  it("GET ALL Bookings", () => {
    return request
      .get("/bookings")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });

  it("CREATE a Booking", () => {
    const newBookingData = {
      userID: "000000000000000000000000",
      showingID: "65a1b44d3f3b520b32f42e74",
      seatNo: "A0",
    };

    return request
      .post("/bookings")
      .send(newBookingData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.userID).to.equal(newBookingData.userID);
        expect(res.body.showingID).to.equal(newBookingData.showingID);
        expect(res.body.seatNo).to.equal(newBookingData.seatNo);
        return request
        .delete(`/bookings/${res.body._id}`)
        .expect(200);
      });
  });

  it("UPDATE a Booking", () => {
    const newBookingData = {
      userID: "000000000000000000000000",
      showingID: "65a1b44d3f3b520b32f42e74",
      seatNo: "A0",
    };
    const updatedData = {
      userID: "111111111111111111111111",
      showingID: "65a1b44d3f3b520b32f42e74",
      seatNo: "D8",
    };

    return request
      .post("/bookings")
      .send(newBookingData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        return request
          .put(`/bookings/${res.body._id}`)
          .send(updatedData)
          .expect(200)
          .expect("Content-Type", /json/)
          .then((updatedRes) => {
            expect(updatedRes.body).to.be.an("object");
            return request
              .delete(`/bookings/${res.body._id}`)
              .expect(200);
          });
      });
  });

  it("DELETE a Booking", () => {
    const newBookingData = {
      userID: "000000000000000000000000",
      showingID: "65a1b44d3f3b520b32f42e74",
      seatNo: "A0",
    };

    return request
      .post("/bookings")
      .send(newBookingData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((createRes) => {
        return request.delete(`/bookings/${createRes.body._id}`).expect(200);
      });
  });

});
