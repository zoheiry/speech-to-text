import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FiUpload } from 'react-icons/fi';
import { LoadingSpinner } from '@fashiontrade/wardrobe';

const Input = styled('input')`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const StyledLabel = styled('label')`
  background: ${p => (p.selected ? p.theme.success : p.theme.primary)};
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  display: inline-flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 200px;

  &[disabled] {
    pointer-events: none;
    opacity: 0.8;
  }

  &:hover {
    ${p => !p.selected && `background: ${p.theme.primaryActive}`};
  }

  span {
    margin-left: 5px;
    display: inline-block;
  }
`;

const FileUpload = ({ onSelectFile, label, selected, loading }) => (
  <div>
    <Input
      type="file"
      capture
      id="uploadRecording"
      onChange={(e) => onSelectFile(e.target.files[0])}
      accept="audio/mp3,audio/flac,audio/wav"      
    />
    <StyledLabel selected={selected} htmlFor="uploadRecording" disabled={loading}>
      {loading
        ? <LoadingSpinner appearance="light" />
       : (
          <div>
            <FiUpload />
            <span>{label}</span>
          </div>
        )}
    </StyledLabel>
  </div>
);

FileUpload.propTypes = {
  label: PropTypes.node,
  onSelectFile: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  loading: PropTypes.bool,
};

FileUpload.defaultProps = {
  label: 'Upload a recording',
};

export default FileUpload;
