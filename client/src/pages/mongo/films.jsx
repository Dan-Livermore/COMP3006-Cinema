import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../Components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const Films = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/films")
      .then((response) => {
        const sortedFilms = response.data.data.sort((a, b) => {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          return titleA.localeCompare(titleB);
        });
        setFilms(sortedFilms);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Films List</h1>
        <Link to="/films/create">
          <button className="bg-sky-600 text-white rounded-lg w-40 h-10 4xl">Add Film</button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {films.length === 0 ? (
            <p>No data in the database</p>
          ) : (
            <table className="w-full border-spacing-2">
              <thead>
                <tr>
                  <th className="border border-slate-600 rounded-md">No</th>
                  <th className="border border-slate-600 rounded-md">Film Name</th>
                  <th className="border border-slate-600 rounded-md max-md:hidden">
                    Director
                  </th>
                  <th className="border border-slate-600 rounded-md max-md:hidden">
                    Release Date
                  </th>
                  <th className="border border-slate-600 rounded-md max-md:hidden">
                    Age Rating
                  </th>
                  <th className="border border-slate-600 rounded-md max-md:hidden">
                    Runtime (mins)
                  </th>
                  <th className="border border-slate-600 rounded-md max-md:hidden">
                    Description
                  </th>
                  <th className="border border-slate-600 rounded-md max-md:hidden">
                    Poster
                  </th>
                  <th className="border border-slate-600 rounded-md">Options</th>
                </tr>
              </thead>
              <tbody>
                {films.map((film, index) => (
                  <tr key={film._id} className="h-8">
                    <td className="border border-slate-700 rounded-md text-center">
                      {index + 1}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      {film.title}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      {film.director}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                      {formatDate(film.releaseDate)}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                      {film.ageRating}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                      {film.runtime === 0.1 ? 'N/A' : film.runtime}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden w-1/3">
                      {film.description}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                      {film.poster && <img src={film.poster} alt="Movie Poster" />}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                      <div className="flex justify-center gap-x-4">
                        <Link to={`/films/details/${film._id}`}>
                          <BsInfoCircle className="text-2xl text-green-800" />
                        </Link>
                        <Link to={`/films/edit/${film._id}`}>
                          <AiOutlineEdit className="text-2xl text-yellow-600" />
                        </Link>
                        <Link to={`/films/delete/${film._id}`}>
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
  )};

export default Films;