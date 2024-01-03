// ** React Imports
import { Link } from 'react-router-dom';

// ** Icons Imports
import { ChevronLeft, Eye, EyeOff, FastForward } from 'react-feather';

// ** Custom Components
import InputPassword from '@components/input-password-toggle';
import toast, { Toaster } from 'react-hot-toast';
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
  InputGroup,
  InputGroupText,
  Input,
} from 'reactstrap';

// ** Styles
import logo from '@src/assets/images/logo/logo.png';
import '@styles/react/pages/page-authentication.scss';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import SpinnerComponent from '../../../@core/components/spinner/Fallback-spinner';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object({
  password: Yup.string().required('Required'),
  confpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must be same')
    .required('Required'),
}).required();

const ResetPasswordBasic = () => {
  // const [newpassword, setNewPassword] = useState('');
  // const [confirmpassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newPassVisibility, setNewPassVisibility] = useState(false);
  const [confPassVisibility, setConfPassVisibility] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const { token } = location.state;

  const newPassRenderIcon = () => {
    return newPassVisibility ? <Eye size={14} /> : <EyeOff size={14} />;
  };
  const confPassRenderIcon = () => {
    return confPassVisibility ? <Eye size={14} /> : <EyeOff size={14} />;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, []);

  const onSubmit = async (data) => {
    console.log('data: ', data);
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/auth/changeForgotPassword`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.status === 200) {
        localStorage.setItem(
          'accessToken',
          JSON.stringify({ token: res.data?.data?.token }),
        );
        setIsLoading(false);
        history.push('/login');
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
                  <CardTitle tag="h4" className="mb-1">
                    Reset Password
                  </CardTitle>
                  <CardText className="mb-2">
                    Your new password should be different from previously used
                    passwords
                  </CardText>
                  <Form
                    className="auth-reset-password-form mt-2"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="mb-1">
                      <Label className="form-label" for="new-password">
                        New Password
                      </Label>
                      <InputGroup>
                        <Controller
                          name="password"
                          control={control}
                          render={({ field }) => (
                            <Input
                              className="border-end-0"
                              type={newPassVisibility ? 'text' : 'password'}
                              placeholder="------------"
                              {...field}
                            />
                          )}
                        />
                        <InputGroupText
                          className="cursor-pointer"
                          onClick={() =>
                            setNewPassVisibility(!newPassVisibility)
                          }
                        >
                          {newPassRenderIcon()}
                        </InputGroupText>
                      </InputGroup>
                      <p className="text-danger form-label">
                        {errors.password?.message}
                      </p>
                    </div>
                    <div className="mb-1">
                      <Label className="form-label" for="confirm-password">
                        Confirm Password
                      </Label>
                      <InputGroup>
                        <Controller
                          name="confpassword"
                          control={control}
                          render={({ field }) => (
                            <Input
                              className="border-end-0"
                              type={confPassVisibility ? 'text' : 'password'}
                              placeholder="------------"
                              {...field}
                            />
                          )}
                        />
                        <InputGroupText
                          className="cursor-pointer"
                          onClick={() =>
                            setConfPassVisibility(!confPassVisibility)
                          }
                        >
                          {confPassRenderIcon()}
                        </InputGroupText>
                      </InputGroup>
                      <p className="text-danger form-label">
                        {errors.confpassword?.message}
                      </p>
                    </div>
                    {isLoading ? (
                      <Button type="submit" block color="primary">
                        <Spinner size="sm">Loading...</Spinner>
                      </Button>
                    ) : (
                      <Button type="submit" color="primary" block>
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
