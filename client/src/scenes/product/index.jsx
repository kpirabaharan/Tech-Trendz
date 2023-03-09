import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteLoaderData, useSearchParams } from 'react-router-dom';

import { fetchProductData } from '../../state/product-actions';
import ProductCarousel from '../widgets/ProductCarousel';
import ProductQuery from '../widgets/ProductQuery';
import ProductGrid from '../widgets/ProductGrid';
import Footer from '../widgets/Footer';
import Line from '../../components/Line';

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useRouteLoaderData('products');
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) setIsTopOfPage(true);
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    var prodMode = 'all';
    if (mode) {
      prodMode = mode;
    }
    dispatch(fetchProductData(prodMode));
  }, [mode]);

  return (
    <div className='flex flex-col'>
      <div className='w-full mx-auto pt-[120px] sm:pt-24'>
        <ProductCarousel products={products} />
      </div>
      <Line />
      <div className='mx-auto pt-4'>
        <ProductQuery />
      </div>
      <div className='w-[90%] mx-auto md:h-full pt-2 pb-8 sm:pt-2'>
        <ProductGrid />
      </div>
      <Line />
      <div className='bg-cyan-100'>
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;

export const productsLoader = async () => {
  const response = await fetch('http://localhost:8080/products/new');

  if (!response.ok) {
    throw new Error('Fetch Response Failed!');
  }

  const products = await response.json();
  return products;
};
