import express from "express";
import { PORT, SOCKETPORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import filmsRoute from "./routes/filmsRoutes.js";
import usersRoute from "./routes/usersRoutes.js";
import signupRoute from "./routes/signupRoutes.js";
import loginRoute from "./routes/loginRoute.js";
import bookingsRoute from "./routes/bookingsRoutes.js";
import showingsRoute from "./routes/showingsRoutes.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();

//Middleware
app.use(express.json());
// const allowedOrigins = ['http://localhost:3000', 'http://localhost:3060'];
// app.use(cors({
//   origin: allowedOrigins,
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to my MERN situation");
});

app.use("/films", filmsRoute);
app.use("/users", usersRoute);
app.use("/bookings", bookingsRoute);
app.use("/showings", showingsRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);

mongoose.connect(mongoDBURL)
  .then(() => {
    // console.log("App connected to database");

    const server = app.listen(PORT, () => {
      // console.log(`App is listening on port ${PORT}`);
    });


    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"] 
      }
    });

    io.on("connection", (socket) => {
      console.log(`User Connected: ${socket.id}`);
    
      socket.on("SeatSelected", (data) => {
        socket.broadcast.emit("RecieveSeat", data);
      });
    
      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });

    httpServer.listen(SOCKETPORT, () => {
      // console.log(`Sockets listening on ${SOCKETPORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;