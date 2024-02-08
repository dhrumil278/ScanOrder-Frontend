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
import themeConfig from '@configs/themeConfig';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;
  const history = useHistory();
  const [token, setToken] = useState('');
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
  });
  return (
    <Fragment>
      <Toaster />
      <ul className="nav navbar-nav flex-row">
        <NavItem className="mobile-menu me-auto d-flex align-items-center">
          <NavLink
            to="/"
            className="navbar-brand d-flex align-items-center"
            onClick={() => history.push('/')}
          >
            <span className="brand-logo">
              <img
                src={themeConfig.app.appLogoImage}
                alt="logo"
                width={27}
                height={27}
                style={{
                  marginRight: '5px',
                }}
              />
            </span>
            <h2 className="brand-text mb-0">{themeConfig.app.appName}</h2>
          </NavLink>
        </NavItem>
      </ul>
      {/* <ul className="navbar-nav d-xl-none">
      <NavItem className="mobile-menu me-auto d-flex align-items-center">
          <NavLink
            className="nav-menu-main menu-toggle hidden-xs is-active"
            onClick={() => setMenuVisibility(true)}
          >
            <Menu className="ficon" />
          </NavLink>
        </NavItem>
      </ul> */}
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  );
};

export default ThemeNavbar;
