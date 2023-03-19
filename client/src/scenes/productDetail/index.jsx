import { useEffect } from 'react';
import { useRouteLoaderData, json, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '../../state/cart-actions';

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const product = useRouteLoaderData('product');
  const userId = useSelector((state) => {
    if (state.user.user) {
      return state.user.user._id;
    }
    return null;
  });

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, userId }));
  };

  return (
    <div
      className='m-0 flex sm:flex-row flex-col bg-gradient-bluewhite sm:bg-transparent
      h-[calc(100vh-115px)] sm:h-[calc(100vh-63px)]'
    >
      <div className='bg-gradient-bluewhite basis-1/2 sm:basis-2/3 flex'>
        <img
          className='h-[350px] sm:h-[50%] w-[80%] m-auto block object-contain'
          src={`http://localhost:8080/assets/${product.picturePath}`}
          alt={product.picturePath}
        />
      </div>
      <div
        className='basis-1/2 sm:basis-1/3 px-2 py-4 sm:py-0 sm:bg-white flex 
        items-center justify-center w-5/6 mx-auto'
      >
        <div className='h-[400px] max-h-full w-full flex flex-col justify-between'>
          <Link className='text-gray-600 underline' to={'..'} relative='route'>
            Home
          </Link>
          <div>
            <div className='flex justify-between items-center'>
              <p className='text-2xl font-bold font-opensans'>{product.name}</p>
              <p className='text-xl font-bold font-opensans'>${product.cost}</p>
            </div>
            <p className='text-sm'>{product.description}</p>
          </div>
          <>
            {userId == null ? (
              <div className='mx-auto'>
                <Link
                  className='flex justify-center bg-gradient-blue 
                  hover:bg-gradient-blue w-[80%] min-w-[200px] text-gray-800 
                  hover:text-white font-semibold py-2 px-4 rounded-[20px] shadow'
                  to={'/auth?mode=login'}
                >
                  Sign in to Add to Cart
                </Link>
              </div>
            ) : (
              <button
                className='bg-gradient-blue hover:bg-gradient-blue w-[80%]
                 min-w-[200px] mx-auto text-gray-800 hover:text-white 
                 font-semibold py-2 px- rounded-[20px] shadow'
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

export const productLoader = async ({ request, params }) => {
  const id = params.productId;

  const response = await fetch(`http://localhost:8080/product/item/${id}`);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for product.' },
      { status: 500 },
    );
  } else {
    const product = await response.json();

    return product;
  }
};
