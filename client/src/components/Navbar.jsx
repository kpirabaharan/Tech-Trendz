import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMediaQuery from '../hooks/useMediaQuery';
import { CartIcon } from '../icons/CartIcon';
import { PersonIcon } from '../icons/PersonIcon';
import SearchBar from './SearchBar';

const Navbar = () => {
  const isAboveSmallScreens = useMediaQuery('(min-width: 768px)');
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const searchBarBackground = isTopOfPage
    ? 'border-b-[1px] bg-white'
    : 'bg-blue bg-opacity-75';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) setIsTopOfPage(true);
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`z-40 w-full fixed ${searchBarBackground} pb-4 sm:pb-0`}>
      <nav className={'flex flex-row justify-between mx-auto w-5/6 top-0 py-3'}>
        <Link to={`/`}>
          <h4 className='font-playfair text-3xl font-bold'>E-Commerce</h4>
        </Link>
        {isAboveSmallScreens ? (
          <div className='flex justify-between items-center gap-8'>
            <form>
              <SearchBar />
            </form>
            <Link to={'/auth'}>
              <PersonIcon />
            </Link>
            <Link to={'/cart'}>
              <CartIcon />
            </Link>
          </div>
        ) : (
          <div className='flex items-center gap-8'>
            <Link to={'/auth'}>
              <PersonIcon />
            </Link>
            <Link to={'/cart'}>
              <CartIcon />
            </Link>
          </div>
        )}
      </nav>
      {!isAboveSmallScreens && (
        <form>
          <SearchBar />
        </form>
      )}
    </div>
  );
};

export default Navbar;
