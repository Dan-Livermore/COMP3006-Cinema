import { expect } from "chai";
import supertest from "supertest";
import app from "../index.js";

const request = supertest(app);

describe("Users Routes", () => {
  let server;

  it("READ is valid request", () => {
    return request
      .get("/users")
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });

  // it("UPDATE is a valid request", () => {
  //   const newUserData = {
  //     email: "original@test.com1",
  //     password: "original",
  //   };
  //   const updatedUserData = {
  //       email: "update@test.com1",
  //       password: "update",
  //     };
  //   return request
  //     .post("/signup")
  //     .send(newUserData)
  //     .expect(200)
  //     .then((res) => {
  //       return request
  //         .put(`/users/${res.body._id}`)
  //         .send(updatedUserData)
  //         .expect(200)
  //         .expect("Content-Type", /json/)
  //         .then((updatedRes) => {
  //           expect(updatedRes.body).to.be.an("object");
  //           return request.delete(`/users/${res.body._id}`).expect(200);
  //         });
  //     });
  // });

  
  // it("DELETE is a valid request", () => {
  //   const newUserData = {
  //     email: "original@test.com2",
  //     password: "original",
  //   };

  //   return request
  //     .post("/signup")
  //     .send(newUserData)
  //     .expect(200)
  //     .then((createRes) => {
  //       return request.delete(`/users/${createRes.body._id}`).expect(200);
  //     });
  // });

  it("GET ALL Films", () => {
    return request
      .get("/users")
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });
 
  it("GET ONE - ID Too Short", () => {
    return request
      .get("/users/1")
      .expect(500)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });
  it("GET ONE - No ID = Return All", () => {
    return request
      .get("/users/")
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });
  it("GET ONE - No ID in DB", () => {
    return request
      .get("/users/111111111111111111111111")
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("null");
      });
  });

  // it("DELETE an existing film", () => {
  //   const newUserData = {
  //     email: "original@test.com3",
  //     password: "original",
  //   };

  //   return request
  //     .post("/signup")
  //     .send(newUserData)
  //     .expect(200)
  //     .then((createRes) => {
  //       return request.delete(`/users/${createRes.body._id}`).expect(200);
  //     });
  // });

  // it("UPDATE a Film", async () => {
  //   const newUserData = {
  //     email: "original@test.com4",
  //     password: "original",
  //   };
  //   const updatedUserData = {
  //     email: "update@test.com4",
  //     password: "update",
  //   };
  
  //   // Create the user
  //   const createRes = await request
  //     .post("/signup")
  //     .send(newUserData)
  //     .expect(200);
  
  //   // Update the user
  //   const updateRes = await request
  //     .put(`/users/${createRes.body._id}`)
  //     .send(updatedUserData)
  //     .expect(200);
  
  //   // Assertions for the updated user
  //   expect(updateRes.body).to.be.an("object");
  
  //   // Delete the user
  //   await request.delete(`/users/${createRes.body._id}`).expect(200);
  // });
  
});
