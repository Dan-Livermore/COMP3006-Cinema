import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import filmsRoute from "./routes/filmsRoutes.js";
import usersRoute from "./routes/usersRoutes.js";
import signupRoute from "./routes/signupRoutes.js";
import loginRoute from "./routes/loginRoute.js";
import bookingsRoute from "./routes/bookingsRoutes.js";
import showingsRoute from "./routes/showingsRoutes.js";
import cors from 'cors';

// import cookieParser from "cookie-parser";
// import session from "express-session";


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

// app.use(session({
//   secret: 'your_secret_key_here',
//   resave: false,
//   saveUninitialized: false,
//   // Optional: Configure cookie settings
//   cookie: {
//     secure: false, // Set to true if using HTTPS
//     httpOnly: true, // Cookie not accessible via client-side JavaScript
//     maxAge: 3600000 // Cookie expiration time in milliseconds (1 hour in this example)
//   }
// }));


app.get('/', (request,response) => {
  console.log(request);
  return response.status(234).send("Welcome to my MERN situation");
});

app.use('/films', filmsRoute);
app.use('/users', usersRoute);
app.use('/bookings', bookingsRoute);
app.use('/showings', showingsRoute);
app.use('/signup', signupRoute);
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