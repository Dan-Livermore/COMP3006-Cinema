import React, { useState } from 'react';
import BackButton from '../../../Components/BackButton';
import Spinner from '../../../Components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateShowing = () => {
  const [filmID, setfilmID] = useState('');
  const [startTime, setstartTime] = useState('');
  const [seats, setseats] = useState('');
  const [totalSeats, settotalSeats] = useState('');
  const [seatsRemaining, setseatsRemaining] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveShowing = () => {
    const data = {
      filmID,
      startTime,
      seats,
      totalSeats,
      seatsRemaining,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/films', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Showing Created Successfully', { variant: 'success' });
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
      <h1 className='text-3xl my-4 text-center'>Create Showing</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>filmID</label>
          <input
            type='text'
            value={filmID}
            onChange={(e) => setfilmID(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>startTime</label>
          <input
            type='date'
            value={startTime}
            onChange={(e) => setstartTime(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Seats (array)</label>
          <input
            type='[[number]]'
            value={seats}
            onChange={(e) => setseats(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Total Seats</label>
          <input
            type='number'
            value={totalSeats}
            onChange={(e) => settotalSeats(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Seats Remaining</label>
          <input
            type='number'
            value={seatsRemaining}
            onChange={(e) => setseatsRemaining(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full'
          />
        </div>
        <button className='p-2 bg-sky-400  hover:bg-sky-600 rounded-lg m-8' onClick={handleSaveShowing}>
          Save
        </button>
      </div>
      <BackButton />
    </div>
  );
}

export default CreateShowing