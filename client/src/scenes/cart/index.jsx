import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCart } from '../../state/cart-actions';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.user.user._id);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    dispatch(fetchCart({ userId }));
  }, []);

  return (
    <>
      {cart.length == 0 ? (
        <div className='w-5/6 mx-auto text-center pt-16'>
          <p className='text-3xl font-bold'>Your Cart is Empty</p>
        </div>
      ) : (
        <>
          <div className='w-5/6 mx-auto'>
            <p>Total: {totalQuantity}</p>
          </div>
          <div className='w-5/6 mx-auto'>
            {cart.map((item) => (
              <div className='flex flex-row' key={item._id}>
                <p>
                  {item.name} <span> {item.quantity}</span>{' '}
                  <span className='pl-4'>{item.cost}</span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CartPage;
