import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  return (
    <div className='bg-gray-300 mx-4 my-4 py-2 px-2 rounded-[20px] z-20 shadow-2xl'>
      <div className='flex justify-center'>
        <Link to={`/product/${product._id}`}>
          <img
            className='h-[180px] max-w-[100%] block object-contain'
            src={`${import.meta.env.VITE_NODE_SERVER}assets/${
              product.picturePath
            }`}
            alt={product.picturePath}
          />
        </Link>
      </div>
      <div className='flex justify-between'>
        <p className='text-sm'>{product.name}</p>
        <p className='text-sm '>{product.brand}</p>
      </div>
      <p className='text-sm font-bold'>{`$${product.cost}`}</p>
    </div>
  );
};

export default ProductItem;
