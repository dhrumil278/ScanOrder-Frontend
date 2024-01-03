// ** React Imports
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Form,
  Label,
  Spinner,
} from 'reactstrap';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import logo from '@src/assets/images/logo/logo.png';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import OtpInput from 'react-otp-input';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const email = '';

const VerifyEmailBasic = () => {
  const location = useLocation();
  const history = useHistory();

  const { email, api, token } = location.state;

  console.log('token: ', token);
  console.log('api: ', api);
  console.log('email: ', email);

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePaste = (event) => {
    const data = event.clipboardData.getData('text');
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('otp: ', otp);
    try {
      setIsLoading(true);
      let res;
      if (api === 'emailVerification') {
        res = await axios.post(
          `${process.env.REACT_APP_API}/user/auth/emailVerification`,
          { otp: otp, token: token },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.status === 200) {
          history.push({
            pathname: '/home',
            state: { userData: res.data.data },
          });
        }
      } else {
        res = await axios.post(
          `${process.env.REACT_APP_API}/user/auth/verifyForgotEmail`,
          { otp: otp, token: token },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.status === 200) {
          history.push({
            pathname: '/resetpassword',
            state: { token: res.data.data.accessToken },
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error: ', error);
      toast.error(error.response.data.message);
      history.push('/login');
    }
  };
  return (
    <>
      <Toaster />
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
              <CardTitle tag="h2" className="fw-bolder mb-1">
                Verify your email by OTP
              </CardTitle>
              <CardText className="mb-2">
                We've sent an otp to your email address:{' '}
                <span className="fw-bolder">{email}</span> Please provide the
                otp to continue the process.
              </CardText>
              <Form
                className="auth-forgot-password-form mt-2"
                onSubmit={handleSubmit}
              >
                <div className="mb-1">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>&nbsp;</span>}
                    renderInput={(props) => <input {...props} />}
                    onPaste={handlePaste}
                    inputType="tel"
                    containerStyle={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '5px',
                      paddingBottom: '15px',
                    }}
                    inputStyle={{
                      width: '100%',
                      minHeight: '46px',
                      border: '2px solid #7367f0',
                      borderRadius: '5px',
                      fontFamily: "'Marhey', sans-serif",
                      fontWeight: '500',
                    }}
                  />
                </div>
                {isLoading ? (
                  <Button type="submit" block color="primary">
                    <Spinner size="sm">Loading...</Spinner>
                  </Button>
                ) : (
                  <Button color="primary" block type="submit" disabled={!otp}>
                    Submit OTP
                  </Button>
                )}
              </Form>
              <p className="text-center mt-2">
                <span>Didn't receive an email? </span>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  <span>Resend</span>
                </a>
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailBasic;
