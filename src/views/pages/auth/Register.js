// ** React Imports
import { useContext, useEffect } from 'react';
import {
  Link,
  // useNavigate
} from 'react-router-dom';
import axios from 'axios';
import logo from '@src/assets/images/logo/logo.png';
import { ToastContainer, toast } from 'react-toastify';
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin';
import useJwt from '@src/auth/jwt/useJwt';

// ** Store & Actions
import { useDispatch } from 'react-redux';
import { handleLogin } from '@store/authentication';

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form';
import { Facebook, Twitter, Mail, GitHub } from 'react-feather';

// ** Context
import { AbilityContext } from '@src/utility/context/Can';

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle';

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Button,
  Form,
  Input,
  FormFeedback,
  Spinner,
} from 'reactstrap';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import SpinnerComponent from '../../../@core/components/spinner/Fallback-spinner';

const defaultValues = {
  email: '',
  terms: false,
  username: '',
  password: '',
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isAgree, setIsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // ** Hooks
  const ability = useContext(AbilityContext);
  const { skin } = useSkin();
  const history = useHistory();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      history.push('/home');
    }
  }, []);

  const illustration =
      skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const handleRegister = async (e) => {
    console.log('e: ', e);
    e.preventDefault();
    setIsLoading(true);
    console.log({ email, password, username, isAgree });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/register`,
        { email, password, username },
      );
      console.log('res: ', res);
      setIsLoading(false);
      if (res.status === 200) {
        localStorage.setItem('email', res.data.data.email);
        history.push({
          pathname: '/verifyEmail',
          state: { email: res.data.data.email },
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);

      console.log('error: ', error);
      console.log('error: ', error.data.message);
    }
  };
  return (
    <>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <>
          <ToastContainer />
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
                    Welcome to ScanOrder
                  </CardTitle>
                  <CardText className="mb-2">
                    Make your orders with fun.
                  </CardText>

                  <Form action="/" className="auth-register-form mt-2">
                    <div className="mb-1">
                      <Label className="form-label" for="register-username">
                        Username
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        value={username}
                        autoFocus
                        placeholder="johndoe"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      {/* {errors.username ? (
                  <FormFeedback>{errors.username.message}</FormFeedback>
                ) : null} */}
                    </div>
                    <div className="mb-1">
                      <Label className="form-label" for="register-email">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        value={email}
                        type="email"
                        placeholder="john@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {/* {errors.email ? (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                ) : null} */}
                    </div>
                    <div className="mb-1">
                      <Label className="form-label" for="register-password">
                        Password
                      </Label>
                      <InputPasswordToggle
                        id="password"
                        value={password}
                        name="password"
                        type="password"
                        placeholder="**********"
                        className="input-group-merge"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-check mb-1">
                      <Input
                        name="terms"
                        id="terms"
                        type="checkbox"
                        value={isAgree}
                        onChange={(e) => setIsAgree(!isAgree)}
                      />
                      <Label className="form-check-label" for="terms">
                        I agree to
                        <a
                          className="ms-25"
                          href="/"
                          onClick={(e) => e.preventDefault()}
                        >
                          privacy policy & terms
                        </a>
                      </Label>
                    </div>
                    {isLoading ? (
                      <Button type="submit" block color="primary">
                        <Spinner size="sm">Loading...</Spinner>
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        block
                        color="primary"
                        onClick={handleRegister}
                        disabled={
                          email.trim() === '' ||
                          password.trim() === '' ||
                          username.trim() === ''
                        }
                      >
                        Sign up
                      </Button>
                    )}
                  </Form>
                  <p className="text-center mt-2">
                    <span className="me-25">Already have an account?</span>
                    <Link to="/login">
                      <span>Sign in instead</span>
                    </Link>
                  </p>
                  {/* <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div> */}
                </Col>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
