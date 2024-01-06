import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import axios from "axios";

// Navbar
const Nav = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a token exists in local storage to determine the login status
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    // Clear the token from local storage and update login status
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // Other logout-related logic if needed
  };

  const content = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-sky-500 transition">
      <ul className="text-center text-xl p-20">
        {/* Links for sections*/}
        {/* ... Other links */}
        <li className="my-4 py-4 border-b border-sky-500 hover:bg-sky-500 hover:text-zinc-400 hover:rounded cursor-pointer spy={true} smooth={true}">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Log Out</button>
          ) : (
            <Link spy={true} smooth={true} to="/log-in">Log In</Link>
          )}
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="bg-sky-600">
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4">
        {/* Logo */}
        <div className="flex items-center flex-1">
          <span className="text-3xl font-bold items-center">
            <Link spy={true} smooth={true} to="/">
              <p className="hover:text-zinc-400 transition border-b-0 border-sky-600 hover:border-zinc-400 cursor-pointer inline-block">Cinema Bros</p>
            </Link>
          </span>
        </div>
        
        {/* Desktop view */}
        <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-0 ml-auto text-[18px]">
              {/* links for sections */}
              <Link spy={true} smooth={true} to="/book-film">
                <li className="hover:text-zinc-400 transition border-b-0 border-sky-600 hover:border-zinc-400 cursor-pointer">Book Film</li>
              </Link>
              <li className="hover:text-zinc-400 transition border-b-0 border-sky-600 hover:border-zinc-400 cursor-pointer">
                {isLoggedIn ? (
                  <button onClick={handleLogout}>Log Out</button>
                ) : (
                  <Link spy={true} smooth={true} to="/log-in">Log In</Link>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile burger */}
        <div>
          {click && content}
        </div>
        <button className="block sm:hidden transition" onClick={handleClick}>
          {click ? <FaTimes /> : <GiHamburgerMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
