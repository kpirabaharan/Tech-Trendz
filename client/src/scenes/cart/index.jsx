import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCart } from '../../state/cart-actions';
import CartItem from '../widgets/CartIem';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.user.user._id);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    dispatch(fetchCart({ userId }));
  }, []);

  console.log(cart);

  return (
    <>
      {cart.length == 0 ? (
        <div className='w-5/6 mx-auto text-center pt-16'>
          <p className='text-3xl font-bold'>Your Cart is Empty</p>
        </div>
      ) : (
        <>
          <div
            className='m-0 py-8 flex justify-center items-center bg-gradient-white
           '
          >
            <div className='w-[70%] py-4 bg-white rounded-[20px] shadow-2xl '>
              <div
                className='m-auto w-[90%] h-[15%] flex justify-between 
              items-center'
              >
                <h3 className='text-[20px] font-opensans font-bold text-[#2F3841]'>
                  Shopping Cart
                </h3>
                <h5
                  className='text-[14px] font-opensans font-semibold border-b-[1px]
                 text-[#E44C4C]  border-[#E44C4C] cursor-pointer'
                >
                  Remove All
                </h5>
              </div>
              {cart.map((item) => {
                return (
                  <CartItem
                    key={item._id}
                    name={item.name}
                    brand={item.brand}
                    cost={item.cost}
                    image={item.picturePath}
                    quantity={item.quantity}
                  />
                );
              })}
              <hr className='w-[90%] m-auto' />
              <div className='float-right mr-[5%] w-[300px]'>
                <div className='w-full flex justify-between'>
                  <div>
                    <p
                      className='text-[22px] font-opensans font-bold 
                    text-[#202020]'
                    >
                      Sub-Total
                    </p>
                    <p
                      className='text-[16px] font-opensans font-medium 
                    text-[#909090] leading-[10px]'
                    >
                      2 Items
                    </p>
                  </div>
                  <p className='text-[36px] font-opensans font-bold text-[#202020]'>
                    ${totalAmount}
                  </p>
                </div>
                <button
                  className='mt-[5px] w-full h-[40px] border-none 
                  bg-gradient-blue rounded-[20px] cursor-pointer text-[16px]
                  font-opensans font-semibold text-[#202020]'
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartPage;
