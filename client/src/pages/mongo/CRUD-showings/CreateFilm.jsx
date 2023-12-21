import React, { useState } from 'react';
import BackButton from '../../../Components/BackButton';
import Spinner from '../../../Components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateFilm = () => {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [ageRating, setAgeRating] = useState('');
  const [runtime, setRuntime] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveFilm = () => {
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
      .post('http://localhost:5555/films', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Film Created Successfully', { variant: 'success' });
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
      <h1 className='text-3xl my-4 text-center'>Create Film</h1>
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
        <button className='p-2 bg-sky-400  hover:bg-sky-600 rounded-lg m-8' onClick={handleSaveFilm}>
          Save
        </button>
      </div>
      <BackButton />
    </div>
  );
}

export default CreateFilm