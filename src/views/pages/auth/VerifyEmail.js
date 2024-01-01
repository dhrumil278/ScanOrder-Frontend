// ** React Imports
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

// ** Styles
import '@styles/react/pages/page-authentication.scss';
import logo from '@src/assets/images/logo/logo.png';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';

const VerifyEmailBasic = () => {
  const location = useLocation();
  const { email } = location.state;
  return (
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
              Verify your email
            </CardTitle>
            <CardText className="mb-2">
              We've sent a link to your email address:{' '}
              <span className="fw-bolder">{email}</span> Please follow the link
              inside to continue.
            </CardText>
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
  );
};

export default VerifyEmailBasic;
