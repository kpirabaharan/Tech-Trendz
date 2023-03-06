const ProductItem = ({ product }) => {
  return (
    <div className='sm:h-[350px] bg-blue text-center mx-4 my-6'>
      <div className='flex justify-center'>
        <img
          className='max-w-[100%] h-auto w-auto'
          src={`http://localhost:8080/assets/${product.picturePath}`}
          alt={product.picturePath}
        />
      </div>
      <h1>{product.name}</h1>
      <h2>{product.cost}</h2>
    </div>
  );
};

export default ProductItem;
