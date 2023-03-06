import ProductItem from './ProductItem';

const ProductGrid = ({ products }) => {
  return (
    <ul>
      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 sm:grid-cols-3'>
        {products.map((product) => (
          <ProductItem className='mx-2' key={product._id} product={product} />
        ))}
      </div>
    </ul>
  );
};

export default ProductGrid;
