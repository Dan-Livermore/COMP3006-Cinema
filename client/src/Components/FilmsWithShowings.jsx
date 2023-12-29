import React, { useState, useEffect } from "react";
import axios from "axios";

const FilmShowing = ({
  title,
  director,
  releaseDate,
  ageRating,
  runtime,
  description,
  poster,
  startTime,
}) => {
  const handleBooking = () => {
    // Logic for handling booking when the button is clicked
    console.log(`Book tickets for showing at ${startTime}`);
    // Add your booking logic here
  };

  return (<>
  <div className="flex items-center mb-8">
    <div className="w-1/3 mr-4">
      <img src={poster} alt={title} className="w-3/4 rounded-lg" />
    </div>
    <div className="w-2/3"> {/* Adjusted width to take up 2/3 */}
      <div className="flex items-center">
        <h3 className="text-2xl font-bold mb-0 ">{title}</h3>
        <span className="text-lg font-bold mx-2"> ({releaseDate})</span>
      </div>
      <p>
        Certified: {ageRating} | {runtime} mins
      </p>
      <p>{description}</p>
      <br />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 w-1/4 px-4 rounded-lg mr-3' onClick={handleBooking}>
        {formatDateForShowing(startTime)}
      </button>
    </div>
  </div>
  <hr className="my-8 border-t border-gray-300" />
</>

  );
};

function formatDateToYear(dateString) {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  return `${year}`;
}

function formatDateForShowing(dateString) {
  const date = new Date(dateString);

  // Get day name (e.g., Monday)
  const dayNames = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat",];
  const dayName = dayNames[date.getDay()];

  // Get ordinal suffix for the day (e.g., 1st, 2nd)
  const day = date.getDate();
  const suffix = day === 1 || day === 21 || day === 31 ? "st" : day === 2 || day === 22 ? "nd" : day === 3 || day === 23 ? "rd" : "th";
  const formattedDay = `${day}${suffix}`;

  // Get month name and year
  const monthNames = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec",];
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

const FilmsWithShowings = () => {
  const [showings, setShowings] = useState([]);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/showings")
      .then((showingsResponse) => {
        const sortedShowings = showingsResponse.data.data.sort((a, b) => {
          const dateA = new Date(a.startTime);
          const dateB = new Date(b.startTime);
          return dateA - dateB; // Sorts in ascending order by start time
        });
        setShowings(sortedShowings);
        // Now, fetch films separately
        return axios.get("http://localhost:5555/films");
      })
      .then((filmsResponse) => {
        setFilms(filmsResponse.data.data); // Set films separately
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const today = new Date();

  const upcomingShowings = [];
  for (let i = 0; i < showings.length; i++) {
    if (new Date(showings[i].startTime) >= today) {
      upcomingShowings.push({
        startTime: showings[i].startTime,
        filmID: showings[i].filmID,
      });
    }
  }

  // Iterate through upcomingShowings to gather film details for each showing
  const upcomingShowingsWithFilms = upcomingShowings.map((showing) => {
    const filmDetails = films.find((film) => film._id === showing.filmID); // Assuming film ID matches
    return {
      ...showing,
      ...filmDetails, // Merge showing details with film details
    };
  });

  return (
    <>
      <div className="flex items-center mb-8">
        <div className="w-2/3">
          {/* Map through upcomingShowingsWithFilms to display each showing */}
          {upcomingShowingsWithFilms.map((showing) => (
            <FilmShowing
              key={showing.startTime} // Assuming startTime is unique
              title={showing.title}
              director={showing.director}
              releaseDate={formatDateToYear(showing.releaseDate)}
              ageRating={showing.ageRating}
              runtime={showing.runtime}
              description={showing.description}
              poster={showing.poster}
              startTime={showing.startTime} // Pass startTime to the FilmShowing component
            />
          ))}
        </div>
      </div>
      <hr className="my-8 border-t border-gray-300" />
    </>
  );
};

export default FilmsWithShowings;
