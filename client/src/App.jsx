import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Nav from "./Components/Nav";

import Home from "./pages/Home";
import LogIn, { HandleLogIn } from "./pages/LogIn";
import BookFilm from "./pages/BookFilm";
import PageNotFound from "./pages/PageNotFound";

import Account from "./pages/Account";
import CreateAccount from "./pages/CreateAccount";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordRequestSent from "./pages/PasswordRequestSent";

import Bookings from "./pages/Bookings";
import BookingsList from "./pages/BookingsList";
import UpdatePassword from "./pages/UpdatePassword";
import UpdateAccount from "./pages/UpdateAccount";
import DeleteAccount from "./pages/DeleteAccount";

import Films from "./pages/mongo/films";
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
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/book-film" element={<BookFilm />} />
      <Route path="/log-in" element={<LogIn />} action={HandleLogIn}/>
      <Route path="*" element={<PageNotFound />} />

      <Route path="/account" element={<Account />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-request-sent" element={<PasswordRequestSent />} />

      <Route path="/bookings" element={<BookingsList />} />
      <Route path="/booking-details" element={<Bookings />} />
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route path="/update-account-details" element={<UpdateAccount />} />
      <Route path="/delete-account" element={<DeleteAccount />} />

      <Route path="/films" element={<Films />} />
      <Route path="/films/create" element={<CreateFilm />} />
      <Route path="/films/details/:id" element={<ReadOneFilm />} />
      <Route path="/films/edit/:id" element={<EditFilm />} />
      <Route path="/films/delete/:id" element={<DeleteFilm />} />

      <Route path="/showings" element={<Showings />} />
      <Route path="/showings/create" element={<CreateShowing />} />
      <Route path="/showings/details/:id" element={<ReadOneShowing />} />
      <Route path="/showings/edit/:id" element={<EditShowing />} />
      <Route path="/showings/delete/:id" element={<DeleteShowing />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router}>
        
      <Nav />
      </RouterProvider>
    </>
  );
}

export default App;
