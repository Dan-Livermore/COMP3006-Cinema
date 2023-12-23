import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import filmsRoute from "./routes/filmsRoutes.js";
import usersRoute from "./routes/usersRoutes.js";
import accountsRoute from "./routes/accountRoutes.js";
import loginRoute from "./routes/loginRoute.js";
// import bookingRoute from "./routes/bookingRoutes.js";
import showingsRoute from "./routes/showingsRoutes.js";
import cors from 'cors';


const app = express();

//Middleware
app.use(express.json());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3060'];
app.use(cors({
  origin: allowedOrigins,
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.get('/', (request,response) => {
  console.log(request);
  return response.status(234).send("Welcome to my MERN situation");
});

app.use('/films', filmsRoute);
app.use('/users', usersRoute);
// app.use('/bookings', bookingsRoute);
app.use('/showings', showingsRoute);
app.use('/signup', accountsRoute);
app.use('/login', loginRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });