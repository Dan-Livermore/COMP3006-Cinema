import React from 'react'
// import ImageSlider from '../Components/ImageSlider'
import FilmInfo from '../Components/FilmInfo'

const addDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

const getWeekBeginning = () => {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const mondayDate = new Date(currentDate);
  mondayDate.setDate(currentDate.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1));

  const dayOfMonth = mondayDate.getDate();
  const formattedDay = addDaySuffix(dayOfMonth);

  const currentMonth = currentDate.toLocaleString('default', { month: 'long' }); 
  const currentYear = currentDate.getFullYear();

  return `${formattedDay} ${currentMonth} ${currentYear}`;
}

const Home = () => {
  const weekBeginning = getWeekBeginning();
  return (
    <div className="">
      <h1 className="font-bold text-center text-4xl">Movie Madness</h1>
      {/* <ImageSlider/> */}
      
      <h1 className="font-bold text-center text-4xl">Book Now!</h1>
      <p className='text-xl text-center mb-4 mt-2'>{`Week Beginning: ${weekBeginning}`}</p>
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
  );
};

export default Home