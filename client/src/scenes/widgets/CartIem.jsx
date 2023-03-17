import React from 'react';

const CartItem = ({ name, brand, cost, image, quantity }) => {
  return (
    <div className='m-auto w-[90%] h-[180px] flex  items-center'>
      <div className='w-[15%] flex justify-center'>
        <img
          className='h-[120px] block object-contain'
          src={`http://localhost:8080/assets/${image}`}
          alt={image}
        />
      </div>
      <div className='h-full flex-1 pl-4'>
        <p
          className='pt-[22px] leading-[40px] text-[32px] font-opensans font-bold
         text-[#202020]'
        >
          {name}
        </p>
        <p
          className='leading-[10px] text-[18px] font-opensans font-semibold 
        text-[#909090]'
        >
          {brand}
        </p>
      </div>
      <div className='flex flex-row-reverse w-[115px] justify-between items-center'>
        <div
          className='flex justify-center items-center text-[20px] text-[#202020]
          font-opensans font-bold colo w-[40px] h-[40px] rounded-[50%] bg-[#d9d9d9]
          cursor-pointer'
        >
          +
        </div>
        <div className='text-[20px] font-opensans font-extrabold text-[#202020]'>
          {quantity}
        </div>
        <div
          className='flex justify-center items-center text-[20px] text-[#202020]
          font-opensans font-bold colo w-[40px] h-[40px] rounded-[50%] bg-[#d9d9d9]
          cursor-pointer'
        >
          -
        </div>
      </div>
      <div className='h-full text-right w-[120px]'>
        <div className='pt-[22px] text-[26px] font-opensans font-bold text-[#202020]'>
          ${quantity * cost}
        </div>
        <div
          className='pt-[5px] text-[14px] font-opensans font-semibold 
        text-[#E44C4C] cursor-pointer'
        >
          Remove
        </div>
      </div>
    </div>
  );
};

export default CartItem;
