import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setLogout } from '../state/user-slice';
import { cartLogout } from '../state/cart-slice';
import { orderLogout } from '../state/order-slice';
import useMediaQuery from '../hooks/useMediaQuery';
import { CartIcon } from '../icons/CartIcon';
import { PersonIcon } from '../icons/PersonIcon';
import { LogoutIcon } from '../icons/Logout';
import { ShoppingBagIcon } from '../icons/ShoppingBagIcon';
import SearchBar from './SearchBar';

const Navbar = () => {
  const navigate = useNavigate();
  const isAboveSmallScreens = useMediaQuery('(min-width: 768px)');
  const dispatch = useDispatch();
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const user = useSelector((state) => state.user.user);

  const searchBarBackground = isTopOfPage
    ? 'border-b-[1px] bg-white'
    : 'border-b-[1px] bg-white opacity-80';

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
          <div className='flex justify-between items-center gap-6'>
            <form>
              <SearchBar />
            </form>
            {user ? (
              <>
                <Link to={'/order'}>
                  <ShoppingBagIcon />
                </Link>
                <Link to={'/cart'}>
                  <CartIcon />
                </Link>
              </>
            ) : (
              <></>
            )}
            {user ? (
              <button
                onClick={() => {
                  navigate('/');
                  dispatch(cartLogout());
                  dispatch(orderLogout());
                  return dispatch(setLogout());
                }}
              >
                <LogoutIcon />
              </button>
            ) : (
              <Link to={'/auth?mode=login'}>
                <PersonIcon />
              </Link>
            )}
          </div>
        ) : (
          <div className='flex items-center gap-6'>
            {user ? (
              <>
                <Link to={'/order'}>
                  <ShoppingBagIcon />
                </Link>
                <Link to={'/cart'}>
                  <CartIcon />
                </Link>
              </>
            ) : (
              <></>
            )}
            {user ? (
              <button
                onClick={() => {
                  navigate('/');
                  dispatch(cartLogout());
                  dispatch(orderLogout());
                  return dispatch(setLogout());
                }}
              >
                <LogoutIcon />
              </button>
            ) : (
              <Link to={'/auth?mode=login'}>
                <PersonIcon />
              </Link>
            )}
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
