// ** React Imports
import {
  Link,
  // Navigate
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// ** Reactstrap Imports
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

// ** Utils
import { isUserLoggedIn } from '@utils';

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin';

// ** Icons Imports
import { ChevronLeft } from 'react-feather';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import logo from '@src/assets/images/logo/logo.png';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import SpinnerComponent from '../../../@core/components/spinner/Fallback-spinner';

const schema = Yup.object({
  email: Yup.string().email().required('Please Enter your Email'),
}).required();

const ForgotPassword = () => {
  // ** Hooks
  const { skin } = useSkin();

  const history = useHistory();
  // const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const illustration =
      skin === 'dark'
        ? 'forgot-password-v2-dark.svg'
        : 'forgot-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/auth/forgotPassword`,
        data,
      );

      if (res.status === 200) {
        history.push({
          pathname: '/verifyEmail',
          state: { email: res.data.data.email },
        });
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
                Forgot Password?
              </CardTitle>
              <CardText className="mb-2">
                Enter your email and we'll send you instructions to reset your
                password
              </CardText>
              <Form
                className="auth-forgot-password-form mt-2"
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
                {isLoading ? (
                  <Button type="submit" block color="primary">
                    <Spinner size="sm">Loading...</Spinner>
                  </Button>
                ) : (
                  <Button color="primary" block type="submit">
                    Send reset link
                  </Button>
                )}
              </Form>
              <p className="text-center mt-2">
                <Link to="/login">
                  <ChevronLeft className="rotate-rtl me-25" size={14} />
                  <span className="align-middle">Back to login</span>
                </Link>
              </p>
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ForgotPassword;
