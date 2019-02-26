import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTitle = styled('h1')`
  padding: 0;
  margin: 0;
  font-size: 32px;
`;

const Title = ({ children }) => <StyledTitle>{children}</StyledTitle>;

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
