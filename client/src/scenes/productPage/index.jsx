import { useState, useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useMediaQuery from '../../hooks/useMediaQuery';
import Navbar from '../../components/Navbar';
import SmallSearchBar from '../../components/SmallSearchBar';
import ProductGrid from '../widgets/ProductGrid';
import { setProducts } from '../../state/product-slice';

const ProductPage = () => {
  const dispatch = useDispatch();
  const isAboveSmallScreens = useMediaQuery('(min-width: 768px)');
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const navbarBackground = isTopOfPage ? '' : 'bg-deep-blue';

  const products = useRouteLoaderData('products');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) setIsTopOfPage(true);
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect(() => {
  //   dispatch(setProducts(products));
  // }, []);

  return (
    <div>
      <Navbar isTopOfPage={isTopOfPage} />
      {!isAboveSmallScreens && (
        <div className={`fixed w-full h-[170px] ${navbarBackground}`}>
          <SmallSearchBar />
        </div>
      )}
      <div className='w-5/6 mx-auto pt-60 sm:pt-40'>
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductPage;

// export const productsLoader = async () => {
//   const response = await fetch('http://localhost:8080/products', {
//     method: 'GET',
//   });

//   if (!response.ok) {
//     throw new Error('Fetch Response Failed!');
//   }

//   const products = await response.json();
//   return products;
// };
