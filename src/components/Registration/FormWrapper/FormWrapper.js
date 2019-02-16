import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled('div')`
  width: 500px;
  max-width: 90%;
  margin: 50px auto;
  text-align: center;
`;

const FormWrapper = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

FormWrapper.propTypes = {
  children: PropTypes.node,
};

export default FormWrapper;
