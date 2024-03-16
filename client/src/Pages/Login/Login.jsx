import { Link, useNavigate } from 'react-router-dom'
import GoogleLogin from '../../Component/Shered/GoogleLogin';
import useAuth from '../../Hooks/useAuth';

const Login = () => {
  const {signin} = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const from = event.target;
    const email = from.email.value;
    const password = from.password.value;
    signin(email,password)
    .then(()=>{
      navigate('/')
    })
  }
    return (
        <div className='flex justify-center items-center min-h-screen'>
        <div className='flex flex-col max-w-md px-6 rounded-md sm:p-10 bg-[#e8f1f1] text-gray-900'>
          <div className='mb-3 text-center'>
            <h1 className='my-2 text-4xl font-bold'>Log In</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className='space-y-6 ng-untouched ng-pristine ng-valid'
          >
            <div className='space-y-2'>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm'>
                  Email address
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  required
                  placeholder='Enter Your Email Here'
                  className='w-full px-3 py-2 border rounded-md border-gray-600 focus:outline-rose-500 bg-gray-200 text-gray-900'
                  data-temp-mail-org='0'
                />
              </div>
              <div>
                <div className='flex justify-between'>
                  <label htmlFor='password' className='text-sm mb-2'>
                    Password
                  </label>
                </div>
                <input
                  type='password'
                  name='password'
                  autoComplete='current-password'
                  id='password'
                  required
                  placeholder='*******'
                  className='w-full px-3 py-2 border rounded-md border-gray-600 focus:outline-rose-500 bg-gray-200 text-gray-900'
                />
              </div>
            </div>
  
            <div>
              <button
                type='submit'
                className='bg-black w-full rounded-md py-3 text-white'
              >
                Continue
              </button>
            </div>
          </form>
          <div className='flex items-center pt-4 space-x-1'>
            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
            <p className='px-3 text-sm text-gray-800'>
              Login with social accounts
            </p>
            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          </div>
          <GoogleLogin/>
          <p className='px-6 text-sm text-center text-gray-600'>
            Don&apos;t have an account yet?{' '}
            <Link
              to='/signup'
              className='hover:underline hover:text-rose-500 text-gray-800'
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    );
};

export default Login;