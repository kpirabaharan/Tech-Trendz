import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addToCart,
  removeFromCart,
  removeAllFromCart,
} from '../../state/cart-actions';

const CartItem = ({ id, name, brand, cost, image, quantity }) => {
  const userId = useSelector((state) => state.user.user._id);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const handleRemoveAllFromCart = () => {
    dispatch(removeAllFromCart({ productId: id, userId, token }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ productId: id, userId, token }));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: id, userId, token }));
  };

  return (
    <div className='m-auto w-[90%] h-[180px] flex items-center'>
      <div className='w-[15%] flex justify-center'>
        <img
          className='h-[120px] block object-contain'
          src={`http://localhost:8080/assets/${image}`}
          alt={image}
        />
      </div>
      <div className='flex flex-col sm:flex-row flex-1 h-full'>
        <div className='sm:h-full sm:flex-1 pl-4'>
          <p
            className='pt-[22px] leading-[40px] text-[22px] font-opensans
         text-[#202020]'
          >
            {name}
          </p>
          <p className='leading-[10px] text-[18px] font-opensans text-[#909090]'>
            {brand}
          </p>
        </div>
        <div
          className='flex ml-4 sm:ml-0 mt-4 sm:mt-0 flex-row-reverse w-[115px] justify-between 
          items-center'
        >
          <button
            className='flex justify-center items-center text-[20px] text-[#202020]
              font-opensans font-bold colo w-[40px] h-[40px] rounded-[50%] bg-[#c1c1c1]
              hover:bg-[#d9d9d9] transition-colors duration-300'
            onClick={handleAddToCart}
          >
            +
          </button>
          <div className='text-[20px] font-opensans text-[#202020]'>
            {quantity}
          </div>
          <button
            className='flex justify-center items-center text-[20px] text-[#202020]
              font-opensans font-bold colo w-[40px] h-[40px] rounded-[50%] bg-[#c1c1c1]
              hover:bg-[#d9d9d9] transition-colors duration-300'
            onClick={handleRemoveFromCart}
          >
            -
          </button>
        </div>
      </div>
      <div className='h-full text-right w-[120px]'>
        <div className='pt-[22px] text-[26px] font-opensans text-[#202020]'>
          ${(quantity * cost).toFixed(2)}
        </div>
        <button
          className='pt-[5px] text-[14px] font-opensans font-semibold 
          text-[#E44C4C] hover:text-[#fb7272] transition-colors duration-300'
          onClick={handleRemoveAllFromCart}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
