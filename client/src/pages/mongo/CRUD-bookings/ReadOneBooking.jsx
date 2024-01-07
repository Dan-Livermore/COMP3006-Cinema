import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import Spinner from '../../../Components/Spinner';

const ReadOneBooking = () => {
  const [booking, setBookings] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/bookings/${id}`)
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Get One Booking</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-slate-950 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Object ID:</span>
            <span>{booking._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>User ID: </span>
            <span>{booking.userID}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Showing ID:</span>
            <span>{booking.showingID}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Seat Number:</span>
            <span>{booking.seatNo}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Time Created:</span>
            <span>{new Date(booking.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Updated:</span>
            <span>{new Date(booking.updatedAt).toString()}</span>
          </div>
        </div>
      )}
      <br />
      <BackButton />
    </div>
  );
};

export default ReadOneBooking;