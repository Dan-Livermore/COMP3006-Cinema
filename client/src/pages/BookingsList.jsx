import React from "react";
import FilmInfo from "../Components/FilmInfo";

const BookingsList = () => {
  return (
    <>
<div className="flex min-h-full flex-1 flex-col col-w-3/4 justify-center items-center px-6 py-12 lg:px-8 bg-sky-100">
  <div className="bg-white shadow-md rounded-md p-6 w-3/4 max-w-md mt-1 md:mt-0">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Your Bookings</h2>
            
            <p className="text-center">You do not have any upcoming film bookings.</p> <br/>
            <button type="submit" className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
              Book Now
            </button>
          </div>
        </div>
        <br/>
  <div className="bg-white shadow-md rounded-md p-6 w-3/4 md:max-w-3/4 mt-1 md:mt-0">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Your Bookings</h2>

            <FilmInfo/>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingsList;
