import { Outlet, useNavigation } from 'react-router-dom';

import Navbar from '../../components/Navbar';

function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      <Navbar />
      <main>
        <div className='w-full h-full align-middle text-center'>
          {navigation.state === 'loading' && <p>Loading...</p>}
        </div>
        <div className='pt-[115px] sm:pt-[63px]'>
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default RootLayout;
