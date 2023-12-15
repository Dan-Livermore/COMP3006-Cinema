import React from 'react';
import { Link } from 'react-router-dom';

import Gif from '../assets/PageNotFound.gif';

const PageNotFound = () => {
  return (
    <div className="flex flex-col h-screen bg-sky-100 justify-start items-center font-sans">
      <div className="flex flex-col items-center justify-start h-full mt-16">
          <h1 className="font-bold text-center text-4xl">Huh? Nothing's here...</h1>
          <img src={Gif} alt="GIF" className="w-128 h-96 pt-6 pb-6" />
          <div className="flex justify-center">
            <Link to="/">
              <button type="submit" className="bg-sky-500 hover:bg-sky-700 text-white font-bold text-2xl py-2 px-4 rounded-md mt-2">
                Return Home
              </button>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default PageNotFound;