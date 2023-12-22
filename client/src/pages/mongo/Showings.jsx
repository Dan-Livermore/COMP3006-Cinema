import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../Components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const Showings = () => {
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
        setShowings(sortedShowings); // No need for .data.data
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

  // Perform data manipulation here
  const formattedShowings = showings.map((showing, index) => {
    const film = films.find((film) => film._id === showing.filmID);
    const formattedDate = formatDate(showing.startTime);
    const filmTitle = film ? film.title : "Unknown Title";
  
    return {
      index: index + 1,
      filmID: showing.filmID,
      filmTitle,
      formattedDate,
      totalSeats: showing.totalSeats,
      seatsRemaining: showing.seatsRemaining,
      showingID: showing._id,
      row1: showing.row1,
      row2: showing.row2,
      row3: showing.row3,
      row4: showing.row4,
    };
  });

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
        <h1 className="text-3xl my-8">Showings List</h1>
        <Link to="/showings/create">
          <button className="bg-sky-600 text-white rounded-lg w-40 h-10 4xl">
            Add Showing
          </button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full  border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Film ID</th>
              <th className="border border-slate-600 rounded-md">Film Name</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Start Time
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Total Seats
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Remaining Seats
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Seats (Array)
              </th>
              <th className="border border-slate-600 rounded-md">Options</th>
            </tr>
          </thead>
          <tbody>
            {formattedShowings.map((showing) => (
              <tr key={showing.showingID} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {showing.index}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {showing.filmID}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {showing.filmTitle}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {showing.formattedDate}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {showing.totalSeats}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {showing.seatsRemaining}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {`${showing.row1}\n${showing.row2}\n${showing.row3}\n${showing.row4}`}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/showings/details/${showing._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/showings/edit/${showing._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/showings/delete/${showing._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Showings;
