import { useState } from 'react';

import useMediaQuery from '../hooks/useMediaQuery';
import { SearchIcon } from '../icons/SearchIcon';
import { CartIcon } from '../icons/CartIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { CloseIcon } from '../icons/CloseIcon';
import { SearchBar } from '../components/SearchBar';

const Navbar = ({ isTopOfPage }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveSmallScreens = useMediaQuery('(min-width: 768px)');
  const navbarBackground = isTopOfPage ? '' : 'bg-red';

  return (
    <nav className={`${navbarBackground} z-40 w-full fixed top-0 py-6`}>
      <div className='flex items-center justify-between mx-auto w-5/6'>
        <h4 className='font-playfair text-3xl font-bold'>E-Commerce</h4>
        {isAboveSmallScreens ? (
          <div className='flex justify-between items-center gap-8'>
            <form>
              <SearchBar />
            </form>
            <CartIcon />
          </div>
        ) : (
          <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
            <MenuIcon />
          </button>
        )}
        {!isAboveSmallScreens && isMenuToggled && (
          <div className='fixed right-0 bottom-0 h-full bg-blue w-[300px]'>
            {/* CLOSE ICON */}
            <div className='flex justify-end p-12 '>
              <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <CloseIcon />
              </button>
            </div>
            {/* MENU ITEMS */}
            <div className='flex flex-col items-center gap-10'>
              <SearchBar />
              <CartIcon />
            </div>
          </div>
        )}
        {/* <SearchIcon /> */}
      </div>
    </nav>
  );
};

export default Navbar;
