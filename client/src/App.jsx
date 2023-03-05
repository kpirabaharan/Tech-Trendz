import { useState, useEffect } from 'react';

import useMediaQuery from './hooks/useMediaQuery';
import Navbar from './scenes/Navbar';

function App() {
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');

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
    </div>
  );
}

export default App;
