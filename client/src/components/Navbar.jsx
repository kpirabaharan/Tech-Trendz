import useMediaQuery from '../hooks/useMediaQuery';
import { CartIcon } from '../icons/CartIcon';
import { PersonIcon } from '../icons/PersonIcon';
import SearchBar from './SearchBar';

const Navbar = ({ isTopOfPage }) => {
  const isAboveSmallScreens = useMediaQuery('(min-width: 768px)');

  return (
    <nav className={`z-40 w-full fixed top-0 py-3`}>
      <div className='flex items-center justify-between mx-auto w-5/6'>
        <h4 className='font-playfair text-3xl font-bold'>E-Commerce</h4>
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
  );
};

export default Navbar;
