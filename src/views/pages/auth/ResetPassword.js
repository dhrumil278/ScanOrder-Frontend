// ** React Imports
import { Link } from 'react-router-dom';

// ** Icons Imports
import { ChevronLeft, FastForward } from 'react-feather';

// ** Custom Components
import InputPassword from '@components/input-password-toggle';
import { ToastContainer, toast } from 'react-toastify';
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  Label,
  Button,
  Spinner,
} from 'reactstrap';

// ** Styles
import logo from '@src/assets/images/logo/logo.png';
import '@styles/react/pages/page-authentication.scss';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import SpinnerComponent from '../../../@core/components/spinner/Fallback-spinner';
import axios from 'axios';

const ResetPasswordBasic = () => {
  const [newpassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const { token } = location.state;

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/auth/changeForgotPassword`,
        { password: newpassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.status === 200) {
        localStorage.setItem(
          'accessToken',
          JSON.stringify({ token: res.data.data.token }),
        );
        setIsLoading(false);
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
          <div className="auth-wrapper auth-basic px-2">
            <div className="auth-inner my-2">
              <Card className="mb-0">
                <CardBody>
                  <Link
                    className="d-flex align-items-center brand-logo"
                    to="/"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img src={logo} width={50} height={50} alt="logo icon" />
                    <h2 className="brand-text text-primary ms-1 fs-1 m-0 fw-bolder">
                      ScanOrder
                    </h2>
                  </Link>
                  <CardTitle tag="h4" className="mb-1">
                    Reset Password
                  </CardTitle>
                  <CardText className="mb-2">
                    Your new password should be different from previously used
                    passwords
                  </CardText>
                  <Form
                    className="auth-reset-password-form mt-2"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="mb-1">
                      <Label className="form-label" for="new-password">
                        New Password
                      </Label>
                      <InputPassword
                        className="input-group-merge"
                        id="new-password"
                        autoFocus
                        value={newpassword}
                        placeholder="***********"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-1">
                      <Label className="form-label" for="confirm-password">
                        Confirm Password
                      </Label>
                      <InputPassword
                        className="input-group-merge"
                        id="confirm-password"
                        value={confirmpassword}
                        placeholder="***********"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {isLoading ? (
                      <Button type="submit" block color="primary">
                        <Spinner size="sm">Loading...</Spinner>
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        block
                        onClick={handleResetPassword}
                        disabled={
                          confirmpassword.trim() === '' ||
                          newpassword.trim() === ''
                        }
                      >
                        Set New Password
                      </Button>
                    )}
                  </Form>
                  <p className="text-center mt-2">
                    <Link to="/pages/login-basic">
                      <ChevronLeft className="rotate-rtl me-25" size={14} />
                      <span className="align-middle">Back to login</span>
                    </Link>
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPasswordBasic;
