import React from 'react';

import { TruckIcon } from '../../icons/TruckIcon';
import OrderProducts from './OrderProducts';

const OrderItem = ({
  orderId,
  orderName,
  orderEmail,
  orderDate,
  products,
  deliveryDate,
  totalAmount,
  totalQuantity,
}) => {
  return (
    <div className='m-auto w-[90%]'>
      <p
        className='pt-[22px] leading-[60px] text-[22px] font-opensans font-semibold
         text-[#202020]'
      >
        Order ID:
        <span> {orderId.substring(orderId.length - 9, orderId.length)}</span>
      </p>
      <div className='flex flex-row items-center'>
        <p className='text-[14px] font-opensans text-[#616161]'>
          Order date: <span className='text-[#616161]'>{orderDate}</span>
        </p>
        <div className='border-r-[2px] border-gray-400 h-[18px] pl-4' />
        <div className='pl-4'>
          <TruckIcon />
        </div>
        <div className='pl-4'>
          <p className='text-[14px] font-opensans text-green-500'>
            Estimated Delivery: <span>{deliveryDate}</span>
          </p>
        </div>
      </div>
      <div className='pt-4'>
        <hr />
      </div>
      <div className='flex flex-col'>
        {products.map((product) => (
          <OrderProducts key={product._id} product={product} />
        ))}
      </div>
      <hr />
      <div className='flex flex-row w-[50%] ml-[50%]'>
        <div className='flex flex-col w-full py-4'>
          <p className='text-[#202020] text-[22px] font-semibold'>
            Order Summary
          </p>
          <div className='flex flex-row justify-between pt-2'>
            <p className='text-[#616161] text-[22px]'>Subtotal</p>
            <p className='text-[#616161] text-[22px]'>
              ${totalAmount.toFixed(2)}
            </p>
          </div>
          <div className='flex flex-row justify-between pt-2'>
            <p className='text-[#7c7c7c] text-[18px]'>Tax</p>
            <p className='text-[#7c7c7c] text-[18px]'>
              + ${(totalAmount * 0.13).toFixed(2)}
            </p>
          </div>
          <div className='pt-4'>
            <hr className='border-dashed' />
          </div>
          <div className='flex flex-row justify-between pt-2'>
            <p className='text-[#202020] text-[22px]'>Total</p>
            <p className='text-[#202020] text-[22px]'>
              ${(totalAmount * 1.13).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
