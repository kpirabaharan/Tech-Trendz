import { useRouteLoaderData, json } from 'react-router-dom';

import ProductDetail from '../widgets/ProductDetail';

const ProductDetailPage = () => {
  const product = useRouteLoaderData('product');

  return <ProductDetail product={product} />;
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
