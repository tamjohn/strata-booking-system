import styled from 'styled-components';

type MenuButtonProps = {
  active: boolean;
};

export const MenuBarContainer = styled.div`
  width: 15vw; 
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  justify-content: flex-start; 
  height: 100vh;
  background: #6495ED; 
  color: black;
  padding-top: 10vh; 
  box-sizing: border-box; 
`;

export const MenuButton = styled.button<MenuButtonProps>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1vh 1vw; 
  margin: 1vh 0;
  border: none;
  background: ${(props) => (props.active ? '#87CEFA' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : 'black')}; 
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1.5vh;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #87CEFA; 
    color: white; 
  }

  img {
    width: 30px; 
    height: 30px;
    margin-right: 10px; 
  }

  span {
    font-weight: bold;
  }
`;
