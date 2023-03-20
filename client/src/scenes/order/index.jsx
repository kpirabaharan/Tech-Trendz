import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrders } from '../../state/order-actions';

const OrderPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);
  const token = useSelector((state) => state.user.token);
  const orders = useSelector((state) => state.orders.items);

  useEffect(() => {
    dispatch(fetchOrders({ userId, token }));
  }, []);

  return (
    <div
      className='m-0 py-8 flex h-[calc(100vh-63px)] justify-center items-start 
        bg-gradient-bluewhite'
    >
      <div
        className='w-[90%] md:w-[70%] h-full bg-white rounded-[20px] shadow-2xl 
          flex flex-col justify-center items-center gap-2'
      >
        {orders.map((order) => {
          return (
            <div key={order._id} className='text-center'>
              <h1>{order.orderFirstName}</h1>
              <h1>{order.orderLastName}</h1>
              <h1>{order.orderEmail}</h1>
              <h1>{order.orderDate}</h1>
              <h1>{order.totalAmount}</h1>
              <h1>{order.totalQuantity}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
