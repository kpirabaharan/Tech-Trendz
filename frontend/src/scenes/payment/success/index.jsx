import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { successfulOrder } from '../../../state/order-actions';

const PaymentSuccessPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    dispatch(successfulOrder({ userId, token }));
  }, []);

  return (
    <div
      className='flex flex-col justify-center h-[calc(100vh-115px)] sm:h-[calc(100vh-63px)] 
        items-center'
    >
      Successfull Payment.
      <div className='pt-4'>
        <Link
          className='bg-gradient-blue hover:bg-gradient-blue w-full
            min-w-[200px] mx-auto text-gray-800 hover:text-white shadow
            font-semibold py-2 px-4 rounded-[20px]'
          to={'/order'}
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
