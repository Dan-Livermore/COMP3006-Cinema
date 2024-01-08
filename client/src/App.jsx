import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./structure/RootLayout";
import PrivateRoutes from "./structure/PrivateRoutes";

import Home from "./pages/Home";
import LogIn, { HandleLogIn } from "./pages/LogIn";
import BookFilm from "./pages/BookFilm";
import PageNotFound from "./pages/PageNotFound";

import Account from "./pages/Account";
import CreateAccount, { HandleSignUp } from "./pages/CreateAccount";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordRequestSent from "./pages/PasswordRequestSent";
import UpdatePassword from "./pages/mongo/CRUD-accounts/UpdatePassword";
import UpdateAccount from "./pages/mongo/CRUD-accounts/UpdateAccount";
import DeleteAccount from "./pages/mongo/CRUD-accounts/DeleteAccount";

import Bookings from "./pages/mongo/Bookings.jsx";
import ReadOneBooking from "./pages/mongo/CRUD-bookings/ReadOneBooking.jsx";
import EditBooking from "./pages/mongo/CRUD-bookings/EditBooking.jsx";
import DeleteBooking from "./pages/mongo/CRUD-bookings/DeleteBooking.jsx";


import Films from "./pages/mongo/Films";
import ReadOneFilm from "./pages/mongo/CRUD-films/ReadOneFilm";
import CreateFilm from "./pages/mongo/CRUD-films/CreateFilm";
import EditFilm from "./pages/mongo/CRUD-films/EditFilm";
import DeleteFilm from "./pages/mongo/CRUD-films/DeleteFilm";

import Showings from "./pages/mongo/Showings";
import ReadOneShowing from "./pages/mongo/CRUD-showings/ReadOneShowing";
import CreateShowing from "./pages/mongo/CRUD-showings/CreateShowing";
import EditShowing from "./pages/mongo/CRUD-showings/EditShowing";
import DeleteShowing from "./pages/mongo/CRUD-showings/DeleteShowing";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/book-film" element={<BookFilm />} />
      <Route path="/log-in" element={<LogIn />} action={HandleLogIn} />
      <Route path="*" element={<PageNotFound />} />
      
      <Route
            path="/create-account"
            element={<CreateAccount />}
            action={HandleSignUp}
          />

        <Route element={<PrivateRoutes />}>
          <Route path="/account" element={<Account />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/password-request-sent"
            element={<PasswordRequestSent />}
          />

          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookings/details/:id" element={<ReadOneBooking />} />
          <Route path="/bookings/edit/:id" element={<EditBooking />} />
          <Route path="/bookings/delete/:id" element={<DeleteBooking />} />


          <Route path="/update-password/:id" element={<UpdatePassword />} />
          <Route path="/update-account/:id" element={<UpdateAccount />} />
          <Route path="/delete-account" element={<DeleteAccount />} />

          <Route path="/Films" element={<Films />} />
          <Route path="/Films/create" element={<CreateFilm />} />
          <Route path="/Films/details/:id" element={<ReadOneFilm />} />
          <Route path="/Films/edit/:id" element={<EditFilm />} />
          <Route path="/Films/delete/:id" element={<DeleteFilm />} />

          <Route path="/showings" element={<Showings />} />
          <Route path="/showings/create" element={<CreateShowing />} />
          <Route path="/showings/details/:id" element={<ReadOneShowing />} />
          <Route path="/showings/edit/:id" element={<EditShowing />} />
          <Route path="/showings/delete/:id" element={<DeleteShowing />} />

          <Route path="/book-seat" element={<BookFilm />} />
        </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
