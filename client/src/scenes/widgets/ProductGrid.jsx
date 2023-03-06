const ProductGrid = ({ products }) => {
  console.log(products);
  return (
    <div className='grid grid-cols-3 text-center'>
      <h1>Products</h1>
      <h1>List</h1>
      <h1>Page</h1>
    </div>
  );
};

export default ProductGrid;
