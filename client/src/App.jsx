import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav"

import Home from "./pages/Home";
import WhatsNew from "./pages/WhatsNew";
import FilmTimes from "./pages/FilmTimes";
import LogIn from "./pages/LogIn";
import PageNotFound from "./pages/PageNotFound";

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
      </Routes>
    </Router>
    </>
  );
}

export default App;