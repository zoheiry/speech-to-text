import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import { getCookie } from '../utils/cookies';
import { authenticateUser } from '../actions/user';
import { LoginForm, FormWrapper } from '../components/Registration';
import LogoImage from '../static/img/cf_logo.svg';

const Logo = styled('div')`
  img {
    width: 100px;
  }
`;

const Footer = styled('div')`
  color: ${p => p.theme.grey01};
  font-size: 14px;
  a {
    color: ${p => p.theme.success};
  }
`;

class Login extends Component {
  componentDidMount() {
    if (getCookie('auth')) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate() {
    if (this.props.user.id) {
      this.props.history.push('/');
    }
  }

  render() {
    const { authenticateUser, user } = this.props;
    return (
      <FormWrapper>
        <Logo><img src={LogoImage} alt="logo" /></Logo>
        <LoginForm
          onSubmit={authenticateUser}
          error={get(user, 'authenticationError.response.data')}
        />
        <Footer>
          Don't have an account? <Link to='/signup'>Register here</Link>
        </Footer>
      </FormWrapper>
    );
  }
}

Login.propTypes = {
  authenticateUser: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (userInfo) => dispatch(authenticateUser(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
