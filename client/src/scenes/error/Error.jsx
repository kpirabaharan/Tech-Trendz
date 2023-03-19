import { Link, useRouteError } from 'react-router-dom';

import PageContent from '../../components/PageContent';
import Navbar from '../../components/Navbar';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <Navbar />
      <main>
        <div
          className='pt-[115px] sm:pt-[63px] flex flex-col justify-center items-center
          h-[calc(100vh-115px)] sm:h-[calc(100vh-63px)] '
        >
          <PageContent title={title}>
            <p>{message}</p>
          </PageContent>
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
      </main>
    </>
    // <div className='w-full mx-auto pt-[120px] sm:pt-24'>
    //   <Navbar />
    //   <PageContent title={title}>
    //     <p>{message}</p>
    //   </PageContent>
    // </div>
  );
};

export default ErrorPage;
