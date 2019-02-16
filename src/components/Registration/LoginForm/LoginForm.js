import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop, isEmpty } from 'lodash';

import { InputField, SubmitButton, ErrorMessage } from '../';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 30px;
  font-size: 16px;
`;

class LoginForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: props.error,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error !== state.error) {
      return {
        error: props.error
      };
    }
    return null
  }

  handleSubmit = () => {
    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  }

  handleChange = (field, value) => {
    if (this.state[field] !== value) {
      this.setState({ [field]: value });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <Wrapper onKeyDown={(e) => { e.keyCode === 13 && this.handleSubmit(); }}>
        {!isEmpty(error) && <ErrorMessage>{error.message}</ErrorMessage>}
        <InputField type="email" onChange={(value) => this.handleChange('email', value)} />
        <InputField type="password" onChange={(value) => this.handleChange('password', value)} />
        <SubmitButton onClick={this.handleSubmit}>Log In</SubmitButton>
      </Wrapper>
    );
  }
}

LoginForm.propTypes = {
  error: PropTypes.shape({ message: PropTypes.string }),
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  error: {},
  onSubmit: noop,
}

export default LoginForm;
