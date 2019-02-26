// This component is rendered on every page.
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import OverlayLoading from '../components/OverlayLoading';
import Navbar from '../components/Navbar';
import { getUser } from '../actions/user';
import { getRecordings } from '../actions/recording';
import { getCookie, deleteCookie } from '../utils/cookies';

class Main extends PureComponent {
  componentDidMount() {
    const { pathname } = this.props.history.location;
    if (this.validAuthToken()) {
      this.props.getUser();
    } else if (pathname !== '/login' && pathname !== '/signup') {
      this.props.history.push('/login');
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    const userError = get(user, 'error.response.data.name', '');
    const validAuthToken = this.validAuthToken();
    if (
      validAuthToken &&
      (userError === 'TokenExpiredError' || userError === 'JsonWebTokenError')
    ) {
      deleteCookie('auth');
      this.props.history.push('/login');
      return;
    }
    if (user.id && !prevProps.user.id) {
      this.onUserLoad();
    }
  }

  onUserLoad = () => {
    this.props.getRecordings();
  }

  validAuthToken = () => {
    const authCookie = getCookie('auth');
    return !!authCookie;
  }

  render() {
    const { user, history } = this.props;

    if (user.isFetching) {
      return <OverlayLoading />;
    } else if (user.id) {
      return <Navbar history={history} />;
    }

    return null;
  }
}

Main.propTypes = {
  history: PropTypes.object,
  // redux actions
  getUser: PropTypes.func,
  // redux state
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  getRecordings: () => dispatch(getRecordings()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
