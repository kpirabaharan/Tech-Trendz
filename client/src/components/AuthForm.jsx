import { useDispatch } from 'react-redux';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { object, string, date } from 'yup';
import { subYears } from 'date-fns';

import { setLogin } from '../state/user-slice';

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phoneNumber: '',
  email: '',
  password: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};

const registerSchema = object({
  firstName: string().required('Invalid First Name'),
  lastName: string().required('Invalid Last Name'),
  dateOfBirth: date()
    .required('Date of Birth Required')
    .max(subYears(new Date(), 13)),
  phoneNumber: string()
    .required('Invalid Phone Number')
    .matches(/^[0-9]+$/, 'Must be Only digits')
    .min(10, 'Must be Exactly 10 Digits')
    .max(10, 'Must be Exactly 10 Digits'),
  email: string().email('Invalid Email').required('Invalid Email'),
  password: string()
    .required('Invalid Password')
    .min(5, 'Must Have At Least 5 Characters!'),
});

const loginSchema = object({
  email: string().email('Invalid Email').required('Invalid Email'),
  password: string()
    .required('Invalid Password')
    .min(5, 'Must Have At Least 5 Characters!'),
});

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  const login = async (values, onSubmitProps) => {
    const response = await fetch(`http://localhost:8080/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw json({ message: 'Could not login!' }, { status: 500 });
    } else {
      const { user, token } = await response.json();
      dispatch(setLogin({ user, token }));
      onSubmitProps.resetForm();
      if (user) {
        navigate('/');
      }
    }
  };

  const register = async (values, onSubmitProps) => {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const responseData = await response.json();

    onSubmitProps.resetForm();

    if (responseData) {
      navigate('/auth?mode=login');
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      await login(values, onSubmitProps);
    }
    if (!isLogin) {
      await register(values, onSubmitProps);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
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
                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                      errors.firstName && touched.firstName
                        ? 'border-red-700'
                        : 'border-gray-600'
                    } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    id='firstName'
                    name='firstName'
                    type='text'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    placeholder=''
                  />
                  {errors.firstName && touched.firstName && (
                    <span className='flex items-center font-medium tracking-wide text-red-700 text-xs mt-1 ml-1'>
                      {errors.firstName}
                    </span>
                  )}
                  <label
                    htmlFor='firstName'
                    className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    First Name
                  </label>
                </div>

                <div className='relative z-0 basis-1/2'>
                  <input
                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                      errors.lastName && touched.lastName
                        ? 'border-red-700'
                        : 'border-gray-600'
                    } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    id='lastName'
                    name='lastName'
                    type='text'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    placeholder=' '
                  />
                  {errors.lastName && touched.lastName && (
                    <span className='flex items-center font-medium tracking-wide text-red-700 text-xs mt-1 ml-1'>
                      {errors.lastName}
                    </span>
                  )}
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
                  className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                    errors.dateOfBirth && touched.dateOfBirth
                      ? 'border-red-700'
                      : 'border-gray-600'
                  } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                  id='dateOfBirth'
                  name='dateOfBirth'
                  type='date'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dateOfBirth}
                  placeholder=' '
                />
                {errors.dateOfBirth && touched.dateOfBirth && (
                  <span className='flex items-center font-medium tracking-wide text-red-700 text-xs mt-1 ml-1'>
                    {errors.dateOfBirth}
                  </span>
                )}
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
                  className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                    errors.phoneNumber && touched.phoneNumber
                      ? 'border-red-700'
                      : 'border-gray-600'
                  } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                  id='phoneNumber'
                  name='phoneNumber'
                  type='tel'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  placeholder=' '
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <span className='flex items-center font-medium tracking-wide text-red-700 text-xs mt-1 ml-1'>
                    {errors.phoneNumber}
                  </span>
                )}
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
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                  errors.email && touched.email
                    ? 'border-red-700'
                    : 'border-gray-600'
                } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                id='email'
                name='email'
                type='email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                placeholder=' '
              />
              {errors.email && touched.email && (
                <span className='flex items-center font-medium tracking-wide text-red-700 text-xs mt-1 ml-1'>
                  {errors.email}
                </span>
              )}
              <label
                htmlFor='email'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Email
              </label>
            </div>
            <div className='relative z-0'>
              <input
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                  errors.password && touched.password
                    ? 'border-red-700'
                    : 'border-gray-600'
                } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                id='password'
                name='password'
                type='password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                placeholder=' '
              />
              {!isLogin && errors.password && touched.password && (
                <span className='flex items-center font-medium tracking-wide text-red-700 text-xs mt-1 ml-1'>
                  {errors.password}
                </span>
              )}
              <label
                htmlFor='password'
                className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Password
              </label>
            </div>
          </div>

          <div className='flex flex-row justify-between'>
            <Link
              to={`?mode=${isLogin ? 'register' : 'login'}`}
              onClick={resetForm}
            >
              <p className='underline hover:text-blue'>
                {isLogin ? 'Register Instead' : 'Sign In Instead'}
              </p>
            </Link>
            <button
              className='bg-transparent hover:text-blue-700 font-semibold hover:text-blue py-2 px-4 border border-gray-500 hover:border-blue rounded'
              type='submit'
            >
              {isLogin ? 'Sign In' : 'Register'}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AuthForm;
