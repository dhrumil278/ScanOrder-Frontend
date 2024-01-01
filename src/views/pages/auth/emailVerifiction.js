// ** React Imports
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// ** Reactstrap Imports

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import SpinnerComponent from '../../../@core/components/spinner/Fallback-spinner';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';

const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');

  const history = useHistory();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  useEffect(() => {
    setIsLoading(true);
    const param = searchParams.get('token');
    if (param) {
      console.log('param: ', param);
      userVerify(param);
    }
  }, []);

  const userVerify = async (token) => {
    console.log('token: ', token);
    console.log('token: ', typeof token);
    console.log('userVerify called..!');

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/auth/emailVerification`,
        { token: token },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.status === 200) {
        console.log('success Response');
        history.push('/home');
      }
    } catch (error) {
      console.log('error: ', error);
      setIsLoading(false);
      toast.error(error.response.data.message);
      history.push('/login');
    }
  };
  return (
    <>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <>
          <ToastContainer />
          <div className="auth-wrapper auth-basic px-2"></div>
        </>
      )}
    </>
  );
};

export default EmailVerification;
