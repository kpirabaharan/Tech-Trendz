import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../../state/product-actions';

const ProductGrid = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductData());
    console.log(products);
  }, []);

  return (
    <div className='grid grid-cols-3 text-center'>
      <h1>Products</h1>
      <h1>List</h1>
      <h1>Page</h1>
    </div>
  );
};

export default ProductGrid;
