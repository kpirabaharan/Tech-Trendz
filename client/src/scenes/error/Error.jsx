import { useRouteError } from 'react-router-dom';

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
    <div className='w-full mx-auto pt-[120px] sm:pt-24'>
      <Navbar />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </div>
  );
};

export default ErrorPage;
