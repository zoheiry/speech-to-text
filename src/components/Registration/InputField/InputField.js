import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FiLock, FiMail } from 'react-icons/fi';

const InputWrapper = styled('div')`
  border-bottom: solid 1px ${p => p.theme.primary};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const Icon = styled('div')`
  margin-right: 15px;
`;

const Input = styled('input')`
  background: #fff;
  display: block;
  width: 100%;
  color: ${p => p.theme.grey01};
  padding: 8px;
  border: none;
  outline: none;
  font-size: inherit;
`;

const InputField = ({ type, onChange, placeholder }) => (
  <InputWrapper>
    <Icon>
      {type === 'email'
        ? <FiMail color="#333" />
        : <FiLock color="#333" />
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
