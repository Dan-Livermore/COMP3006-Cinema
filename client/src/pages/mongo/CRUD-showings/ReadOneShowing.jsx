import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import Spinner from '../../../Components/Spinner';

const ReadOneShowing = () => {
  const [showing, setShowings] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/showings/${id}`)
      .then((response) => {
        setShowings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Get One Showing</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-slate-950 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Object ID:</span>
            <span>{showing._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Film ID: </span>
            <span>{showing.filmID}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Start Time:</span>
            <span>{showing.startTime}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Total Seats:</span>
            <span>{showing.totalSeats}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Remaining Seats:</span>
            <span>{showing.seatsRemaining}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Row 1:</span>
            <span>{showing.row1}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Row 2:</span>
            <span>{showing.row2}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Row 3:</span>
            <span>{showing.row3}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Row 4:</span>
            <span>{showing.row4}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Time Created:</span>
            <span>{new Date(showing.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Updated:</span>
            <span>{new Date(showing.updatedAt).toString()}</span>
          </div>
        </div>
      )}
      <br />
      <BackButton />
    </div>
  );
};

export default ReadOneShowing;