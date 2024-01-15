# 3006 Full Stack Application
## Cinema Booking System 
![Workflow Output](https://github.com/Dan-Livermore/COMP3006-Cinema/actions/workflows/test.yml/badge.svg)

A cinema booking website written using MERN (MongoDB, Express.js, React.js, Node.js) technologies.

__Link to demonstration video:__ https://youtu.be/DzmKksPk8nU

### Features
1. Upcoming movie listings are displayed for any stored showing after the current date.
2. Film information - film name, director, release date, age rating, runtime, a description and a poster.
3. Account system - including bcrypt password authentication where users can access and edit their information about upcoming film bookings.
4. Showings & bookings are available and users can book seats.
5. Authenticated users can perform all CRUD operations on films, showings, bookings and account collections

### Technologies Used 
__Frontend:__ React.js, JQuery HTML, CSS, Tailwind <br>
__Backend:__ Node.js, Express.js <br> 
__Database:__ MongoDB <br>
__Web Sockets:__ Socket.io  <br>
__Automated Testing:__ Chai, Mocha, Supertest <br>

### Other Libraries/Tools: 
- Cors
- Axios
- Bcrypt
- Nodemon
- Mongoose
- Material UI Icons
- JSON Web Tokens (JWT)

## How To Use:
Using Node Packet Manager (NPM)
1. Go To Server Directory __*cd server*__
2. Install bcrypt __*npm install bcrypt -save*__ 
3. Run __*npm start*__
4. Open Client Directory __*cd ../ client*__
5. Install react-scripts __*npm install react-scripts -save*__
6. Run __*npm start*__ <br>
(Despite updating package.json, docker files and package.json lock, it still needs to be reinstalled)
Developed in Visual Studio Code with Docker & Postman.

Developed in Visual Studio Code with Docker & Postman.
