import React, { useState } from 'react';
import Login from './LogIn'

const GuestAccess = () => {
    return null
}
const ChooseOption = ({ setLogin }) => {
  return (<div className="flex min-h-full flex-1 justify-center items-center px-6 py-12 lg:px-8 bg-sky-100">
  <div className="bg-white shadow-md rounded-md p-6 max-w-md w-full">
    <h1 className="text-3xl font-bold my-8 text-center">Login or Proceed as Guest</h1>
    <div className="flex flex-col items-center">
      <button className='bg-blue-500 hover:bg-blue-700 text-white text-4xl font-bold py-4 w-80 h-30 px-4 rounded-lg mb-4' onClick={() => setLogin(true)}>
        Log In
      </button>
      <p className='text-center text-3xl font-bold my-4'>
        OR
      </p>
      <button className='bg-blue-500 hover:bg-blue-700 text-white text-4xl font-bold py-4 w-80 h-30 px-4 rounded-lg' onClick={() => setLogin(false)}>
        Continue as Guest
      </button>
    </div>
  </div>
</div>

  );
};

const UserOrGuest = () => {
  const [login, setLogin] = useState(null);

  return (
    <>
    <div>
      {login === null ? (
        <ChooseOption setLogin={setLogin} />
      ) : login ? (
        <Login />
      ) : (
        <GuestAccess />
      )}
    </div>
    </>
  );
};

export default UserOrGuest;
