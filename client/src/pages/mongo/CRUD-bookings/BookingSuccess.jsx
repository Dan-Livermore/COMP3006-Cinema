import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BookingSuccess = () => {
  const [bookings, setBooking] = useState([]);
  const [showings, setShowings] = useState([]);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  const bookingID = useParams().id;

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5555/bookings/${bookingID}`)
      .then((bookingsResponse) => {
        const bookingsData = Array.isArray(bookingsResponse.data)
          ? bookingsResponse.data
          : [bookingsResponse.data];
        setBooking(bookingsData);
        const showingID = bookingsData[0].showingID;
        return axios.get("http://localhost:5555/showings/" + showingID);
      })
      .then((showingResponse) => {
        const showingsData = Array.isArray(showingResponse.data)
          ? showingResponse.data
          : [showingResponse.data];

        console.log("Showings:", showingsData);
        setShowings(showingsData);
        const filmID = showingsData[0].filmID;
        return axios.get("http://localhost:5555/films/" + filmID);
      })
      .then((filmResponse) => {
        const FilmData = Array.isArray(filmResponse.data)
          ? filmResponse.data
          : [filmResponse.data];
        setFilms(FilmData);
        console.log("SFilms:", FilmData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bookingID]);

  useEffect(() => {
    console.log("Updated Showings:", showings);
  }, [showings]);

  const formattedBooking = bookings.map((booking, index) => {
    const showing = showings.find(
      (showing) => showing._id === booking.showingID
    );
    const film = films.find(
      (film) => film._id === (showing ? showing.filmID : null)
    );
    const formattedDate = showing ? showing.startTime : "Unknown Date";

    return {
      _id: booking._id,
      index: index + 1,
      filmName: film ? film.title : "Unknown Title",
      filmRating: film ? film.ageRating : "Unknown Rating",
      filmPoster: film ? film.poster : "Unknown Poster",
      startTime: formatDate(formattedDate),
      seatNo: booking ? booking.seatNo : "Unknown Seat",
    };
  });

  function formatDate(dateString) {
      const date = new Date(dateString);
  
      // Get day name (e.g., Monday)
      const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
      const dayName = dayNames[date.getDay()];
  
      // Get ordinal suffix for the day (e.g., 1st, 2nd)
      const day = date.getDate();
      const suffix =
        day === 1 || day === 21 || day === 31
          ? "st"
          : day === 2 || day === 22
          ? "nd"
          : day === 3 || day === 23
          ? "rd"
          : "th";
      const formattedDay = `${day}${suffix}`;
  
      // Get month name and year
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthName = monthNames[date.getMonth()];
      const year = date.getFullYear();
  
      // Get time in hh:mm format
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  
      // Determine AM or PM
      const amOrPm = hours >= 12 ? "PM" : "AM";
      if (hours > 12) {
        hours -= 12;
      } else if (hours === 0) {
        hours = 12;
      }
  
      const formattedTime = `${hours}:${formattedMinutes} ${amOrPm}`;
  
      return `${dayName} ${formattedDay} ${monthName} ${year} \n ${formattedTime}`;
    }

  return (
    <>
      {formattedBooking.map((bookingItem, index) => (
        <div className="flex min-h-full flex-1 flex-col col-w-3/4 justify-center items-center px-6 py-12 lg:px-8 bg-sky-100">
          <div className="bg-white shadow-md rounded-md p-6 max-w-md w-full mt-1 md:mt-0">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                Booking Confirmed!
              </h2>
              <p className="mb-2 text-lg"><span className="font-bold">Booking Reference:</span> {bookingItem._id}</p>
              <p className="mb-2 text-lg"><span className="font-bold">Film Name:</span> {bookingItem.filmName} ({bookingItem.filmRating})
              </p>
              <img
              src={bookingItem.filmPoster}
              alt="Film Poster"
              className="mb-4 mx-auto block rounded-lg"
            />
              <p className="mb-2 text-lg"><span className="font-bold">Start Time:</span> {bookingItem.startTime}</p>
              <p className="mb-2 text-lg"><span className="font-bold">Seat Number:</span> {bookingItem.seatNo}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
  

export default BookingSuccess;
