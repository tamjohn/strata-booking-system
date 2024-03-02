import styled from 'styled-components';
import { Link } from 'react-router-dom';
import landingBackground from '../../assets/images/alexandraCourt.jpg';
import InputText from '../../components/Input/Text';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh; 
  width: 100vw; 
  overflow: hidden; 
  margin: 0; 
  position: relative;
`;

export const LogoContainer = styled.div`
  width: 25vw; 
  height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const ContentContainer = styled.div`
  width: 75vw; 
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 15vh; 
  background-image: url(${landingBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
`;

export const Input = styled(InputText)`
  font-size: 1vw;  
  width: 20vw; 
  max-width: 380px; 
`;

export const LoginText = styled.p`
  font-size: 1.25vw; 
  color: black; 
  cursor: pointer;
  margin-top: 1vh; 
`;

export const MainHeader = styled.h1`
  font-size: 2vw;
  color: black; 
  text-align: center;        
  margin-bottom: -1vh;
  font-weight: 700;
  z-index: 2;               
`;

export const SubHeader = styled.h2`
  font-size: 1vw; 
  color: black; 
  text-align: right;       
  margin-bottom: 2vh;
  font-weight: 300;
  z-index: 2;               
`;

export const StyledLink = styled(Link)`
  color: blue; 
  text-decoration: underline;
  font-weight: bold;
  font-size: 1.25vw; 
`;
