import React, { useState } from 'react';
import * as Styled from './styles';

type InputTextProps = {
    className?: string;
    label?: string;
    name?: string;
    value?: number | string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    showPassword?: boolean;
    type: 'text' | 'password' | 'email' | 'number' | 'url';
}

export const InputText = ({
  label = '', name, className, value, onChange, placeholder = '', disabled = false, showPassword = false, type,
}: InputTextProps) => {
  const [showPasswordValue, setShowPasswordValue] = useState(showPassword);
  const [typeValue, setTypeValue] = useState(type);

  const handleShowPassword = () => {
    setShowPasswordValue(!showPasswordValue);
    setTypeValue(showPasswordValue ? 'password' : 'text');
  };

  return (
    <Styled.InputContainer>
      {label && <Styled.Label htmlFor={name}>{label}</Styled.Label>}
      <Styled.StyledInput
        className={className}
        type={typeValue}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {type === 'password' && (
        <Styled.TogglePasswordButton onClick={handleShowPassword}>
          {showPasswordValue ? 'Hide' : 'Show'}
        </Styled.TogglePasswordButton>
      )}
    </Styled.InputContainer>
  );
};

export default InputText;
