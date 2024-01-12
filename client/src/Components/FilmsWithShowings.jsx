import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FilmsWithShowings = () => {
  const [showings, setShowings] = useState([]);
  const [films, setFilms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const showingsResponse = await axios.get(
          "http://localhost:5555/showings"
        );
        const filmsResponse = await axios.get("http://localhost:5555/films");

        const sortedShowings = showingsResponse.data.data.sort((a, b) => {
          const dateA = new Date(a.startTime);
          const dateB = new Date(b.startTime);
          return dateA - dateB;
        });

        setShowings(sortedShowings);
        setFilms(filmsResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  function formatDateToYear(dateString) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    return `${year}`;
  }

  function formatDateForShowing(dateString) {
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

  const handleBooking = (filmID, startTime) => {

  const foundShowing = showings.find(
    (showing) => showing.filmID === filmID && showing.startTime === startTime
  );

  if (foundShowing) {
    // Do something with the found showing, such as navigating or displaying information
    console.log('Found Showing:', foundShowing);
    // Example navigation
    navigate(`/book-film/${foundShowing._id}`);
  } else {
    console.log('Showing not found');
    // Handle not found scenario
  }
};
 

  const today = new Date();

  const upcomingShowings = showings.filter(
    (showing) => new Date(showing.startTime) >= today
  );

  const upcomingShowingsWithFilms = upcomingShowings.map((showing) => {
    const filmDetails = films.find((film) => film._id === showing.filmID);
    return {
      ...showing,
      ...filmDetails,
    };
  });
  
  return (
    <>
      <div className="flex items-center mb-8">
        <div className="w-2/3">

          {upcomingShowingsWithFilms.map((showing) => (
            <div key={showing.startTime} className="flex items-center mb-4">
              <div className="w-1/3 mr-4">
                <img src={showing.poster} alt={showing.title} className="w-3/4 h-auto rounded-lg" />
              </div>
              <div className="w-2/3">
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold mb-0">{showing.title}</h3>
                  <span className="text-lg font-bold mx-2">
                    {" "}
                    ({formatDateToYear(showing.releaseDate)})
                  </span>
                </div>
                <p>
                  Certified: {showing.ageRating} | {showing.runtime} mins
                </p>
                <p>{showing.description}</p>
                <br />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg mr-3"
                  onClick={() => {
                    handleBooking(showing.filmID, showing.startTime);
                  }}>
                  {formatDateForShowing(showing.startTime)}
                </button>
                <hr className="my-8 border-t border-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilmsWithShowings;