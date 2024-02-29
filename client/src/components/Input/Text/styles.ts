import styled from 'styled-components';

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const StyledInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  width: 100%; 
  border: 1px solid #ccc;
  border-radius: 5px; 
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
`;
