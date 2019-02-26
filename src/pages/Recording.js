import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import Title from '../components/Title';
import Transcript from '../components/Transcript';

const Wrapper = styled('div')`
  padding: 30px 15px;
`;

const Recording = ({ match, recordings }) => {
  const { id } = match.params;
  const recording = recordings.items.find((recording) => recording.id === id);
  if (isEmpty(recording)) {
    return null;
  }
  
  return (
    <Wrapper>
      <Title>Transcript | {recording.name}</Title>
      <Transcript text={recording.transcribedText} />
    </Wrapper>
  );
};

Recording.propTypes = {
  match: PropTypes.object,
  recordings: PropTypes.object,
}

const mapStateToProps = (state) => ({
  recordings: state.recordings,
});

export default connect(mapStateToProps)(Recording);
