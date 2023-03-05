import { useState, useEffect } from 'react';

import useMediaQuery from './hooks/useMediaQuery';
import Navbar from './scenes/Navbar';
import { SmallSearchBar } from './components/SmallSearchBar';

function App() {
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
  const isAboveSmallScreens = useMediaQuery('(min-width: 768px)');
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
    <div className='app bg-deep-blue'>
      <Navbar isTopOfPage={isTopOfPage} />
      {!isAboveSmallScreens && (
        <div className={`fixed w-full h-[170px] ${navbarBackground}`}>
          <SmallSearchBar isTopOfPage={isTopOfPage} />
        </div>
      )}
    </div>
  );
}

export default App;
