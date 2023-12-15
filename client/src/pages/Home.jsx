import React from 'react'
import ImageSlider from '../Components/ImageSlider'

const Home = () => {
  return (
    <div className=" bg-sky-100">
      <h1 className="font-bold text-center text-4xl">Movie Madness</h1>
      <ImageSlider/>
      
      <h1 className="font-bold text-center text-4xl">Select Theatre:</h1>
    </div>
  )
}

export default Home