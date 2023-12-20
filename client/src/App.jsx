import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav"

import Home from "./pages/Home";
import WhatsNew from "./pages/WhatsNew";
import FilmTimes from "./pages/FilmTimes";
import LogIn from "./pages/LogIn";
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

function App() {
  return (
    <>
    <Router>
      <Nav/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whats-new" element={<WhatsNew />} />
        <Route path="/film-times" element={<FilmTimes />} />
        <Route path="/log-in" element={<LogIn />} />
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
      </Routes>
    </Router>
    </>
  );
}

export default App;