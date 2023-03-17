import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCart, clearCart } from '../../state/cart-actions';
import CartItem from '../widgets/CartIem';
import { CartIcon } from '../../icons/CartIcon';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.user.user._id);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    dispatch(fetchCart({ userId }));
  }, []);

  const handleClearCart = () => {
    dispatch(clearCart({ userId }));
  };

  return (
    <div
      className='m-0 py-8 flex h-[calc(100vh-63px)] justify-center items-start 
    bg-gradient-bluewhite'
    >
      {cart.length == 0 ? (
        <div
          className='w-[90%] md:w-[70%] h-full bg-white rounded-[20px] shadow-2xl 
            flex flex-col justify-center items-center gap-4'
        >
          <CartIcon w='200px' h='200px' />
          <p className='text-3xl font-bold pt-4 text-[#E44C4C]'>
            Oops! Your cart is empty!
          </p>
          <div className='flex flex-wrap w-[355px] text-center'>
            <p className='text-xl font-bold'>
              Looks like you haven't added anything to your cart yet
            </p>
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
              Shopping Cart
            </h3>
            <button
              className='text-[14px] font-opensans font-semibold border-b-[1px]
                 text-[#E44C4C] border-[#E44C4C]'
              onClick={handleClearCart}
            >
              Remove All
            </button>
          </div>
          {cart.map((item, index) => {
            console.log(index);
            return (
              <>
                <CartItem
                  key={item._id}
                  id={item.productId}
                  name={item.name}
                  brand={item.brand}
                  cost={item.cost}
                  image={item.picturePath}
                  quantity={item.quantity}
                />
                {cart.length - 1 != index ? (
                  <hr className='w-[90%] m-auto border-t-[1px] border-dashed' />
                ) : (
                  <></>
                )}
              </>
            );
          })}
          <hr className='w-[90%] m-auto' />
          <div className='float-right pt-2 mr-[5%] w-[300px]'>
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
                  {totalQuantity} Items
                </p>
              </div>
              <p className='text-[36px] font-opensans font-bold text-[#202020]'>
                ${totalAmount.toFixed(2)}
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
      )}
    </div>
  );
};

export default CartPage;
