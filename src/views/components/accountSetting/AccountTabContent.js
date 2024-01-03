// ** React Imports
import { useEffect, useState } from 'react';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  Spinner,
} from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const schema = Yup.object({
  firstname: Yup.string().required('firstname required!'),
  lastname: Yup.string().required('lastname required!'),
  email: Yup.string().email().required('email required!'),
  phone: Yup.number().required('phone required!'),
  address: Yup.string().required('address required!'),
  city: Yup.string().required('city required!'),
  state: Yup.string().required('state required!'),
  zipcode: Yup.string().required('zipcode required!'),
  country: Yup.string().required('country required!'),
}).required();

const AccountTabs = ({ data }) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ** States
  const [token, setToken] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [avatar, setAvatar] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
    getUserdata();
  }, []);
  const getUserdata = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API}/user/getUserProfile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log('res: ', res);
      if (res.status === 200) {
        setUserProfile(res.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error: ', error);
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    console.log('data: ', data);
    try {
      setSubmitLoader(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/updateProfile`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log('res: ', res);
      if (res.status === 200) {
        setUserProfile(res.data.data);
        setSubmitLoader(false);
      }
    } catch (error) {
      console.log('error: ', error);
      setSubmitLoader(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <Skeleton
            circle={true}
            width={100}
            height={100}
            style={{ marginBottom: '15px' }}
          />
          <Skeleton count={10} height={35} style={{ marginBottom: '15px' }} />
        </div>
      ) : (
        <Card>
          <CardHeader className="border-bottom">
            <CardTitle tag="h4">Profile Details</CardTitle>
          </CardHeader>
          <CardBody className="py-2 my-25">
            <div className="d-flex">
              <div className="me-25">
                <img
                  className="rounded me-50"
                  src={avatar}
                  alt="Generic placeholder image"
                  height="100"
                  width="100"
                />
              </div>
              <div className="d-flex align-items-end mt-75 ms-1">
                <div>
                  <Button
                    tag={Label}
                    className="mb-75 me-75"
                    size="sm"
                    color="primary"
                  >
                    Upload
                    <Input type="file" hidden accept="image/*" />
                  </Button>
                  <Button className="mb-75" color="secondary" size="sm" outline>
                    Reset
                  </Button>
                  <p className="mb-0">
                    Allowed JPG, GIF or PNG. Max size of 800kB
                  </p>
                </div>
              </div>
            </div>
            <Form className="mt-2 pt-50" onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="firstName">
                    First Name
                  </Label>
                  <Controller
                    name="firstname"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder=""
                        defaultValue={userProfile?.firstname}
                        {...field}
                      />
                    )}
                  />
                  <p className="text-danger form-label">
                    {errors.firstname?.message}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="lastName">
                    Last Name
                  </Label>
                  <Controller
                    name="lastname"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder=""
                        defaultValue={userProfile?.lastname}
                        {...field}
                      />
                    )}
                  />
                  <p className="text-danger form-label">
                    {errors.lastname?.message}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="emailInput">
                    E-mail
                  </Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder=""
                        defaultValue={userProfile?.email}
                        {...field}
                        disabled
                      />
                    )}
                  />
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="phNumber">
                    Phone Number
                  </Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder=""
                        defaultValue={userProfile?.phone}
                        {...field}
                      />
                    )}
                  />
                  <p className="text-danger form-label">
                    {errors.phone?.message}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="address">
                    Address
                  </Label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder=""
                        defaultValue={userProfile?.address}
                        {...field}
                      />
                    )}
                  />
                  <p className="text-danger form-label">
                    {errors.address?.message}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="accountState">
                    City
                  </Label>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder=""
                        defaultValue={userProfile?.city}
                        {...field}
                      />
                    )}
                  />
                  <p className="text-danger form-label">
                    {errors.city?.message}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="accountState">
                    State
                  </Label>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder=""
                        defaultValue={userProfile?.state}
                        {...field}
                      />
                    )}
                  />
                  <p className="text-danger form-label">
                    {errors.state?.message}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="zipCode">
                    Zip Code
                  </Label>
                  <Controller
                    name="zipcode"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder=""
                        defaultValue={userProfile?.zipcode}
                        {...field}
                      />
                    )}
                  />
                  <p className="text-danger form-label">
                    {errors.zipcode?.message}
                  </p>
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="country">
                    Country
                  </Label>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder=""
                        defaultValue={userProfile?.country}
                        {...field}
                      />
                    )}
                  />
                  <p className="text-danger form-label">
                    {errors.country?.message}
                  </p>
                </Col>
                <Col className="mt-2" sm="12">
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
      )}
      {/* <DeleteAccount /> */}
    </>
  );
};

export default AccountTabs;
