const ProductItem = ({ product }) => {
  return (
    <div className='bg-gray-300 mx-4 my-4 py-2 px-2 rounded-[20px]'>
      <div className='flex justify-center'>
        <img
          className='h-[180px] max-w-[100%]'
          src={`http://localhost:8080/assets/${product.picturePath}`}
          alt={product.picturePath}
        />
      </div>
      <div className='flex justify-between'>
        <p className='text-sm'>{product.name}</p>
        <p className='text-sm '>{product.brand}</p>
      </div>
      <p className='text-sm font-bold'>{`$${product.cost} CAD`}</p>
      <div className='flex justify-between'>
        <button className='bg-white ml-2 rounded-lg px-2'>-</button>
        <p>0</p>
        <button className='bg-white mr-2 rounded-lg px-2'>+</button>
      </div>
    </div>
  );
};

export default ProductItem;
