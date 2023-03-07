import ProductItem from './ProductItem';

const ProductGrid = ({ products }) => {
  return (
    <ul>
      <div className='grid grid-cols-1 ss:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </ul>
  );
};

export default ProductGrid;
