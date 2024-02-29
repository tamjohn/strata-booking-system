import styled from 'styled-components';

type MenuButtonProps = {
  active: boolean;
};

export const MenuBarContainer = styled.div`
  width: 15vw; 
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  height: 100vh; 
  background: lightblue;
`;

export const MenuButton = styled.button<MenuButtonProps>`
  flex: 1; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  padding: 2vh 0; 
  margin: 1vh 0; 
  border: none;
  background: ${(props) => (props.active ? '#007bff' : 'lightblue')};
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1.5vh;

  img {
    width: 5vw; 
    height: auto; 
    margin-bottom: 1vh;
  }

  span {
    font-weight: bold;
  }

  &:hover {
    background-color: #007bff;
  }
`;
