import React, { useEffect, useState } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import useMediaQuery from '../../hooks/useMediaQuery';
import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';

function RootLayout() {
  const isAboveSmallScreens = useMediaQuery('(min-width: 768px)');
  const navigation = useNavigation();
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const searchBarBackground = isTopOfPage ? '' : 'bg-blue';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) setIsTopOfPage(true);
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='flex flex-col'>
      <div
        className={`z-[40] fixed h-[7.5rem] sm:h-16 w-full flex flex-col ${searchBarBackground}`}
      >
        <Navbar isTopOfPage={isTopOfPage} />
        {!isAboveSmallScreens && <SearchBar isSmallScreen={true} />}
      </div>
      <main>
        {navigation.state === 'loading' && <p>Loading...</p>}
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;