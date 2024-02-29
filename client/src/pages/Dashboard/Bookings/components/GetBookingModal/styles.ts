import styled from 'styled-components';

export const ButtonStyled = styled.div`
  margin-left: 1rem;
`;

export const PopUpBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: center;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

&:hover {
  background-color: #0056b3;
}
`;

export const StyledCancelButton = styled(StyledButton)`
  background-color: #ccc;
  margin-left: 1rem;

&:hover {
  background-color: #999;
}
`;

export const ModalOverlay = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(5px);
display: flex;
align-items: center;
justify-content: center;
z-index: 9999;
`;
