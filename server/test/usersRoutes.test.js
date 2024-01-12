import { expect } from "chai";
import supertest from "supertest";
import app from "../index.js";

const request = supertest(app);

describe("Users Routes", () => {
  let server;
  it("Get is a valid request", () => {
    return request
      .get("/users")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });
it("Get all Users", () => {
  return request
    .get("/users")
    .expect(200)
    .expect("Content-Type", /json/)
    .then((res) => {
      expect(res.body).to.be.an("object");
    });
});
});
//   it("GET ONE by ID", async () => {
//     const newUserData = {
//       email: "Email@Unittest.com",
//       password: "New password",
//     };

//     // Create the user
//     const createUserResponse = await request
//       .post("/users")
//       .send(newUserData)
//       .expect(200)
//       .expect("Content-Type", /json/);

//     console.log("User created:", createUserResponse.body);

//     // Get the user by ID
//     const getUserByIdResponse = await request
//       .get(`/users/${createUserResponse.body.id}`)
//       .expect(200)
//       .expect("Content-Type", /json/);

//     console.log("User fetched by ID:", getUserByIdResponse.body);

//     // Assertions
//     expect(getUserByIdResponse.body).to.be.an("object");
//     expect(getUserByIdResponse.body.email).to.equal(newUserData.email);
//   });
// });  



//     return request
//     .get("/films/6583347eed59946e06f53065")
//     .expect(200)
//     .expect("Content-Type", /json/)
//     .then((res) => {
//       expect(res.body).to.be.an("object");

//       // Check releaseDate to see if it is a real date
//       expect(res.body.releaseDate).to.be.a('string');
//       expect(() => new Date(res.body.releaseDate)).to.not.throw();

//       // Check runtime is an int
//       expect(res.body.runtime).to.be.a('number');
//       expect(res.body.runtime % 1).to.equal(0);

//       // Check other fields are string
//       expect(res.body.title).to.be.a('string');
//       expect(res.body.director).to.be.a('string');
//       expect(res.body.ageRating).to.be.a('string');
//       expect(res.body.description).to.be.a('string');
//       expect(res.body.poster).to.be.a('string');
//     });
// });
// it("Get One - ID Too Short", () => {
//   return request
//   .get("/films/1")
//   .expect(500)
//   .expect("Content-Type", /json/)
//   .then((res) => {
//     expect(res.body).to.be.an("object");
//   });
// });
// it("Get One - No ID = Return All", () => {
//   return request
//   .get("/films/")
//   .expect(200) 
//   .expect("Content-Type", /json/)
//   .then((res) => {
//     expect(res.body).to.be.an("object");
//   });
// });
// it("Get One - No ID in DB", () => {
//   return request
//   .get("/films/111111111111111111111111")
//   .expect(200)
//   .expect("Content-Type", /json/)
//   .then((res) => {
//     expect(res.body).to.be.an("null");
//   });
// });
  

// it("Create Film", () => {
//   const newFilmData = {
//     title: "New Film",
//     director: "New Director",
//     releaseDate: "2023-01-01T00:00:00.000Z",
//     ageRating: "New Rating",
//     runtime: 100,
//     description: "New Rating",
//     poster: "New Image Link",
//   };

//   return request
//     .post("/films")
//     .send(newFilmData)
//     .expect(201)  
//     .expect("Content-Type", /json/)
//     .then((res) => {
//       expect(res.body).to.be.an('object');
//       expect(res.body.title).to.equal(newFilmData.title);
//       expect(res.body.director).to.equal(newFilmData.director);
//       expect(res.body.releaseDate).to.equal(newFilmData.releaseDate);
//       expect(res.body.ageRating).to.equal(newFilmData.ageRating);
//       expect(res.body.runtime).to.equal(newFilmData.runtime);
//       expect(res.body.description).to.equal(newFilmData.description);
//       expect(res.body.poster).to.equal(newFilmData.poster);
//     });
// });
// it("Create Film - releaseDate not a date", () => {
//   const newFilmData = {
//     title: "New Film",
//     director: "New Director",
//     releaseDate: "New Date",
//     ageRating: "New Rating",
//     runtime: 100,
//     description: "New Rating",
//     poster: "New Image Link",
//   };
//   return request
//     .post("/films")
//     .send(newFilmData)
//     .expect(500)  
//     .expect("Content-Type", /json/)
// });
// });

// it("Create Film - runtime is a string", () => {
//   const newFilmData = {
//     title: "New Film",
//     director: "New Director",
//     releaseDate: "2023-01-01T00:00:00.000Z",
//     ageRating: "New Rating",
//     runtime: "Two hours", 
//     description: "New Description",
//     poster: "New Image Link",
//   };
//   return request
//     .post("/films")
//     .send(newFilmData)
//     .expect(500)  
//     .expect("Content-Type", /json/)
//     .then((res) => {
//       expect(res.body).to.be.an('object');
//     });
// });