import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import { Link } from "react-router-dom";

// Navbar
const Nav = () => {
  // To allow dynamic navbar
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  // Mobile view
  const content = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-sky-500 transition">
      <ul className="text-center text-xl p-20">
        {/* Links for sections*/}
        <Link spy={true} smooth={true} to="/book-film">
          <li className="my-4 py-4 border-b border-sky-500 hover:bg-sky-500 hover:text-zinc-400 hover:rounded cursor-pointer spy={true} smooth={true}">Book Film</li>
        </Link>
        <Link spy={true} smooth={true} to="/log-in">
          <li className="my-4 py-4 border-b border-sky-500 hover:bg-sky-500 hover:text-zinc-400 hover:rounded cursor-pointer spy={true} smooth={true}">Log In</li>
        </Link>
      </ul>
    </div>
  );

  // Return JSX for the navbar
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
              <Link spy={true} smooth={true} to="/log-in">
                <li className="hover:text-zinc-400 transition border-b-0 border-sky-600 hover:border-zinc-400 cursor-pointer">Log In</li>
              </Link>
            </ul>
          </div>
        </div>

        {/* Mobile burger */}
        <div>
          {click && content}
        </div>
        <button className="block sm:hidden transition" onClick={handleClick}>
          {/* Hamburger icons*/}
          { click ? <FaTimes /> : <GiHamburgerMenu /> }
        </button>
      </div>
    </nav>
  );
}

export default Nav;