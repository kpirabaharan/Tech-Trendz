import React from 'react';

const ProductDetail = ({ product }) => {
  return (
    <div className='flex flex-col justify-center h-[100vh] bg-gray-500 z-0 pt-[131px] sm:pt-[63px]'>
      <div className='flex flex-row justify-center bg-blue'>
        <div className='flex justify-center basis-1/2'>
          <img
            className='w-auto h-auto block'
            src={`http://localhost:8080/assets/${product.picturePath}`}
            alt={product.picturePath}
          />
        </div>
        <div className='flex flex-col basis-1/2'>
          <p className='text-xl font-playfair font-bold'>{product.name}</p>
          <p>${product.cost}</p>
          <p className='text-sm pt-4'>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
