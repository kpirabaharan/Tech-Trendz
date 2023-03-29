import { useSelector } from 'react-redux';

import ProductItem from './ProductItem';

const ProductGrid = () => {
  const products = useSelector((state) => state.products.items);

  return (
    <div className='flex-1'>
      <ul>
        <div className='grid grid-cols-1 sm:grid-cols-2 '>
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </ul>
    </div>
  );
};

export default ProductGrid;
