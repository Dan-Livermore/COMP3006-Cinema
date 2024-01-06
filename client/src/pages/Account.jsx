import { Link } from "react-router-dom";

const Account = () => {
  const handleLogOut = () => {
    try {
      localStorage.removeItem("token");
    } catch {
      console.log("Can not Log Out");
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-sky-100">
        <div className="bg-white shadow-md rounded-md p-6 max-w-md w-full mt-1 md:mt-0">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              [TEMP]'s Account
            </h2>

            <div>
              <br />
              <p>
                <span className="font-bold">Username:</span> [TEMP]
              </p>
              <p>
                <span className="font-bold">Email:</span> [TEMP]
              </p>
              <br />
              <Link to="/update-password">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  Change Password
                </button>
              </Link>
              <br />
              <div className="grid grid-cols-2 gap-3">
                <Link to="/update-account-details">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  >
                    Update Details
                  </button>
                </Link>
                <Link to="/delete-account">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Delete Account
                  </button>
                </Link>
              </div>
              <br />
            </div>

            <div>
              <p>
                <span className="font-bold">Next Film:</span> [TEMP NAME] [TEMP
                RATING] <br /> [TEMP BOOKING TIME]
              </p>
              <img alt="[TEMP]"></img>
              <Link to="/bookings">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  Manage Bookings
                </button>
              </Link>
            </div>
            <br />
            <Link to="/log-in">
              <button
                onClick={handleLogOut}
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Log Out
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-sky-100">
  <div className="bg-white shadow-md rounded-md p-6 max-w-md w-full mt-1 md:mt-0">
    <h1 className="text-center text-2xl font-bold">Manage Data</h1>
    <div className="grid grid-cols-2 gap-4">
      <div className="flex justify-center items-center">
        <Link to="/films">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40">
            Films
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <Link to="/showings">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-40">
            Showings
          </button>
        </Link>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Account;
