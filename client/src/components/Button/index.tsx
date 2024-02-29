/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import * as Styled from './styles';

type ButtonProps = {
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    color?: string;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children, onClick, color, className, disabled, type = 'button', ...props
}: ButtonProps) => (
  <Styled.StyledButton
    onClick={onClick}
    className={className}
    color={color}
    disabled={disabled}
    type={type}
    {...props}
  >
    {children}
  </Styled.StyledButton>
);

export default Button;
