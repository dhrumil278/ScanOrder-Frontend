// ** React Imports
import { useState } from 'react';

// ** Icons Imports
import { DollarSign, Heart, ShoppingBag, User } from 'react-feather';

// ** Reactstrap Imports
import {
  Card,
  CardImg,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import ProfileAbout from './ProfileAbout';
import PreviousOrders from './PreviousOrders';
import Credits from './Credits';
import Favourites from './Favourites';

const data = {
  header: {
    avatar: require('@src/assets/images/portrait/small/avatar-s-2.jpg').default,
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

const ProfileHeader = () => {
  // ** States
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const toggle = () => setIsOpen(!isOpen);

  const toggleTab = (data) => {
    setActiveTab(data);
  };

  return (
    <>
      <Card className="profile-header mb-2">
        <CardImg src={data.header.coverImg} alt="User Profile Image" top />
        <div className="position-relative">
          <div className="profile-img-container d-flex align-items-center">
            <div className="profile-img">
              <img
                className="rounded img-fluid"
                src={data.header.avatar}
                alt="Card image"
              />
            </div>
            <div className="profile-title ms-3">
              <h2 className="text-white">{data.header.username}</h2>
              <p className="text-white">{data.header.designation}</p>
            </div>
          </div>
        </div>
        <div className="profile-header-nav">
          <Navbar
            container={false}
            className="justify-content-start justify-content-md-between w-100"
            expand="md"
            light
          >
            {/* <Button color="" className="btn-icon navbar-toggler" onClick={toggle}>
            <AlignJustify size={21} />
          </Button> */}
            <div className="profile-tabs d-flex justify-content-between flex-wrap mt-3 mt-md-0">
              <Nav className="mb-0" pills>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={activeTab === '1'}
                    onClick={() => toggleTab('1')}
                  >
                    <span className="d-none d-md-block">About</span>
                    <User className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={activeTab === '2'}
                    onClick={() => toggleTab('2')}
                  >
                    <span className="d-none d-md-block">Orders</span>
                    <ShoppingBag className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={activeTab === '3'}
                    onClick={() => toggleTab('3')}
                  >
                    <span className="d-none d-md-block">Coins</span>
                    <DollarSign className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={activeTab === '4'}
                    onClick={() => toggleTab('4')}
                  >
                    <span className="d-none d-md-block">Favorites</span>
                    <Heart className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
              </Nav>
              {/* <Button color="primary">
              <Edit className="d-block d-md-none" size={14} />
              <span className="fw-bold d-none d-md-block">Edit</span>
            </Button> */}
            </div>
            {/* <Collapse isOpen={isOpen} navbar>
          </Collapse> */}
          </Navbar>
        </div>
      </Card>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <ProfileAbout data={data.userAbout} />
        </TabPane>
        <TabPane tabId="2">
          <PreviousOrders />
        </TabPane>
        <TabPane tabId="3">
          <Credits />
        </TabPane>
        <TabPane tabId="4">
          <Favourites />
        </TabPane>
      </TabContent>
    </>
  );
};

export default ProfileHeader;
