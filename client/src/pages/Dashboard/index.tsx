import React, { useState } from 'react';
import * as Styled from './styles';
import { MenuBar } from '../../components/MenuBar';
import Home from './Home';
import Bookings from './Bookings';
import Announcements from './Announcements';
import Requests from './Requests';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  let ContentComponent;

  switch (activeTab) {
    case 'home':
      ContentComponent = Home;
      break;
    case 'bookings':
      ContentComponent = Bookings;
      break;
    case 'announcements':
      ContentComponent = Announcements;
      break;
    case 'requests':
      ContentComponent = Requests;
      break;
    default:
      ContentComponent = Home;
  }

  return (
    <Styled.DashboardContainer>
      <Styled.MenuBarContainer>
        <MenuBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Styled.MenuBarContainer>
      <Styled.ContentContainer>
        <ContentComponent />
      </Styled.ContentContainer>
    </Styled.DashboardContainer>
  );
};

export default Dashboard;
