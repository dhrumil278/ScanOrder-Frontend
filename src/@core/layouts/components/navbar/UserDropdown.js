// ** React Imports
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// ** Custom Components
import Avatar from '@components/avatar';

// ** Utils
// import { isUserLoggedIn } from '@utils'

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from 'react-feather';

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';

const UserDropdown = () => {
  // const { userProfile } = props;
  // ** State
  // const [userData] = useState(null);
  const history = useHistory();
  //** ComponentDidMount

  const [token, setToken] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
    getUserdata();
  }, []);
  const getUserdata = async () => {
    if (token) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/user/getUser`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (res.status === 200) {
          setUserProfile(res.data.data);
        }
      } catch (error) {
        if (error.response.status === 403) {
          localStorage.removeItem('accessToken');
          history.push('/login');
        }
      }
    }
  };
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    history.push('/login');
  };

  //** Vars

  const userAvatar = (userProfile && userProfile.avatar) || defaultAvatar;

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem
          tag={Link}
          to="/myprofile"
          // onClick={(e) => e.preventDefault()}
        >
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        {/* <DropdownItem
          tag="a"
          href="/apps/email"
          onClick={(e) => e.preventDefault()}
        >
          <Mail size={14} className="me-75" />
          <span className="align-middle">Inbox</span>
        </DropdownItem> */}
        {/* <DropdownItem
          tag="a"
          href="/apps/todo"
          onClick={(e) => e.preventDefault()}
        >
          <CheckSquare size={14} className="me-75" />
          <span className="align-middle">Tasks</span>
        </DropdownItem> */}
        {/* <DropdownItem tag='a' href='/apps/chat' onClick={e => e.preventDefault()}>
          <MessageSquare size={14} className='me-75' />
          <span className='align-middle'>Chats</span>
        </DropdownItem> */}
        <DropdownItem divider />
        <DropdownItem
          tag={Link}
          to="/accountsetting"
          // onClick={(e) => e.preventDefault()}
        >
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem>
        {/* <DropdownItem tag='a' href='/pages/pricing' onClick={e => e.preventDefault()}>
          <CreditCard size={14} className='me-75' />
          <span className='align-middle'>Pricing</span>
        </DropdownItem> */}
        {/* <DropdownItem tag='a' href='/pages/faq' onClick={e => e.preventDefault()}>
          <HelpCircle size={14} className='me-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem> */}
        <DropdownItem tag={Link} to="/login">
          <Power size={14} className="me-75" />
          <span className="align-middle" onClick={handleLogout}>
            Logout
          </span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
