import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import Spinner from '../../../Components/Spinner';

const ReadOneFilm = () => {
  const [film, setfilm] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/films/${id}`)
      .then((response) => {
        setfilm(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Get One Film</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-slate-950 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Object Id:</span>
            <span>{film._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title: </span>
            <span>{film.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Director:</span>
            <span>{film.director}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Release Date:</span>
            <span>{film.releaseDate}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Age Rating:</span>
            <span>{film.ageRating}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Length (mins):</span>
            <span>{film.runtime}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Description:</span>
            <span>{film.description}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Poster:</span>
            <span>{film.poster}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Time Created:</span>
            <span>{new Date(film.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Updated:</span>
            <span>{new Date(film.updatedAt).toString()}</span>
          </div>
        </div>
      )}
      <br />
      <BackButton />
    </div>
  );
};

export default ReadOneFilm;