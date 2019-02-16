import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FiLock, FiMail } from 'react-icons/fi';

const InputWrapper = styled('div')`
  border-bottom: solid 1px #FFF;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const Icon = styled('div')`
  margin-right: 15px;
`;

const Input = styled('input')`
  background-color: transparent;
  display: block;
  width: 100%;
  color: #FFF;
  padding: 8px;
  border: none;
  outline: none;
  font-size: inherit;
  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const InputField = ({ type, onChange, placeholder }) => (
  <InputWrapper>
    <Icon>
      {type === 'email'
        ? <FiMail color="#FFF" />
        : <FiLock color="#FFF" />
      }
    </Icon>
    <Input
      type={type}
      placeholder={placeholder || (type === 'email' ? 'Email' : 'Password')}
      onChange={(e) => onChange(e.target.value)}
    />
  </InputWrapper>
);

InputField.propTypes = {
  type: PropTypes.oneOf(['email', 'password']).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default InputField;
