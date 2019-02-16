import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';

import { LoadingSpinner } from '@fashiontrade/wardrobe';

const disabledStyles = css`
  opacity: 0.5;
  pointer-events: none;
`;

const StyledButton = styled('button')`
  border: none;
  ${p => p.fluid && 'width: 100%;'}
  padding: 12px;
  font-weight: bold;
  background: ${p => (p.secondary ? 'transparent' : p.color)};
  border: ${p => (p.secondary ? `solid 1px ${p.color}` : 'none')};
  color: ${p => (p.secondary ? p.color : '#FFF')};
  ${p => p.disabled && disabledStyles}
  font-size: inherit;
`;

const Button = ({ children, fluid, color, theme, loading, ...props }) =>
  <StyledButton
    {...props}
    fluid={fluid}
    color={color || theme.primary}
    loading={loading}
  >
    {loading ? <LoadingSpinner appearance="light" /> : children}
  </StyledButton>;

Button.propTypes = {
  children: PropTypes.node,
  fluid: PropTypes.bool,
  color: PropTypes.string,
  secondary: PropTypes.bool,
  theme: PropTypes.object,
  loading: PropTypes.bool,
}

export default withTheme(Button);
