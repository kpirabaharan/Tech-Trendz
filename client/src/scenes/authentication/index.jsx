import AuthForm from '../../components/AuthForm';

const AuthenticationPage = () => {
  return (
    <div className='h-[calc(100vh-115px)] sm:h-[calc(100vh-63px)]'>
      <div className='w-5/6 sm:w-[75%] md:w-[60%] mx-auto pt-16'>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthenticationPage;
