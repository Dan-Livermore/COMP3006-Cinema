import React from 'react'
import SeatGrid from '../Components/SeatGrid'

const BookFilm = () => {
  return (
    <>
    <SeatGrid />
    <div className='flex min-h-full flex-1 justify-center items-center px-6 py-12 lg:px-8'>
      <br/>
      <button className='bg-blue-500 hover:bg-blue-700 text-white text-4xl font-bold py-4 w-80 h-30 px-4 rounded-lg' >Book Seat</button>
    </div>
    </>
  )
}

export default BookFilm