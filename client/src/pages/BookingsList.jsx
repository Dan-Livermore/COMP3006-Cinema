import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showings, setShowings] = useState([]);
  const [films, setFilms] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const id = jwtDecode(token).userId;
        axios
          .get(`http://localhost:5555/users/${id}`)
          .then((response) => {
            setUser(response.data);
            setLoading(false);

            // Fetch only the bookings created by the user corresponding to the token
            axios
              .get(`http://localhost:5555/bookings`)
              .then((response) => {        
                const allBookings = response.data.data;

                // Filter bookings for the current user
                const filteredBookings = allBookings.filter(booking => booking.userID === id);
        
                setBookings(filteredBookings);
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
                setLoading(false);
              });
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      } catch (error) {
        console.error("Error decoding token:", error);
        setLoading(false);
      }
    }

    axios
      .get("http://localhost:5555/showings")
      .then((showingsResponse) => {
        const sortedShowings = showingsResponse.data.data.sort((a, b) => {
          const dateA = new Date(a.startTime);
          const dateB = new Date(b.startTime);
          return dateB - dateA; // Sorts in descending order by start time
        });
        setShowings(sortedShowings);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5555/films")
      .then((response) => {
        setFilms(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5555/users")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getFilmPoster = (showingID) => {
    const showing = showings.find((showing) => showing._id === showingID);
    if (showing) {
      const film = films.find((film) => film._id === showing.filmID);
      return film ? film.poster : "N/A";
    }
    return "N/A";
  };

  const getFilmTitle = (showingID) => {
    const showing = showings.find((showing) => showing._id === showingID);
    if (showing) {
      const film = films.find((film) => film._id === showing.filmID);
      return film ? film.title : "N/A";
    }
    return "N/A";
  };

  const getStartTime = (showingID) => {
    const showing = showings.find((showing) => showing._id === showingID);
    if (showing) {
      return showing ? formatDate(showing.startTime) : "01/01/2000"
    }
    return "N/A";
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    
    const hours = date.getHours(); 
    const minutes = date.getMinutes(); 
    return `${day}/${month}/${year} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        {loading ? (
          <h1 className="text-xl my-8">Loading...</h1>
        ) : (
          <h1 className="text-xl my-8">{user.email}'s Bookings</h1>
        )}
        <Link to="/bookings/create">
          <button className="bg-sky-600 text-white rounded-lg w-40 h-10 4xl">
            Add booking
          </button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {bookings.length === 0 ? (
            <p>No data in the database</p>
          ) : (
            <table className="w-full border-spacing-2">
              <thead>
                <tr>
                  <th className="border border-slate-600 rounded-md">No</th>
                  <th className="border border-slate-600 rounded-md">
                    Poster
                  </th>
                  <th className="border border-slate-600 rounded-md max-md:hidden">
                    Film Name
                  </th>
                  <th className="border border-slate-600 rounded-md max-md:hidden">
                    Start Time
                  </th>
                  <th className="border border-slate-600 rounded-md max-md:hidden">
                    Seat Number
                  </th>
                  <th className="border border-slate-600 rounded-md">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id} className="h-8">
                    <td className="border border-slate-700 rounded-md text-center">
                      {index + 1}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                    <img src={getFilmPoster(booking.showingID)} alt="Movie Poster" />
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      {getFilmTitle(booking.showingID)}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                      {getStartTime(booking.showingID)}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                      {booking.seatNo}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                      <div className="flex justify-center gap-x-4">
                        <Link to={`/bookings/details/${booking._id}`}>
                          <BsInfoCircle className="text-2xl text-green-800" />
                        </Link>
                        <Link to={`/bookings/edit/${booking._id}`}>
                          <AiOutlineEdit className="text-2xl text-yellow-600" />
                        </Link>
                        <Link to={`/bookings/delete/${booking._id}`}>
                          <MdOutlineDelete className="text-2xl text-red-600" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default BookingList;
