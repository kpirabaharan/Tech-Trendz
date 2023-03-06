import { useState, useEffect } from 'react';

import useMediaQuery from '../../hooks/useMediaQuery';
import Navbar from '../../components/Navbar';
import SmallSearchBar from '../../components/SmallSearchBar';

const ProductPage = () => {
  const isAboveSmallScreens = useMediaQuery('(min-width: 768px)');
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const navbarBackground = isTopOfPage ? '' : 'bg-deep-blue';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) setIsTopOfPage(true);
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Navbar isTopOfPage={isTopOfPage} />
      {!isAboveSmallScreens && (
        <div className={`fixed w-full h-[170px] ${navbarBackground}`}>
          <SmallSearchBar />
        </div>
      )}
      <div className='w-5/6 mx-auto'>
        <section className='grid grid-cols-3 pt-48 pb-48'>
          <div className='flex justify-center'>
            <h1>Yo</h1>
          </div>
          <div>
            <h1>Yo</h1>
          </div>
          <div>
            <h1>Yo</h1>
          </div>
          <div>
            <h1>Yo</h1>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
