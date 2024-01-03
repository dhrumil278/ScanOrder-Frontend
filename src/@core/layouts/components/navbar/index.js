// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Custom Components
import NavbarUser from './NavbarUser';

// ** Third Party Components
import { Menu } from 'react-feather';

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;

  const [token, setToken] = useState('');
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
    // getUserdata();
    console.log('API CALL!!');
  });
  const getUserdata = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/user/getUserProfile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.status === 200) {
        setUserProfile(res.data.data);
      }
    } catch (error) {
      console.log('error: ', error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Fragment>
      <Toaster />
      <ul className="navbar-nav d-xl-none">
        <NavItem className="mobile-menu me-auto d-flex align-items-center">
          <NavLink
            className="nav-menu-main menu-toggle hidden-xs is-active"
            onClick={() => setMenuVisibility(true)}
          >
            <Menu className="ficon" />
          </NavLink>
        </NavItem>
      </ul>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  );
};

export default ThemeNavbar;
