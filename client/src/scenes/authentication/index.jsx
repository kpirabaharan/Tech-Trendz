import { json, redirect } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';

const AuthenticationPage = () => {
  return (
    <div className='w-5/6 sm:w-[60%] mx-auto pt-16'>
      <AuthForm />
    </div>
  );
};

export default AuthenticationPage;

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'register') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  // const data = await request.formData();
  // const authData = {
  //   email: data.get('email'),
  //   password: data.get('password'),
  // };

  // const response = await fetch('http://localhost:8080/' + mode, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(authData),
  // });
};
