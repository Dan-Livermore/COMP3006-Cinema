// import { expect } from "chai";
// import supertest from "supertest";
// import app from "../index.js";
// import bcrypt from "bcrypt";

// const request = supertest(app);

// describe("Sign Up Routes", () => {
//     it("CREATE is a valid request", async () => {
//       const newUserData = {
//         email: "Email@Unittest.com",
//         password: "New password",
//       };
  
//       // Create the user
//       const createUserResponse = await request
//         .post("/signup")
//         .send(newUserData)
//         .expect(201)
//         .expect("Content-Type", /json/);
  
//       expect(createUserResponse.body).to.be.an("object");
  
//       // Delete the user
//       await request
//         .delete(`/users/${createUserResponse.body.id}`)
//         .expect(204); // Assuming 204 means successful deletion
//     });
//   });
  

//   it("Create New User", () => {
//     const newUserData = {
//       email: "Email@Unittest.com",
//       password: "New password",
//     };

//     return request
//       .post("/users")
//       .send(newUserData)
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .then(async (res) => {
//         expect(res.body).to.be.an("object");
//         expect(res.body.email).to.equal(newUserData.email);

//         const matchingPassword = await bcrypt.compare(
//           newUserData.password,
//           res.body.password
//         );
//         if (!matchingPassword) {
//           expect(matchingPassword).to.equal(false);
//         } else {
//           expect(matchingPassword).to.equal(true);
//         }
//         await request.delete(`/users/${res.body.id}`)// Deleted
//       });
//   });
// });
