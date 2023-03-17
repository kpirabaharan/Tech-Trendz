import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addToCart,
  removeFromCart,
  removeAllFromCart,
} from '../../state/cart-actions';

const CartItem = ({ id, name, brand, cost, image, quantity }) => {
  const userId = useSelector((state) => state.user.user._id);
  const dispatch = useDispatch();

  const handleRemoveAllFromCart = () => {
    dispatch(removeAllFromCart({ productId: id, userId }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ productId: id, userId }));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: id, userId }));
  };

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
        <button
          className='flex justify-center items-center text-[20px] text-[#202020]
          font-opensans font-bold colo w-[40px] h-[40px] rounded-[50%] bg-[#d9d9d9]'
          onClick={handleAddToCart}
        >
          +
        </button>
        <div className='text-[20px] font-opensans font-extrabold text-[#202020]'>
          {quantity}
        </div>
        <button
          className='flex justify-center items-center text-[20px] text-[#202020]
          font-opensans font-bold colo w-[40px] h-[40px] rounded-[50%] bg-[#d9d9d9]'
          onClick={handleRemoveFromCart}
        >
          -
        </button>
      </div>
      <div className='h-full text-right w-[120px]'>
        <div className='pt-[22px] text-[26px] font-opensans font-bold text-[#202020]'>
          ${(quantity * cost).toFixed(2)}
        </div>
        <button
          className='pt-[5px] text-[14px] font-opensans font-semibold 
        text-[#E44C4C]'
          onClick={handleRemoveAllFromCart}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;