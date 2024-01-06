import { useEffect, redirect} from "react";
import { Link } from "react-router-dom";

const Account = () => {
  // useEffect(() => {
  //   // Check user authentication when the Dashboard component mounts
  //   const checkAuth = async () => {
  //     try {
  //       const response = await fetch('/auth/dashboard'); // Endpoint to check authentication on the server
  //       if (response.ok) {
  //         // User is authenticated, continue displaying the dashboard
  //         return;
  //       } else {
  //         // User is not authenticated, redirect to login
  //         redirect("/log-in");; // Redirect to your login page
  //       }
  //     } catch (error) {
  //       console.error('Error checking authentication:', error);
  //       // Handle error (e.g., show error message, redirect to an error page)
  //     }
  //   };

  //   checkAuth();
  // });
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-sky-100">
        <div className="bg-white shadow-md rounded-md p-6 max-w-md w-full mt-1 md:mt-0">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              [TEMP]'s Account
            </h2>

            <div>
              <br/>
              <p><span className="font-bold">Username:</span> [TEMP]</p>
              <p><span className="font-bold">Email:</span> [TEMP]</p>
              <br/>
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
              <p><span className="font-bold">Next Film:</span> [TEMP NAME] [TEMP RATING] <br/> [TEMP BOOKING TIME]</p>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
