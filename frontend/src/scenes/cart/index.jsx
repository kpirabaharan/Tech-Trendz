import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, json } from 'react-router-dom';

import { LoadingSpinner } from '../../icons/LoadingSpinner';
import CartItem from '../widgets/CartIem';
import { CartIcon } from '../../icons/CartIcon';
import { fetchCart, clearCart } from '../../state/cart-actions';

var isInit = true;

const CartPage = () => {
  const dispatch = useDispatch();
  const [isInitLoading, setIsInitLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const cart = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.user.user._id);
  const token = useSelector((state) => state.user.token);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    dispatch(fetchCart({ userId, token }));
  }, []);

  useEffect(() => {
    if (isInit) {
      isInit = false;
      return;
    } else {
      setIsInitLoading(false);
    }
  }, [cart]);

  const handleClearCart = () => {
    dispatch(clearCart({ userId, token }));
  };

  const handleOrder = async () => {
    setIsLoading(true);
    const response = await fetch(`${import.meta.env.VITE_NODE_SERVER}order/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw json({ message: 'Could not make order!' }, { status: 500 });
    } else {
      const { url } = await response.json();
      window.location = url;
    }
  };

  return (
    <div
      className='m-0 py-8 flex h-full min-h-[calc(100vh-115px)] sm:min-h-[calc(100vh-63px)] justify-center
     items-start bg-gradient-bluewhite'
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
          {isLoading ? (
            <div
              className='w-[90%] md:w-[70%] h-[calc(100vh-179px)] sm:h-[calc(100vh-127px)] 
        py-8 bg-white rounded-[20px] shadow-2xl flex flex-col justify-center
        items-center gap-4'
            >
              <h1 className='text-xl'>Checkout in Progress</h1>
              <h1 className='text-xl'>Please Wait...</h1>
            </div>
          ) : (
            <>
              {cart.length == 0 ? (
                <div
                  className='w-[90%] md:w-[70%] h-[calc(100vh-179px)] sm:h-[calc(100vh-127px)] 
              py-8 bg-white rounded-[20px] shadow-2xl flex flex-col justify-center
              items-center gap-4'
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
                      text-[#E44C4C] hover:text-[#fb7272] transition-colors duration-300 
                      border-[#E44C4C] hover:border-[#fb7272]'
                      onClick={handleClearCart}
                    >
                      Remove All
                    </button>
                  </div>
                  {cart.map((item, index) => {
                    return (
                      <div key={item._id}>
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
                          <hr
                            key={index}
                            className='w-[90%] m-auto border-t-[1px] border-dashed'
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                  <hr className='w-[90%] m-auto' />
                  <div className='float-right pt-2 mr-[5%] w-[300px]'>
                    <div className='w-full flex justify-between'>
                      <div>
                        <p
                          className='text-[22px] font-opensans font-semibold 
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
                      <p className='text-[36px] font-opensans font-semibold text-[#202020]'>
                        ${totalAmount.toFixed(2)}
                      </p>
                    </div>
                    <button
                      className='mt-[5px] w-full h-[40px] border-none bg-blue-500 
                        hover:bg-blue-300 rounded-[20px] cursor-pointer text-[16px]
                        font-opensans font-semibold text-white transition-colors 
                        duration-300'
                      onClick={handleOrder}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
