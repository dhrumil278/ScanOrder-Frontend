// ** React Imports
import { useContext, useEffect } from 'react';
import {
  Link,
  // useNavigate
} from 'react-router-dom';
import axios from 'axios';
import logo from '@src/assets/images/logo/logo.png';
import toast, { Toaster } from 'react-hot-toast';
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin';
import useJwt from '@src/auth/jwt/useJwt';

// ** Store & Actions
import { useDispatch } from 'react-redux';
import { handleLogin } from '@store/authentication';

// ** Third Party Components
// import { useForm, Controller } from 'react-hook-form';
import { Facebook, Twitter, Mail, GitHub } from 'react-feather';
import { Eye, EyeOff } from 'react-feather';

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
  InputGroup,
  InputGroupText,
} from 'reactstrap';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import SpinnerComponent from '../../../@core/components/spinner/Fallback-spinner';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const defaultValues = {
  email: '',
  username: '',
  password: '',
};

const schema = yup
  .object()
  .shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      // .matches(
      //   '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/',
      //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      // )
      .required(),
  })
  .required();

const Register = () => {
  const [isAgree, setIsAgree] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // ** Hooks
  const ability = useContext(AbilityContext);
  const { skin } = useSkin();
  const history = useHistory();
  const dispatch = useDispatch();

  const renderIcon = () => {
    return visibility ? <Eye size={14} /> : <EyeOff size={14} />;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      history.push('/home');
    }
  }, []);

  const illustration =
      skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/register`,
        data,
      );
      console.log('res: ', res);
      setIsLoading(false);
      if (res.status === 200) {
        localStorage.setItem('email', res.data.data.email);
        history.push({
          pathname: '/verifyEmail',
          state: {
            email: res.data.data.email,
            token: res.data.data.accessToken,
            api: 'emailVerification',
          },
        });
      }
    } catch (error) {
      console.log('error: ', error);
      setIsLoading(false);
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
                Welcome to ScanOrder
              </CardTitle>
              <CardText className="mb-2">Make your orders with fun.</CardText>

              <Form
                action="/"
                onSubmit={handleSubmit(onSubmit)}
                className="auth-register-form mt-2"
              >
                <div className="mb-1">
                  <Label className="form-label" for="register-username">
                    Username
                  </Label>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input type="text" placeholder="john123" {...field} />
                    )}
                  />
                  <p className="text-danger form-label">
                    {errors.username?.message}
                  </p>
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="register-email">
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
                  <Label className="form-label" for="register-password">
                    Password
                  </Label>
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
                    disabled={!isAgree}
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
  );
};

export default Register;
