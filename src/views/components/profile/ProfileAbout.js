// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap';

const ProfileAbout = ({ userProfile }) => {
  return (
    <Card>
      <CardBody>
        <h5 className="mb-75">Name</h5>
        <CardText>
          {userProfile?.firstname} {userProfile?.lastname}
        </CardText>
        <div className="mt-2">
          <h5 className="mb-75">Email</h5>
          <CardText>{userProfile?.email}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">Phone:</h5>
          <CardText>{userProfile?.phone}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">Address:</h5>
          <CardText>
            {userProfile?.address}
            {', '}
            {userProfile?.city}
            {', '}
            {userProfile?.state}
            {', '}
            {userProfile?.country}
            {', '}
            {userProfile?.zipcode}
          </CardText>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileAbout;
