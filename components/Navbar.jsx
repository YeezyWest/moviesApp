import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between md:py-5 py-2 items-center">
      <Link href="/">Movies</Link>
      <img src="/movieLogo.png" alt="" className="md:w-10 w-10" />
      <Link href="/tvshows">Tv Shows</Link>
    </nav>
  );
};

export default Navbar;
