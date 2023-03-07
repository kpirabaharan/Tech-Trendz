import { useState, useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';

import useMediaQuery from '../../hooks/useMediaQuery';
import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import ProductGrid from '../widgets/ProductGrid';
import ProductCarousel from '../widgets/ProductCarousel';

const ProductPage = () => {
  const isAboveSmallScreens = useMediaQuery('(min-width: 768px)');
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const searchBarBackground = isTopOfPage ? '' : 'bg-blue';

  const products = useRouteLoaderData('products');

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
        {!isAboveSmallScreens && (
          <div>
            <SearchBar isSmallScreen={true} />
          </div>
        )}
      </div>

      <div className='w-full mx-auto pt-[120px] sm:pt-24'>
        <ProductCarousel products={products} />
      </div>

      <div className='w-[90%] mx-auto md:h-full pt-32 sm:pt-8'>
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductPage;

export const productsLoader = async () => {
  const response = await fetch('http://localhost:8080/products', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Fetch Response Failed!');
  }

  const products = await response.json();
  return products;
};
