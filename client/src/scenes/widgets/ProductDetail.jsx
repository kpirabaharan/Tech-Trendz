import React from 'react';

const ProductDetail = ({ product }) => {
  return (
    <div className='grid grid-cols'>
      <h1>Hi</h1>
      {/* <div className='flex flex-row'>
        <div className='basis-1/2 pr-2'>
          <img
            className='max-h-[500px]'
            src={`http://localhost:8080/assets/${product.picturePath}`}
            alt={product.picturePath}
          />
        </div>
        <div className='flex flex-col basis-1/2 pt-32'>
          <p className='text-xl font-playfair font-bold'>{product.name}</p>
          <p>${product.cost}</p>
          <p className='text-sm pt-4'>{product.description}</p>
        </div>
      </div> */}
    </div>
  );
};

export default ProductDetail;
