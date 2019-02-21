import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FiUpload } from 'react-icons/fi';

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
  cursor: pointer;

  &:hover {
    ${p => !p.selected && `background: ${p.theme.primaryActive}`};
  }

  span {
    margin-left: 5px;
    display: inline-block;
  }
`;

const FileUpload = ({ onSelectFile, label, selected }) => (
  <div>
    <Input
      type="file"
      capture
      id="uploadRecording"
      onChange={(e) => onSelectFile(e.target.files[0])}
      accept="audio/*"
    />
    <StyledLabel selected={selected} htmlFor="uploadRecording">
      <FiUpload />
      <span>{label}</span>
    </StyledLabel>
  </div>
);

FileUpload.propTypes = {
  label: PropTypes.string,
  onSelectFile: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

FileUpload.defaultProps = {
  label: 'Upload a recording',
};

export default FileUpload;
