import { Link } from 'react-router-dom';

import { FillStar } from '../../icons/FillStar';
import { EmptyStar } from '../../icons/EmptyStar';

const ProductItem = ({ product }) => {
  const renderStars = (prod) => {
    const stars = [];

    const fullStars = Math.round(prod.rating);
    const emptyStars = 5 - fullStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FillStar />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<EmptyStar />);
    }

    return stars;
  };

  return (
    <div className='flex flex-col w-[300px]'>
      <Link to={`/product/${product._id}`}>
        <div
          className='flex justify-center items-center bg-gray-200 rounded-lg w-full 
        h-[250px]'
        >
          <img
            className='h-[75%] w-[90%] object-contain'
            src={`${import.meta.env.VITE_NODE_SERVER}assets/${
              product.picturePath
            }`}
            alt={product.picturePath}
          />
        </div>
      </Link>

      <div className='flex flex-row justify-between'>
        <p className='text-lg font-semibold'>{product.name}</p>
        <div className='flex flex-row'>
          <p className='text-lg font-semibold'>${Math.floor(product.cost)}</p>
          <p className='text-xs font-semibold leading-5'>
            {(product.cost % 1).toFixed(2).substring(2)}
          </p>
        </div>
      </div>

      <div className='flex'>
        <p className='text-sm'>{product.brand}</p>
      </div>

      <div className='flex flex-row pt-1'>{renderStars(product)}</div>
    </div>
  );
};

export default ProductItem;
