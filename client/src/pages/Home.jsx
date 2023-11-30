import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";


const Home = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/films")
      .then((response) => {
        setFilms(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Films List</h1>
        <Link to="/films/create">
          <MdOutlineAddBox className="text-sky-800 4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
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
                Runtime
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
                  {film.releaseDate}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {film.ageRating}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {film.runtime}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/films/details/${film._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/films/edit/${film._id}`}>
                      <BsInfoCircle className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/films/delete/${film._id}`}>
                      <BsInfoCircle className="text-2xl text-red-600" />
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

export default Home;
