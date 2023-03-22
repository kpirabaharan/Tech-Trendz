import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { LoadingSpinner } from '../../icons/LoadingSpinner';
import OrderItem from '../widgets/OrderItem';
import { fetchOrders } from '../../state/order-actions';

var isInit = true;

const OrderPage = () => {
  const dispatch = useDispatch();
  const [isInitLoading, setIsInitLoading] = useState(true);
  const userId = useSelector((state) => state.user.user._id);
  const token = useSelector((state) => state.user.token);
  const orders = useSelector((state) => state.orders.items);

  useEffect(() => {
    dispatch(fetchOrders({ userId, token }));
  }, []);

  useEffect(() => {
    if (isInit) {
      isInit = false;
      return;
    } else {
      setIsInitLoading(false);
    }
  }, [orders]);

  return (
    <div
      className='m-0 py-8 flex h-full min-h-[calc(100vh-115px)] sm:min-h-[calc(100vh-63px)] 
        justify-center items-start bg-gradient-bluewhite'
    >
      {isInitLoading ? (
        <div
          className='w-[90%] md:w-[70%] h-[calc(100vh-179px)] 
            sm:h-[calc(100vh-127px)] py-4 bg-white rounded-[20px] shadow-2xl 
            flex flex-col justify-center items-center gap-4'
        >
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {orders.length == 0 ? (
            <div
              className='w-[90%] md:w-[70%] h-[calc(100vh-179px)] 
                sm:h-[calc(100vh-127px)] py-4 bg-white rounded-[20px] shadow-2xl 
                flex flex-col justify-center items-center gap-4'
            >
              <p className='text-3xl font-bold text-[#E44C4C]'>
                You have no orders yet!
              </p>
              <p className='text-xl font-bold'>Return home!</p>
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
                  products={order.products}
                  orderDate={order.orderDate}
                  deliveryDate={order.deliveryDate}
                  totalAmount={order.totalAmount}
                  totalQuantity={order.totalQuantity}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderPage;
