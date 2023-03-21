import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import OrderItem from '../widgets/OrderItem';
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
      {orders.length == 0 ? (
        <div
          className='w-[90%] md:w-[70%] h-full bg-white rounded-[20px] shadow-2xl 
            flex flex-col justify-center items-center gap-4'
        >
          <p className='text-3xl font-bold pt-4 text-[#E44C4C]'>
            You have no orders yet!
          </p>
          <div className='flex flex-wrap w-[355px] text-center'>
            <p className='text-xl font-bold'>Return home!</p>
          </div>
          <Link to={`/`}>
            <h4
              className='px-4 py-2 border-none 
                  bg-gradient-blue rounded-[20px] cursor-pointer text-[16px]
                  font-opensans font-semibold text-[#202020]'
            >
              Shop Now
            </h4>
          </Link>
        </div>
      ) : (
        <div className='w-[90%] md:w-[70%] py-4 bg-white rounded-[20px] shadow-2xl '>
          <div
            className='m-auto w-[90%] h-[15%] flex justify-between 
              items-center'
          >
            <h3 className='text-[20px] font-opensans font-bold text-[#2F3841]'>
              Your Orders
            </h3>
          </div>
          {orders.map((order) => (
            <OrderItem
              orderId={order.orderId}
              orderName={`${order.orderFirstName} ${order.orderLastName}`}
              orderEmail={order.orderEmail}
              orderDate={order.orderDate}
              deliveryDate={order.deliveryDate}
              totalAmount={order.totalAmount}
              totalQuantity={order.totalQuantity}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
