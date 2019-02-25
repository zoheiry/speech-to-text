import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { deleteCookie } from '../../utils/cookies';

const StyledNavbar = styled('nav')`
  position: fixed;
  width: 100%;
  top: 0;
  background: #223c50;
  color: #fff;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .1);
`;

const activeStyles = css`
  color: #223c50;
  background: #fff;
  text-decoration: none !important;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 15px;

  &:hover {
    text-decoration: underline;
  }
  ${p => p.highlight ? activeStyles: ''};
`;

const LinksWrapper = styled('div')`
  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

class Navbar extends PureComponent {
  state = {
    activeLink: 'home',
  };

  logout = () => {
    deleteCookie('auth');
    window.location.href = '/login';
  }

  render() {
    const { activeLink } = this.state;

    return (
      <StyledNavbar>
        <StyledLink to="/" highlight={activeLink === 'home'}>Home</StyledLink>
        <LinksWrapper>
          <StyledLink to="/recordings" highlight={activeLink === 'recordings'}>
            My recordings
          </StyledLink>
          <StyledLink to="/" onClick={this.logout}>Logout</StyledLink>
        </LinksWrapper>
      </StyledNavbar>
    );
  }
}

export default Navbar;