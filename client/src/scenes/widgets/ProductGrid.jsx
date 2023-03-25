import { useSelector } from 'react-redux';

import ProductItem from './ProductItem';

const ProductGrid = () => {
  const products = useSelector((state) => state.products.items);

  return (
    <ul>
      <div className='grid grid-cols-1 sm:grid-cols-2'>
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </ul>
  );
};

export default ProductGrid;
