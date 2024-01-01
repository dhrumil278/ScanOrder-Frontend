// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Third Party Components
import axios from 'axios';

// ** Custom Components
import UILoader from '@components/ui-loader';
import Breadcrumbs from '@components/breadcrumbs';

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap';

// ** Demo Components
import ProfileHeader from '../components/profile/ProfileHeader';

// ** Styles
import '@styles/react/pages/page-profile.scss';

const Profile = () => {
  // ** States
  //   const [data, setData] = useState(null);
  const [block, setBlock] = useState(false);

  const data = {
    header: {
      avatar: require('@src/assets/images/portrait/small/avatar-s-2.jpg')
        .default,
      username: 'Kitty Allanson',
      designation: 'UI/UX Designer',
      coverImg: require('@src/assets/images/profile/user-uploads/timeline.jpg')
        .default,
    },
    userAbout: {
      about:
        'Tart I love sugar plum I love oat cake. Sweet ⭐️ roll caramels I love jujubes. Topping cake wafer.',
      joined: 'November 15, 2015',
      lives: 'New York, USA',
      email: 'bucketful@fiendhead.org',
      website: 'www.pixinvent.com',
    },
  };
  const handleBlock = () => {
    setBlock(true);
    setTimeout(() => {
      setBlock(false);
    }, 2000);
  };

  return (
    <Fragment>
      <Breadcrumbs
        title="Profile"
        data={[{ title: 'Pages' }, { title: 'Profile' }]}
      />
      {data !== null ? (
        <div id="user-profile">
          <Row>
            <Col sm="12">
              <ProfileHeader data={data.header} />
            </Col>
          </Row>
          {/* <section id="profile-info">
            <Row>
              <Col
                lg={{ size: 3, order: 1 }}
                sm={{ size: 12 }}
                xs={{ order: 2 }}
              >
                <ProfileAbout data={data.userAbout} />
              </Col>
              <Col
                lg={{ size: 6, order: 2 }}
                sm={{ size: 12 }}
                xs={{ order: 1 }}
              ></Col>
              <Col
                lg={{ size: 3, order: 3 }}
                sm={{ size: 12 }}
                xs={{ order: 3 }}
              ></Col>
            </Row>
            <Row>
              <Col className="text-center" sm="12">
                <Button
                  color="primary"
                  className="border-0 mb-1 profile-load-more"
                  size="sm"
                  onClick={handleBlock}
                >
                  <UILoader
                    blocking={block}
                    overlayColor="rgba(255,255,255, .5)"
                  >
                    <span> Load More</span>
                  </UILoader>
                </Button>
              </Col>
            </Row>
          </section> */}
        </div>
      ) : null}
    </Fragment>
  );
};

export default Profile;
