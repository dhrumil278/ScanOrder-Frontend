import { useSkin } from '@hooks/useSkin';
import { Link } from 'react-router-dom';
import logo from '@src/assets/images/logo/logo.png';
import { Facebook, Twitter, Mail, GitHub } from 'react-feather';
import InputPasswordToggle from '@components/input-password-toggle';
import axios from 'axios';
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  Spinner,
} from 'reactstrap';
import '@styles/react/pages/page-authentication.scss';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import SpinnerComponent from '../../../@core/components/spinner/Fallback-spinner';
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';

const LoginCover = () => {
  const { skin } = useSkin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default;

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      history.push('/home');
    }
    // toast.error('This is an Erro');
  }, []);

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log({ email, password });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/auth/login`,
        { email, password },
      );
      if (res.status === 200) {
        localStorage.setItem('accessToken', res.data.data.token);
        history.push('/home');
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error: ', error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="auth-wrapper auth-cover">
        <Row className="auth-inner m-0">
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
          <Col
            className="d-none d-lg-flex align-items-center p-5"
            lg="8"
            sm="12"
          >
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img className="img-fluid" src={source} alt="Login Cover" />
            </div>
          </Col>
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
          >
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
              <CardTitle tag="h2" className="fw-bold mb-1">
                Welcome to ScanOrder!
              </CardTitle>
              <CardText className="mb-2">
                Please sign-in to your account and make your Orders.
              </CardText>
              <Form
                className="auth-login-form mt-2"
                onSubmit={(e) => handleLogin(e)}
              >
                <div className="mb-1">
                  <Label className="form-label" for="login-email">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="login-email"
                    placeholder="john@example.com"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="mb-1">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label" for="login-password">
                      Password
                    </Label>
                    <Link to="/forgotPassword">
                      <small>Forgot Password?</small>
                    </Link>
                  </div>
                  <InputPasswordToggle
                    className="input-group-merge"
                    id="login-password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-check mb-1">
                  <Input type="checkbox" id="remember-me" />
                  <Label className="form-check-label" for="remember-me">
                    Remember Me
                  </Label>
                </div>
                {isLoading ? (
                  <Button type="submit" block color="primary">
                    <Spinner size="sm">Loading...</Spinner>
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    tag={Link}
                    block
                    onClick={handleLogin}
                    disabled={email.trim() === '' || password.trim() === ''}
                  >
                    Sign in
                  </Button>
                )}
              </Form>
              <p className="text-center mt-2">
                <span className="me-25">New on our platform?</span>
                <Link to="/register">
                  <span>Create an account</span>
                </Link>
              </p>
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LoginCover;
{
  /* <div className='divider my-2'>
                        <div className='divider-text'>or</div>
                <     /div>
                      <div className='auth-footer-btn d-flex justify-content-center'>
                        <Button color='facebook'>
                          <Facebook size={14} />
                        </Button>
                        <Button color='twitter'>
                          <Twitter size={14} />
                        </Button>
                        <Button color='google'>
                          <Mail size={14} />
                        </Button>
                        <Button className='me-0' color='github'>
                          <GitHub size={14} />
                        </Button>
                      </div> */
}
