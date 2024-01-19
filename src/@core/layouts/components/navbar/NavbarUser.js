// ** React Imports
import { Fragment } from 'react';

// ** Dropdowns Imports
import UserDropdown from './UserDropdown';

// ** Third Party Components
import { Sun, Moon } from 'react-feather';

// ** Reactstrap Imports
import { Badge, NavItem, NavLink } from 'reactstrap';
import { Bell } from 'react-feather';
import { IoCartOutline } from 'react-icons/io5';

const NavbarUser = (props) => {
  // ** Props
  const { skin, setSkin, userProfile } = props;

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className="ficon" onClick={() => setSkin('light')} />;
    } else {
      return <Moon className="ficon" onClick={() => setSkin('dark')} />;
    }
  };

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavItem className="d-none d-lg-block">
          <NavLink className="nav-link-style">
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </div>
      <ul className="nav navbar-nav align-items-center ms-auto">
        {/* <Bell  /> */}
        <div>
          <IoCartOutline
            size={24}
            style={{ marginRight: '5px' }}
            onClick={() => console.log('clicked')}
          />
          {/* <Badge
            color="primary"
            pill
            style={{
              padding: '2px 5px',
              fontSize: '9px',
              position: 'relative',
              zIndex: '9',
            }}
          >
            2
          </Badge> */}
        </div>
        <UserDropdown userProfile={userProfile} />
      </ul>
    </Fragment>
  );
};
export default NavbarUser;
