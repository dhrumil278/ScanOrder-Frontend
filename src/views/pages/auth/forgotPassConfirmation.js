// ** React Imports
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// ** Reactstrap Imports

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import SpinnerComponent from '../../../@core/components/spinner/Fallback-spinner';

const forgotPasswordConfirmation = () => {
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  useEffect(() => {
    setIsLoading(true);
    const param = searchParams.get('token');
    if (param) {
      forgotpassVerify(param);
    }
  }, []);

  const forgotpassVerify = async (token) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/auth/verifyForgotEmail`,
        { token },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.status === 200) {
        localStorage.setItem('accessToken', res.data.data.token);
        setIsLoading(false);
        history.push({
          pathname: '/resetpassword',
          state: { token: res.data.data.token },
        });
        // history.push('/resetpassword');
      }
    } catch (error) {
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

export default forgotPasswordConfirmation;
