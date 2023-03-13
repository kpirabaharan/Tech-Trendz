import { useEffect } from 'react';
import { useRouteLoaderData, json } from 'react-router-dom';

import ProductDetail from '../widgets/ProductDetail';

const ProductDetailPage = () => {
  const product = useRouteLoaderData('product');

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className='w-5/6 mx-auto md:h-full'>
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;

export const productLoader = async ({ request, params }) => {
  const id = params.productId;

  const response = await fetch(`http://localhost:8080/product/item/${id}`);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for product.' },
      { status: 500 },
    );
  } else {
    const product = await response.json();
    console.log(product);
    return product;
  }
};
