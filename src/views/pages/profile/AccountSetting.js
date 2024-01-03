// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Third Party Components
import axios from 'axios';

// ** Reactstrap Imports
import {
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { User, Lock } from 'react-feather';

// ** Demo Components
import Breadcrumbs from '@components/breadcrumbs';

import Tabs from '../../components/accountSetting/Tabs';
// import BillingTabContent from './BillingTabContent'
import AccountTabContent from '../../components/accountSetting/AccountTabContent';
import SecurityTabContent from '../../components/accountSetting/SecurityTabContent';
import ConnectionsTabContent from '../../components/accountSetting/ConnectionsTabContent';
import NotificationsTabContent from '../../components/accountSetting/NotificationsTabContent';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/pages/page-account-settings.scss';

const data = {
  general: {
    avatar: require('@src/assets/images/portrait/small/avatar-s-11.jpg')
      .default,
    username: 'johndoe',
    fullName: 'John Doe',
    email: 'granger007@hogward.com',
    company: 'PIXINVENT',
  },
  info: {
    bio: '',
    dob: null,
    country: 'USA',
    website: '',
    phone: 6562542568,
  },
  social: {
    socialLinks: {
      twitter: 'https://www.twitter.com',
      facebook: '',
      google: '',
      linkedIn: 'https://www.linkedin.com',
      instagram: '',
      quora: '',
    },
  },
};
const AccountSettings = () => {
  // ** States
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = (data) => {
    console.log('set the active tab as', data);
    setActiveTab(data);
  };

  return (
    <Fragment>
      <Breadcrumbs
        title="Account Settings"
        data={[{ title: 'Pages' }, { title: 'Account Settings' }]}
      />
      {data !== null ? (
        <Row>
          <Col xs={12}>
            <Nav pills className="mb-2">
              <NavItem>
                <NavLink
                  active={activeTab === '1'}
                  onClick={() => toggleTab('1')}
                >
                  <User size={18} className="me-50" />
                  <span className="fw-bold">Account</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeTab === '2'}
                  onClick={() => toggleTab('2')}
                >
                  <Lock size={18} className="me-50" />
                  <span className="fw-bold">Security</span>
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <AccountTabContent data={data.general} />
              </TabPane>
              <TabPane tabId="2">
                <SecurityTabContent />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  );
};

export default AccountSettings;
