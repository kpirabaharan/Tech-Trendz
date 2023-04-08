import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteLoaderData, useSearchParams, json } from 'react-router-dom';

import { fetchProductData } from '../../state/product-actions';
import CategoryQuery from '../widgets/CategoryQuery';
import ProductQuery from '../widgets/ProductQuery';
import ProductCarousel from '../widgets/ProductCarousel';
import ProductGrid from '../widgets/ProductGrid';
import Pagination from '../../components/Pagination';
import Footer from '../widgets/Footer';

let PageSize = 2;

const ProductPage = () => {
  const dispatch = useDispatch();
  const carouselProducts = useRouteLoaderData('products');
  const numOfProducts = useSelector((state) => state.products.numOfProducts);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMode, setCurrentMode] = useState('all');
  const [currentCategory, setCurrentCategory] = useState('all');
  const mode = searchParams.get('mode');
  const page = searchParams.get('page');

  useEffect(() => {
    var prodMode = 'all';
    var pageNum = '1';
    if (mode) {
      prodMode = mode;
    }
    if (page) {
      pageNum = page;
    }
    dispatch(fetchProductData({ mode: prodMode, page: pageNum }));
  }, [mode, page]);

  return (
    <div className='flex flex-col bg-gradient-bluewhite'>
      <div className='w-full mx-auto'>
        <ProductCarousel products={carouselProducts} />
      </div>
      <div className='mx-auto pt-10'>
        <ProductQuery
          mode={currentMode}
          onPageChange={(page) => setCurrentPage(page)}
          onModeChange={(mode) => setCurrentMode(mode)}
        />
      </div>
      <div className='flex flex-col sm:flex-row w-[90%] mx-auto md:h-full pt-2 pb-8 sm:pt-2'>
        {/* <CategoryQuery /> */}
        <ProductGrid />
      </div>
      <div className='w-[90%] mx-auto md:h-full pt-2 pb-8 sm:pt-2'>
        <Pagination
          mode={currentMode}
          currentPage={currentPage}
          totalCount={numOfProducts}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
          onModeChange={(mode) => setCurrentMode(mode)}
        />
      </div>
      <div className='bg-cyan-100'>
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;

export const productsLoader = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_NODE_SERVER}product/carousel`,
  );

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
