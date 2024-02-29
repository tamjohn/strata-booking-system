import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background: orange;
  border: none;
  width: 15vw;
  color: white;

  &:hover {
    background: darkorange;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
