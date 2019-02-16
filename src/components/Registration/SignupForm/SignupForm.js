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
  box-shadow: 1px 1px 4px rgba(0, 0, 0, .3);
  margin: 30px 0;
`;

class SignupForm extends PureComponent {
  constructor(props) {
    super(props);
    this.REQUIRED_FIELDS = ['email', 'password', 'passwordConfirmation'];
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
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
    const { email, password, passwordConfirmation } = this.state;
    this.props.onSubmit({ email, password, passwordConfirmation });
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
        <InputField
          type="password"
          placeholder="Confirm password"
          onChange={(value) => this.handleChange('passwordConfirmation', value)}
        />
        <SubmitButton onClick={this.handleSubmit}>Sign up</SubmitButton>
      </Wrapper>
    );
  }
}

SignupForm.propsTypes = {
  error: PropTypes.object,
  onSubmit: PropTypes.func,
};

SignupForm.defaultProps = {
  error: {},
  onSubmit: noop,
};

export default SignupForm;
