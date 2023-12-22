import React, { useState, useEffect } from 'react';
import BackButton from '../../../Components/BackButton';
import Spinner from '../../../Components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditFilm = () => {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [ageRating, setAgeRating] = useState('');
  const [runtime, setRuntime] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/films/${id}`)
    .then((response) => {
        setDirector(response.data.director);
        setReleaseDate(response.data.releaseDate);
        setAgeRating(response.data.ageRating);
        setRuntime(response.data.runtime);
        setDescription(response.data.description);
        setPoster(response.data.poster);
        setTitle(response.data.title);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, [])

  const handleEditFilm = () => {
    const data = {
      title,
      director,
      releaseDate,
      ageRating,
      runtime,
      description,
      poster,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/films/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Film Updated Successfully', { variant: 'success' });
        navigate(-1);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4 text-center'>Edit Film</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Director</label>
          <input
            type='text'
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Release Date</label>
          <input
            type='date'
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full'
          />
        </div><div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Age Rating</label>
          <input
            type='text'
            value={ageRating}
            onChange={(e) => setAgeRating(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Film Length (mins)</label>
          <input
            type='number'
            value={runtime}
            onChange={(e) => setRuntime(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full'
          />
        </div><div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Poster</label>
          <input
            type='text'
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-400  hover:bg-sky-600 rounded-lg m-8' onClick={handleEditFilm}>
          Save
        </button>
      </div>
      <BackButton />
    </div>
  );
}

export default EditFilm