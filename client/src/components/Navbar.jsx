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
    ? 'border-b-[1px]'
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
            <PersonIcon />
            <CartIcon />
          </div>
        ) : (
          <div className='flex items-center gap-8'>
            <PersonIcon />
            <CartIcon />
          </div>
        )}
      </nav>
      {!isAboveSmallScreens && <SearchBar />}
    </div>
  );

  {
    /* <nav className={`z-10 w-full fixed top-0 py-3 ${searchBarBackground}`}>
        <div className='flex items-center justify-between mx-auto w-5/6'>
          <Link to={`/`}>
            <h4 className='font-playfair text-3xl font-bold'>E-Commerce</h4>
          </Link>
          {isAboveSmallScreens ? (
            <div className='flex justify-between items-center gap-8'>
              <form>
                <SearchBar />
              </form>
              <PersonIcon />
              <CartIcon />
            </div>
          ) : (
            <div className='flex gap-8'>
              <PersonIcon />
              <CartIcon />
            </div>
          )}
        </div>
      </nav>
      {!isAboveSmallScreens && <SearchBar isSmallScreen={true} />} */
  }
};

export default Navbar;
