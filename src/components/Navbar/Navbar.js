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
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const activeStyles = css`
  color: #223c50;
  background: #fff !important;
  text-decoration: none !important;
`;

const hoverStyles = css`
  background: rgba(255,255,255,.3);
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 15px;
  transition: .3s;

  &:hover {
    ${hoverStyles}
  }
  ${(p) => (p.highlight ? activeStyles : '')};
`;

const LinksWrapper = styled('div')`
  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const getActiveLinkFromLocation = (location) =>
  location.pathname.indexOf('recordings') > -1 ? 'recordings' : 'home';

class Navbar extends PureComponent {
  state = {
    activeLink: getActiveLinkFromLocation(this.props.history.location),
  };

  unlisten = null;

  componentDidMount() {
    this.unlisten = this.props.history.listen((location) => {
      const activeLink = getActiveLinkFromLocation(location);
      this.setState({ activeLink });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  logout = () => {
    deleteCookie('auth');
    window.location.href = '/login';
  };

  render() {
    const { activeLink } = this.state;

    return (
      <StyledNavbar>
        <StyledLink to="/" highlight={activeLink === 'home'}>
          Home
        </StyledLink>
        <LinksWrapper>
          <StyledLink to="/recordings" highlight={activeLink === 'recordings'}>
            My recordings
          </StyledLink>
          <StyledLink to="/" onClick={this.logout}>
            Logout
          </StyledLink>
        </LinksWrapper>
      </StyledNavbar>
    );
  }
}

export default Navbar;
