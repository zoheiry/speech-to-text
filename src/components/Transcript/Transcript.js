import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Body = styled('div')`
  padding: 15px;
  background: #f5f5f5;  
  border-radius: 5px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  letter-spacing: 1px;
  line-height: 2;
  color: #333;
`;

const Transcript = ({ text }) => (
  <Body>{text}</Body>
);

Transcript.propTypes = {
  text: PropTypes.string,
};

export default Transcript;
