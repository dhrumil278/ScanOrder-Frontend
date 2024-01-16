import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from 'reactstrap';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const history = useHistory();
  const location = useLocation();
  // let userData = location?.state?.userData
  //   ? location?.state
  //   : JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      history.push('/login');
    }
    // if (userData) {
    //   localStorage.setItem('userData', JSON.stringify(userData));
    // }
  }, []);
  return (
    <>
      <Toaster />
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Kick start your project 🚀</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>All the best for your new project.</CardText>
            <CardText>
              Please make sure to read our{' '}
              <CardLink
                href="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/"
                target="_blank"
              >
                Template Documentation
              </CardLink>{' '}
              to understand where to go from here and how to use our template.
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Want to integrate JWT? 🔒</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>
              We carefully crafted JWT flow so you can implement JWT with ease
              and with minimum efforts.
            </CardText>
            <CardText>
              Please read our{' '}
              <CardLink
                href="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/docs/development/auth"
                target="_blank"
              >
                JWT Documentation
              </CardLink>{' '}
              to get more out of JWT authentication.
            </CardText>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Home;
