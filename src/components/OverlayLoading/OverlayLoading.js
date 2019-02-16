import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '@fashiontrade/wardrobe';

const Wrapper = styled('div')`
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background: rgba(0, 0, 0, .3);
`;

const OverlayLoading = () => (
  <Wrapper>
    <LoadingSpinner size="50px" color="#0cb67e" gapColor="#FFF" />
  </Wrapper>
);

export default OverlayLoading;
