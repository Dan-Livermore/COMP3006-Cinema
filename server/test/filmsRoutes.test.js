import { expect } from "chai";
import supertest from "supertest";
import app from "../index.js";

const request = supertest(app);

describe("Films Routes", () => {
  let server;
  
  it("CREATE is a valid request", () => {
    const newFilmData = {
      title: "New Film",
      director: "New Director",
      releaseDate: "2023-01-01T00:00:00.000Z",
      ageRating: "New Rating",
      runtime: 100,
      description: "New Rating",
      poster: "New Image Link",
    };

    return request
      .post("/films")
      .send(newFilmData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.title).to.equal(newFilmData.title);
        expect(res.body.director).to.equal(newFilmData.director);
        expect(res.body.releaseDate).to.equal(newFilmData.releaseDate);
        expect(res.body.ageRating).to.equal(newFilmData.ageRating);
        expect(res.body.runtime).to.equal(newFilmData.runtime);
        expect(res.body.description).to.equal(newFilmData.description);
        expect(res.body.poster).to.equal(newFilmData.poster);
        return request.delete(`/films/${res.body._id}`).expect(200);
      });
  });

  it("READ is valid request", () => {
    return request
      .get("/films")
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });

  it("UPDATE is a valid request", () => {
    const newFilmData = {
      title: "New Film",
      director: "New Director",
      releaseDate: "2023-01-01T00:00:00.000Z",
      ageRating: "New Rating",
      runtime: 100,
      description: "New Description",
      poster: "New Image Link",
    };
    const updatedFilmData = {
      title: "Updated Film",
      director: "Updated Director",
      releaseDate: "2023-02-01T00:00:00.000Z",
      ageRating: "Updated Rating",
      runtime: 120,
      description: "Updated Description",
      poster: "Updated Image Link",
    };
    return request
      .post("/films")
      .send(newFilmData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        return request
          .put(`/films/${res.body._id}`)
          .send(updatedFilmData)
          .expect(200)
          .expect("Content-Type", /json/)
          .then((updatedRes) => {
            expect(updatedRes.body).to.be.an("object");
            return request.delete(`/films/${res.body._id}`).expect(200);
          });
      });
  });

  
  it("DELETE is a valid request", () => {
    const newFilmData = {
      title: "New Film",
      director: "New Director",
      releaseDate: "2023-01-01T00:00:00.000Z",
      ageRating: "New Rating",
      runtime: 100,
      description: "Description",
      poster: "New Image Link",
    };

    return request
      .post("/films")
      .send(newFilmData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((createRes) => {
        return request.delete(`/films/${createRes.body._id}`).expect(200);
      });
  });

  it("GET ALL Films", () => {
    return request
      .get("/films")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });
  it("GET ONE - ID = Blade Runner 2049", () => {
    return request
      .get("/films/6583347eed59946e06f53065")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");

        // Check releaseDate to see if it is a real date
        expect(res.body.releaseDate).to.be.a("string");
        expect(() => new Date(res.body.releaseDate)).to.not.throw();

        // Check runtime is an int
        expect(res.body.runtime).to.be.a("number");
        expect(res.body.runtime % 1).to.equal(0);

        // Check other fields are string
        expect(res.body.title).to.be.a("string");
        expect(res.body.director).to.be.a("string");
        expect(res.body.ageRating).to.be.a("string");
        expect(res.body.description).to.be.a("string");
        expect(res.body.poster).to.be.a("string");
      });
  });
  it("GET ONE - ID Too Short", () => {
    return request
      .get("/films/1")
      .expect(500)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });
  it("GET ONE - No ID = Return All", () => {
    return request
      .get("/films/")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });
  it("GET ONE - No ID in DB", () => {
    return request
      .get("/films/111111111111111111111111")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("null");
      });
  });

  it("CREATE Film", () => {
    const newFilmData = {
      title: "New Film",
      director: "New Director",
      releaseDate: "2023-01-01T00:00:00.000Z",
      ageRating: "New Rating",
      runtime: 100,
      description: "New Rating",
      poster: "New Image Link",
    };

    return request
      .post("/films")
      .send(newFilmData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.title).to.equal(newFilmData.title);
        expect(res.body.director).to.equal(newFilmData.director);
        expect(res.body.releaseDate).to.equal(newFilmData.releaseDate);
        expect(res.body.ageRating).to.equal(newFilmData.ageRating);
        expect(res.body.runtime).to.equal(newFilmData.runtime);
        expect(res.body.description).to.equal(newFilmData.description);
        expect(res.body.poster).to.equal(newFilmData.poster);
        return request.delete(`/films/${res.body._id}`).expect(200);
      });
  });
  it("CREATE Film - releaseDate not a date", () => {
    const newFilmData = {
      title: "New Film",
      director: "New Director",
      releaseDate: "New Date",
      ageRating: "New Rating",
      runtime: 100,
      description: "New Rating",
      poster: "New Image Link",
    };
    return request
      .post("/films")
      .send(newFilmData)
      .expect(500)
      .expect("Content-Type", /json/);
  });

  it("CREATE Film - runtime is a string", () => {
    const newFilmData = {
      title: "New Film",
      director: "New Director",
      releaseDate: "2023-01-01T00:00:00.000Z",
      ageRating: "New Rating",
      runtime: "Two hours",
      description: "New Description",
      poster: "New Image Link",
    };
    return request
      .post("/films")
      .send(newFilmData)
      .expect(500)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
      });
  });

  it("DELETE an existing film", () => {
    const newFilmData = {
      title: "New Film",
      director: "New Director",
      releaseDate: "2023-01-01T00:00:00.000Z",
      ageRating: "New Rating",
      runtime: 100,
      description: "Description",
      poster: "New Image Link",
    };

    return request
      .post("/films")
      .send(newFilmData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((createRes) => {
        return request.delete(`/films/${createRes.body._id}`).expect(200);
      });
  });

 

  it("UPDATE a Film", () => {
    const newFilmData = {
      title: "New Film",
      director: "New Director",
      releaseDate: "2023-01-01T00:00:00.000Z",
      ageRating: "New Rating",
      runtime: 100,
      description: "New Description",
      poster: "New Image Link",
    };
    const updatedFilmData = {
      title: "Updated Film",
      director: "Updated Director",
      releaseDate: "2023-02-01T00:00:00.000Z",
      ageRating: "Updated Rating",
      runtime: 120,
      description: "Updated Description",
      poster: "Updated Image Link",
    };
    return request
      .post("/films")
      .send(newFilmData)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        return request
          .put(`/films/${res.body._id}`)
          .send(updatedFilmData)
          .expect(200)
          .expect("Content-Type", /json/)
          .then((updatedRes) => {
            expect(updatedRes.body).to.be.an("object");
            return request.delete(`/films/${res.body._id}`).expect(200);
          });
      });
  });
});
