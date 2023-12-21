import React from 'react'
// import ImageSlider from '../Components/ImageSlider'
import FilmInfo from '../Components/FilmInfo'

const Home = () => {
  return (
    <div className="">
      <h1 className="font-bold text-center text-4xl">Movie Madness</h1>
      {/* <ImageSlider/> */}
      
      <h1 className="font-bold text-center text-4xl">Book Now!</h1>
      <FilmInfo/>
      <div className='flex'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 w-1/4 px-4 rounded-lg mr-3'>
            Tues 2nd Jan <br /> 10:00
          </button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 w-1/4 px-4 rounded-lg mr-3'>
            Thurs 4th Jan <br /> 14:00
          </button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 w-1/4 px-4 rounded-lg mr-3'>
            Sat 6th Jan <br /> 20:00
          </button>
        </div>
    </div>
  )
}

export default Home