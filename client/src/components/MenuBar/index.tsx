import React from 'react';
import * as Styled from './styles';
import HomeIcon from '../../assets/images/houseIcon.png';
import BookingsIcon from '../../assets/images/bookingIcon.png';
import RequestsIcon from '../../assets/images/requestsIcon.png';
import AnnouncementsIcon from '../../assets/images/announcementIcon.png';

type MenuBarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const MenuBar: React.FC<MenuBarProps> = ({ activeTab, setActiveTab }) => (
  <Styled.MenuBarContainer>
    <Styled.MenuButton
      active={activeTab === 'home'}
      onClick={() => setActiveTab('home')}
    >
      <img
        src={HomeIcon}
        alt="Home"
      />
      <span>Home</span>
    </Styled.MenuButton>
    <Styled.MenuButton
      active={activeTab === 'bookings'}
      onClick={() => setActiveTab('bookings')}
    >
      <img
        src={BookingsIcon}
        alt="Bookings"
      />
      <span>Bookings</span>
    </Styled.MenuButton>
    <Styled.MenuButton
      active={activeTab === 'announcements'}
      onClick={() => setActiveTab('announcements')}
    >
      <img
        src={AnnouncementsIcon}
        alt="Announcements"
      />
      <span>Bulletin</span>
    </Styled.MenuButton>
    <Styled.MenuButton
      active={activeTab === 'requests'}
      onClick={() => setActiveTab('requests')}
    >
      <img
        src={RequestsIcon}
        alt="Requests"
      />
      <span>Requests</span>
    </Styled.MenuButton>
  </Styled.MenuBarContainer>
);
