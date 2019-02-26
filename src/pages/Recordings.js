import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Title from '../components/Title';
import RecordingsList from '../components/RecordingsList';

const Wrapper = styled('div')`
  padding: 30px 15px;
  text-align: center;
`;

const ListWrapper = styled('div')`
  margin: 30px auto;
  max-width: 1000px;
`;

const Recordings = ({ recordings }) => (
  <Wrapper>
    <Title>Your recordings</Title>
    <ListWrapper>
      <RecordingsList recordings={recordings} />
    </ListWrapper>
  </Wrapper>
);

Recordings.propTypes = {
  recordings: PropTypes.object,
};

const mapStateToProps = (state) => ({
  recordings: state.recordings,
});

export default connect(mapStateToProps)(Recordings);
