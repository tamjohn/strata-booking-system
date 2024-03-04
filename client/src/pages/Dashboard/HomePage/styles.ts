import styled from 'styled-components';

export const UserInfoCard = styled.section`
  background: #fff;
  padding: 0 1.5vw; 
  padding-bottom: 1.5vh; 
  padding-top: 0.5vh; 
  margin-top: 2vh; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

export const SectionHeader = styled.h2`
  color: #333;
  font-weight: bold;
  margin-bottom: 2vh; 
  font-size: 2.5vh; 
`;

export const Label = styled.label`
  font-weight: bold;
  color: #000;
  display: block;
  margin-bottom: 1vh; 
  font-size: 1.2vh; 
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vh;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  &:not(:last-child) {
    margin-right: 1.5vw; 
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 1vh 0.8vw; 
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem; 
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 1.5vh 1.5vw; 
  border: none;
  border-radius: 4px;
  font-size: 0.9rem; 
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #0056b3;
  }
`;

export const BookingsSection = styled.section`
  background: #fff;
  padding: 0 1.5vw; 
  padding-bottom: 1.5vh; 
  padding-top: 0.5vh; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-top: 3vh; 
`;

export const BookingRow = styled(Row)`
  align-items: center;
`;

export const BookingColumn = styled(Column)`
  &:not(:last-child) {
    margin-right: 1vw; 
  }
`;

export const BookingLabel = styled(Label)``;

export const BookingInput = styled(Input)``;

export const EditButton = styled(Button)`
  background-color: #FFA07A;
  padding: 1.05vh 1.5vw; 
  font-size: 1rem; 
  &:hover {
    background-color: orange;
  }
`;

export const LogoutButton = styled(Button)`
  position: fixed; 
  right: 2vw; 
  bottom: 2vh; 
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; 
`;
