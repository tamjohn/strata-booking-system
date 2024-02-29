import styled from 'styled-components';
import { Link } from 'react-router-dom';
import landingBackground from '../../assets/images/alexandraCourt.jpg';
import InputText from '../../components/Input/Text';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh; 
  width: 100vw; 
  max-height: 100%; 
  max-width: 100%; 
  overflow: hidden; 
  margin: 0; 
  position: relative;
`;

export const LogoContainer = styled.div`
  width: 25%;
  height: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const ContentContainer = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 7%;
  position: relative;
  background-image: url(${landingBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment:  scroll;
`;

export const Input = styled(InputText)`
  font-size: 1rem;
  width: 15vw;
`;

export const LoginText = styled.p`
  font-size: 18px;
  color: black; 
  cursor: pointer;
  margin-top: 1%
`;

export const MainHeader = styled.h1`
  font-size: 4rem; 
  color: black; 
  text-align: center;        
  margin-bottom: 0.5rem;
  font-weight: 700;
  z-index: 2;               
`;

export const SubHeader = styled.h2`
  font-size: 1rem; 
  color: black; 
  text-align: right;       
  margin-bottom: 2rem;
  font-weight: 300;
  z-index: 2;               
`;

export const StyledLink = styled(Link)`
  color: blue; 
  text-decoration: underline;
  font-weight: bold;
`;
