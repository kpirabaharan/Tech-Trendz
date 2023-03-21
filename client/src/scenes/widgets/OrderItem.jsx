import React from 'react';

import { TruckIcon } from '../../icons/TruckIcon';

const OrderItem = ({
  orderId,
  orderName,
  orderEmail,
  orderDate,
  deliveryDate,
  totalAmount,
  totalQuantity,
}) => {
  return (
    <div className='m-auto w-[90%] h-[180px]'>
      <p
        className='pt-[22px] leading-[60px] text-[22px] font-opensans font-semibold
         text-[#202020]'
      >
        Order ID:
        <span> {orderId.substring(orderId.length - 9, orderId.length)}</span>
      </p>
      <div className='flex flex-row items-center'>
        <p className='text-[14px] font-opensans text-[#a2a2a2]'>
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
    </div>
  );
};
// border-left:1px solid #38546d;
//      border-right:1px solid #16222c;
//      height:80px;
//      position:absolute;
//      right:249px;
//      top:10px;

export default OrderItem;
