import React from "react";
// import ImageSlider from '../Components/ImageSlider'
import FilmInfo from "../Components/FilmInfo";
import FilmsWithShowings from "../Components/FilmsWithShowings";
import UserOrGuest from "./UserOrGuest";

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
  mondayDate.setDate(
    currentDate.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1)
  );

  const dayOfMonth = mondayDate.getDate();
  const formattedDay = addDaySuffix(dayOfMonth);

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  return `${formattedDay} ${currentMonth} ${currentYear}`;
};

const Home = () => {
  const weekBeginning = getWeekBeginning();
  return (
    <>
    <h1 className="font-bold text-center text-4xl mt-8">Book Now!</h1>
    <p className="text-xl text-center mb-4 mt-2">{`Week Beginning: ${weekBeginning}`}</p>
    
  <div className="flex flex-col items-center h-screen">
    <div>
      <FilmsWithShowings />
    </div>
  </div>
  <UserOrGuest/>
  </>
  );
};

export default Home;
