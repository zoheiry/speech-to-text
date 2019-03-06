import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from '@fashiontrade/wardrobe';

import { getRecordings } from '../actions/recording';
import Title from '../components/Title';
import RecordingsList from '../components/RecordingsList';

const Wrapper = styled('div')`
  padding: 30px 15px;
  text-align: center;
`;

const ListWrapper = styled('div')`
  margin: 30px auto;
`;

class Recordings extends PureComponent {
  componentDidMount() {
    this.props.getRecordings();
  }

  render() {
    return (
      <Wrapper>
        <Container>
          <Title>Your recordings</Title>
          <ListWrapper>
            <RecordingsList recordings={this.props.recordings} />
          </ListWrapper>
        </Container>
      </Wrapper>
    );
  }
}

Recordings.propTypes = {
  recordings: PropTypes.object,
  getRecordings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  recordings: state.recordings,
});

const mapDispatchToProps = (dispatch) => ({
  getRecordings: () => dispatch(getRecordings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recordings);
