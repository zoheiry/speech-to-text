import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledError = styled('div')`
  color: ${p => p.theme.danger};
  margin-bottom: 15px;
  font-weight: 400;
  background: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  padding: 8px;
`;

const ErrorMessage = ({ children }) => (
  <StyledError>{children}</StyledError>
);

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorMessage;
