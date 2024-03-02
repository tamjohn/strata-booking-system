import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const MenuBarContainer = styled.div`
  width: 10%;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: start; 
  height: 100%; 
`;

export const ContentContainer = styled.div`
  width: 90%;
  background: #ffffff; 
  padding: 20px; 
  overflow-y: auto; 
`;

export const MenuButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  margin-bottom: 20px; 
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;

  img {
    margin-bottom: 8px; 
    width: 50px; 
    height: auto;
  }

  &:hover {
    background-color: #ececec; 
  }

  &.active {
    background-color: #dedede; 
  }
`;
