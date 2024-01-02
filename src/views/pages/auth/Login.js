import { useSkin } from '@hooks/useSkin';
import { Link } from 'react-router-dom';
import logo from '@src/assets/images/logo/logo.png';
import { Facebook, Twitter, Mail, GitHub, Eye, EyeOff } from 'react-feather';
import InputPasswordToggle from '@components/input-password-toggle';
import axios from 'axios';
import '@styles/react/pages/page-authentication.scss';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import SpinnerComponent from '../../../@core/components/spinner/Fallback-spinner';
import toast, { Toaster } from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
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
  InputGroupText,
  InputGroup,
} from 'reactstrap';

const schema = Yup.object({
  email: Yup.string().email().required('Please Enter your Email'),
  password: Yup.string().required('Please Enter your Password'),
}).required();

const LoginCover = () => {
  const { skin } = useSkin();
  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [remember, setRemember] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const renderIcon = () => {
    return visibility ? <Eye size={14} /> : <EyeOff size={14} />;
  };

  const history = useHistory();

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default;

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      history.push('/home');
    }
  }, []);

  const onSubmit = async (data) => {
    console.log('data: ', data);
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/auth/login`,
        data,
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
  // const handleLogin = async (e) => {
  //   setIsLoading(true);
  //   e.preventDefault();
  //   console.log({ email, password });
  //
  // };

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
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-1">
                  <Label className="form-label" for="login-email">
                    Email
                  </Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="john@example.com"
                        {...field}
                      />
                    )}
                  />
                  <p className="text-danger form-label">
                    {errors.email?.message}
                  </p>
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
                  <InputGroup>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <Input
                          className="border-end-0"
                          type={visibility ? 'text' : 'password'}
                          placeholder="------------"
                          {...field}
                        />
                      )}
                    />
                    <InputGroupText
                      className="cursor-pointer"
                      onClick={() => setVisibility(!visibility)}
                    >
                      {renderIcon()}
                    </InputGroupText>
                  </InputGroup>
                  <p className="text-danger form-label">
                    {errors.password?.message}
                  </p>
                </div>
                <div className="form-check mb-1">
                  <Input
                    type="checkbox"
                    id="remember-me"
                    value={remember}
                    onClick={(e) => setRemember(!remember)}
                  />
                  <Label className="form-check-label" for="remember-me">
                    Remember Me
                  </Label>
                </div>
                {isLoading ? (
                  <Button type="submit" block color="primary">
                    <Spinner size="sm">Loading...</Spinner>
                  </Button>
                ) : (
                  <Button color="primary" type="submit" block>
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
