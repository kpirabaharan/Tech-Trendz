import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useNavigation,
} from 'react-router-dom';

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <Form method='POST' className=''>
      <div className='py-2'>
        <h1 className='text-4xl font-roboto font-bold'>
          {isLogin ? 'Sign In' : 'Register'}
        </h1>
      </div>

      <div className='flex flex-col gap-8 py-8'>
        {!isLogin && (
          <div className='flex flex-col gap-8 sm:gap-0 sm:flex-row'>
            <div className='relative z-0 basis-1/2'>
              <input
                type='text'
                id='firstName'
                name='firstName'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
              />
              <label
                htmlFor='firstName'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                First Name
              </label>
            </div>

            <div className='relative z-0 basis-1/2'>
              <input
                type='text'
                id='lastName'
                name='lastName'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
              />
              <label
                htmlFor='lastName'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Last Name
              </label>
            </div>
          </div>
        )}

        {!isLogin && (
          <div className='relative z-0'>
            <input
              type='date'
              id='dateOfBirth'
              name='dateOfBirth'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
            />
            <label
              htmlFor='dateOfBirth'
              className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Date-of-Birth
            </label>
          </div>
        )}
        {!isLogin && (
          <div className='relative z-0'>
            <input
              type='tel'
              id='phoneNumber'
              name='phoneNumber'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
            />
            <label
              htmlFor='phoneNumber'
              className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Phone Number
            </label>
          </div>
        )}
        <div className='relative z-0'>
          <input
            type='email'
            id='email'
            name='email'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
          />
          <label
            htmlFor='email'
            className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Email
          </label>
        </div>
        <div className='relative z-0'>
          <input
            type='password'
            id='password'
            name='password'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
          />
          <label
            htmlFor='password'
            className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Password
          </label>
        </div>
      </div>

      <div className='flex flex-row justify-between'>
        <Link to={`?mode=${isLogin ? 'register' : 'login'}`}>
          <p className='underline'>
            {isLogin ? 'Register Instead' : 'Sign In Instead'}
          </p>
        </Link>
        <button
          className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded'
          type='submit'
        >
          {isLogin ? 'Sign In' : 'Register'}
        </button>
      </div>
    </Form>
  );
};

export default AuthForm;
