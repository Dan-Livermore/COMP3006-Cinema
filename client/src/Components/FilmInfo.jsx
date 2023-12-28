import React, { useEffect, useState } from "react";
import axios from "axios";

const Film = ({title, director, releaseDate, ageRating, runtime, description, poster}) => {
  return (
    <><div className='flex items-center mb-8'>
      <div className='w-1/3 mr-4'>
        <img src={poster} alt={title} className='w-3/4 rounded-lg' />
      </div>
      <div className='w-2/3'>
        <div className='flex items-center'>
          <h3 className='text-2xl font-bold mb-0 '>{title} </h3>
          <span className='text-lg font-bold mx-2'> ({releaseDate})</span>
        </div>
        <p>Certified: {ageRating} | {runtime} mins</p>
        <p>{description}</p>
        <br />
      </div>
    </div><hr className='my-8 border-t border-gray-300' /></>
    
  );
};

function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  return `${year}`;
}

const FilmInfo = () => {  
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
  }, []
  );

  return (
    <div className='max-w-4xl mx-auto mt-8'>
      {films.map((film, index) => (
        <Film
          key={film.id}
          title={film.title}
          director={film.director}
          releaseDate={formatDate(film.releaseDate)}
          ageRating={film.ageRating}
          runtime={film.runtime === 0.1 ? 'N/A' : film.runtime}
          description={film.description}
          poster={film.poster}
        />
      ))}
    </div>
  );
};

export default FilmInfo;