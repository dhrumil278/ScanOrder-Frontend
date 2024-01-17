// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Spinner,
} from 'reactstrap';

// ** Third Party Components
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle';
import { Eye, EyeOff } from 'react-feather';

// ** Demo Components
// import ApiKeysList from './ApiKeysList';
// import CreateApiKey from './CreateApikey';
// import TwoFactorAuth from './TwoFactorAuth';
// import RecentDevices from './RecentDevices';

const schema = Yup.object({
  password: Yup.string().required('password required!'),
  newPassword: Yup.string().required('newPassword required!'),
  confNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must be same')
    .required('confNewPassword required!'),
}).required();

const SecurityTabContent = () => {
  const [token, setToken] = useState([]);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [newPassVisibility, setNewPassVisibility] = useState(false);
  const [confNewPassVisibility, setConfNewPassVisibility] = useState(false);

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const renderIcon = (flag) => {
    return flag ? <Eye size={14} /> : <EyeOff size={14} />;
  };

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitLoader(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/userPasswordChanged`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.status === 200) {
        setSubmitLoader(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      setSubmitLoader(false);
    }
  };

  return (
    <>
      <Toaster />
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Change Password</CardTitle>
        </CardHeader>
        <CardBody className="pt-1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="password">
                  Current Password
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
                    {renderIcon(visibility)}
                  </InputGroupText>
                </InputGroup>
                <p className="text-danger form-label">
                  {errors.password?.message}
                </p>
              </Col>
            </Row>
            <Row>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="newPassword">
                  New Password
                </Label>
                <InputGroup>
                  <Controller
                    name="newPassword"
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
                    onClick={() => setNewPassVisibility(!newPassVisibility)}
                  >
                    {renderIcon(newPassVisibility)}
                  </InputGroupText>
                </InputGroup>
                <p className="text-danger form-label">
                  {errors.newPassword?.message}
                </p>
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="confNewPassword">
                  Confirm New Password
                </Label>
                <InputGroup>
                  <Controller
                    name="confNewPassword"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="border-end-0"
                        type={confNewPassVisibility ? 'text' : 'password'}
                        placeholder="------------"
                        {...field}
                      />
                    )}
                  />
                  <InputGroupText
                    className="cursor-pointer"
                    onClick={() =>
                      setConfNewPassVisibility(!confNewPassVisibility)
                    }
                  >
                    {renderIcon(confNewPassVisibility)}
                  </InputGroupText>
                </InputGroup>
                <p className="text-danger form-label">
                  {errors.confNewPassword?.message}
                </p>
              </Col>
              <Col xs={12}>
                <p className="fw-bolder">Password requirements:</p>
                <ul className="ps-1 ms-25">
                  <li className="mb-50">
                    Minimum 8 characters long - the more, the better
                  </li>
                  <li className="mb-50">At least one lowercase character</li>
                  <li>At least one number, symbol, or whitespace character</li>
                </ul>
              </Col>
              <Col className="mt-1" sm="12">
                {submitLoader ? (
                  <Button
                    type="submit"
                    className="me-1 mb-1"
                    block
                    color="primary"
                  >
                    <Spinner size="sm">Loading...</Spinner>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="me-1 mb-1"
                    block
                    color="primary"
                  >
                    Save changes
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default SecurityTabContent;
