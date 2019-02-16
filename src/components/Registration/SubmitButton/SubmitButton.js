import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../../Button';

const StyledButton = styled(Button)`
  margin-top: 15px;
`;

const SubmitButton = ({ children, onClick, ...props }) => (
  <StyledButton onClick={onClick} {...props}>{children}</StyledButton>
);

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SubmitButton;
