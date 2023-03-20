import { Link } from 'react-router-dom';

const PaymentCancelPage = () => {
  return (
    <div
      className='flex flex-col justify-center h-[calc(100vh-115px)] sm:h-[calc(100vh-63px)] 
      items-center'
    >
      Payment has been canceled.
      <div className='pt-4'>
        <Link
          className='bg-gradient-blue hover:bg-gradient-blue w-full
              min-w-[200px] mx-auto text-gray-800 hover:text-white shadow
              font-semibold py-2 px-4 rounded-[20px]'
          to={'/'}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
