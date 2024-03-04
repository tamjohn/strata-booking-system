import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px; 
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.h3`
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const ModalBody = styled.div`
`;

export const FormField = styled.div`
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%; 
  padding: 15px; 
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CancelButton = styled(SubmitButton)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 1rem;
  color: #333; 
`;

export const Error = styled.div`
  color: red; 
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1rem;
`;
