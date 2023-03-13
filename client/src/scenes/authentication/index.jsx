import { json, redirect } from 'react-router-dom';

import AuthForm from '../../components/AuthForm';

const AuthenticationPage = () => {
  return (
    <div className='w-5/6 sm:w-[75%] md:w-[60%] mx-auto pt-16'>
      <AuthForm />
    </div>
  );
};

export default AuthenticationPage;

export const authAction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'register') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    dateOfBirth: data.get('dateOfBirth'),
    phoneNumber: data.get('phoneNumber'),
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:8080/auth/' + mode, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(authData),
  });

  if (response.status === 500) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  const user = await response.json();
  console.log(user);

  return redirect('/');
};
