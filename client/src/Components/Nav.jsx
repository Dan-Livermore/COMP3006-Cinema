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
    const checkTokenStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    // Initial check when the component mounts
    checkTokenStatus();

    // Polling interval (every half second in this case)
    const interval = setInterval(() => {
      checkTokenStatus();
    }, 500); // 500 milliseconds = 0.5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => setClick(!click);

  const content = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-sky-500 transition">
      <ul className="text-center text-xl p-20">
        <Link to="/book-film">
          <li className="my-4 py-4 border-b border-sky-500 hover:bg-sky-500 hover:text-zinc-400 hover:rounded cursor-pointer spy={true} smooth={true}">
            Book Film
          </li>
        </Link>
        <li className="my-4 py-4 border-b border-sky-500 hover:bg-sky-500 hover:text-zinc-400 hover:rounded cursor-pointer">
          <Link to="/account">
            {isLoggedIn ? <button>Account</button> : <button>Log In</button>}
          </Link>
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
            <Link to="/">
              <p className="hover:text-zinc-400 transition border-b-0 border-sky-600 hover:border-zinc-400 cursor-pointer inline-block">
                Movie Madness
              </p>
            </Link>
          </span>
        </div>

        {/* Desktop view */}
        <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-0 ml-auto text-[18px]">
              {/* links for sections */}
              <Link to="/book-film">
                <li className="hover:text-zinc-400 transition border-b-0 border-sky-600 hover:border-zinc-400 cursor-pointer">
                  Book Film
                </li>
              </Link>
              <li className="hover:text-zinc-400 transition border-b-0 border-sky-600 hover:border-zinc-400 cursor-pointer">
                <Link to="/account">
                  {isLoggedIn ? (
                    <button>Account</button>
                  ) : (
                    <button>Log In</button>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile burger */}
        <div>{click && content}</div>
        <button className="block sm:hidden transition" onClick={handleClick}>
          {click ? <FaTimes /> : <GiHamburgerMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
