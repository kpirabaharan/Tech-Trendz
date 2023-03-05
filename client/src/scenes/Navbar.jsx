import { useState } from 'react';

import useMediaQuery from '../hooks/useMediaQuery';
import { CartIcon } from '../icons/CartIcon';
import { SearchBar } from '../components/SearchBar';

const Navbar = ({ isTopOfPage }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveSmallScreens = useMediaQuery('(min-width: 768px)');
  const navbarBackground = isTopOfPage ? '' : 'bg-deep-blue';

  return (
    <nav className={`${navbarBackground} z-40 w-full fixed top-0 py-6`}>
      <div className='flex items-center justify-between mx-auto w-5/6'>
        <h4 className='font-playfair text-3xl font-bold'>E-Commerce</h4>
        {isAboveSmallScreens ? (
          <div className='flex justify-between items-center gap-8'>
            <form>
              <SearchBar isTopOfPage={isTopOfPage} />
            </form>
            <CartIcon />
          </div>
        ) : (
          <CartIcon />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
