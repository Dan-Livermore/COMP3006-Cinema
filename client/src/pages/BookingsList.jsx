import React, { useEffect, useState } from "react";
import axios from "axios";
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

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/bookings")
      .then((response) => {
        setBookings(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    axios
      .get("http://localhost:5555/showings")
      .then((response) => {
        setShowings(response.data.data);
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

  const getUserEmail = (userID) => {
    const user = users.find((user) => user._id === userID);
    return user ? user.email : "N/A";
  };

  const getFilmTitle = (showingID) => {
    const showing = showings.find((showing) => showing._id === showingID);
    if (showing) {
      const film = films.find((film) => film._id === showing.filmID);
      return film ? film.title : "N/A";
    }
    return "N/A";
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Bookings List</h1>
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
                    User ID
                  </th>
                  <th className="border border-slate-600 rounded-md max-md:hidden">
                    Showing ID
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
                      {getUserEmail(booking.userID)}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
              {getFilmTitle(booking.showingID)}
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
