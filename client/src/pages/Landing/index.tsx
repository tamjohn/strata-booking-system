import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './styles';
import logo from '../../assets/images/AlexandraCourtLogo.png';
import Button from '../../components/Button';

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isFormFilled: boolean = username.length > 0 && password.length > 0;

  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    console.log('button was clicked');
    event.preventDefault();
    navigate('/dashboard', { replace: true });
  };

  return (
    <Styled.PageContainer>
      <Styled.LogoContainer>
        <img
          src={logo}
          alt="EPS2669Logo"
        />
      </Styled.LogoContainer>
      <Styled.ContentContainer>
        <Styled.MainHeader>EPS2669 Resident Portal</Styled.MainHeader>
        <Styled.SubHeader>This application is designed strictly for the use of residents at EPS2669.</Styled.SubHeader>
        <Styled.Input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Styled.Input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={(e) => handleSubmit(e)}
          disabled={!isFormFilled}
          type="button"
        >
          Login
        </Button>
        <Styled.LoginText>
          Don&apos;t have an account? Sign up
          {' '}
          <Styled.StyledLink to="/signup">here</Styled.StyledLink>
        </Styled.LoginText>
      </Styled.ContentContainer>
    </Styled.PageContainer>
  );
};

export default LandingPage;
