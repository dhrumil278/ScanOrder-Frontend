// ** React Imports
import { useEffect, useState } from 'react';

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
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfileHeader = () => {
  // ** States
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    setToken(accessToken);

    getUserdata(accessToken);
  }, []);

  const getUserdata = async (accessToken) => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API}/user/getUser`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (res.status === 200) {
        setUserProfile(res.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error: ', { error });
      setIsLoading(false);
    }
  };

  const toggleTab = (data) => {
    setActiveTab(data);
  };

  return (
    <>
      <Card className="profile-header mb-2">
        <div
          style={{
            height: '90px',
            background:
              'linear-gradient(90deg, rgba(184,180,247,1) 21%, rgba(115,103,240,1) 87%)',
          }}
          top
        ></div>
        <div className="position-relative">
          <div className="profile-img-container d-flex align-items-center">
            <div className="profile-img">
              <img
                className="rounded img-fluid"
                style={{ maxWidth: '92px', height: '92px' }}
                src={
                  userProfile?.avatar
                    ? userProfile?.avatar
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                }
                alt="Card image"
              />
            </div>
            <div className="profile-title ms-1">
              <h2 className="text-white">{userProfile?.username}</h2>
              <p className="text-white">{userProfile?.email}</p>
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
          {isLoading ? (
            <Skeleton height={40} count={10} style={{ marginBottom: '5px' }} />
          ) : (
            <>
              {}
              <ProfileAbout userProfile={userProfile} />
            </>
          )}
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
