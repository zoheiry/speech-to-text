import React from 'react';
import UploadRecording from '../containers/UploadRecording';
import styled from 'styled-components';

const Wrapper = styled('div')`
  padding: 30px 15px;
  text-align: center;
`;

const RecordingWrapper = styled('div')`
  padding: 30px 15px;
  text-align: center;
  min-width: 500px;
  margin: 30px auto;
  box-shadow: 0 1px 4px rgba(0,0,0,.3);
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => (
  <Wrapper>
    <RecordingWrapper>
      <UploadRecording />
    </RecordingWrapper>
  </Wrapper>
);

export default Home;
