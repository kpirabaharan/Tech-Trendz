import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteLoaderData, useSearchParams, json } from 'react-router-dom';

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
    var prodMode = 'all';
    if (mode) {
      prodMode = mode;
    }
    dispatch(fetchProductData(prodMode));
  }, [mode]);

  return (
    <div className='flex flex-col bg-gradient-bluewhite'>
      <div className='w-full mx-auto'>
        <ProductCarousel products={products} />
      </div>
      <div className='mx-auto pt-10'>
        <ProductQuery />
      </div>
      <div className='w-[90%] mx-auto md:h-full pt-2 pb-8 sm:pt-2'>
        <ProductGrid />
      </div>
      <div className='bg-cyan-100'>
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;

export const productsLoader = async () => {
  const response = await fetch('http://localhost:8080/product/new');

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for products.' },
      { status: 500 },
    );
  } else {
    const products = await response.json();
    return products;
  }
};
