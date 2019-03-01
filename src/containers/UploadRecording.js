import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Recorder from 'react-mp3-recorder';
import styled from 'styled-components';
import { last } from 'lodash';
import { LoadingSpinner } from '@fashiontrade/wardrobe';

import { uploadRecording } from '../actions/recording';
import FileUpload from '../components/FileUpload';
import { blobToFile } from '../utils/file';
import { MICROPHONE, FILE_UPLOAD } from '../constants/InputTypes';

const InputTypesWrapper = styled('div')`
  padding: 20px;
  > * + * {
    margin-left: 10px;
  }
`;

const RadioWrapper = styled('div')`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > *:first-child {
    margin-right: 5px;
  }
`;

const RecorderWrapper = styled('div')`
  display: inline-block;
  position: relative;
  &::after { 
    ${p => p.isUploading && `content: ''`};
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    background: ${p => p.theme.primary};
  }
`;

const StyledLoadingSpinner = styled(LoadingSpinner)`
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

class UploadRecording extends PureComponent {
  state = {
    file: null,
    record: false,
    inputType: MICROPHONE,
  };

  handleSelectFile = (file) => {
    if (!file) {
      return null;
    }
    this.setState({ file }, () => {
      this.props.onUpload(file);
    });
  };

  startRecording = async () => {
    this.setState({ recording: true });
  };

  stopRecording = async () => {
    this.setState({ recording: false });
  };

  onStopRecording = (recordedBlob) => {
    const file = blobToFile(recordedBlob);
    console.log(file);
    this.setState({ file }, () => {
      this.props.onUpload(file);
    });
  };

  handleChangeInputType = (e) => {
    this.setState({ inputType: e.target.value });
  }

  renderRecorder = () => (
    <div>
      <RecorderWrapper isUploading={this.props.isUploading}>
        <Recorder
          onRecordingComplete={this.onStopRecording}
          onMouseDown={this.startRecording}
          onMouseUp={this.stopRecording}
        />
        {this.props.isUploading && <StyledLoadingSpinner appearance="light" />}
      </RecorderWrapper>
      {!this.props.isUploading && (this.state.recording ? (
        <p>
          <strong>Recording...</strong>
        </p>
      ) : (
        <p>
          <strong>Click & Hold</strong> to start recording.
        </p>
      ))}
    </div>
  );

  renderFileUpload = (file) => (
    <FileUpload
      onSelectFile={this.handleSelectFile}
      label={file ? file.name : undefined}
      loading={this.props.isUploading}
      selected={!!file}
    />
  );

  renderAudio = () => (
    <div>
      <p>Listen to your recording</p>
      <audio controls>
        <source src={URL.createObjectURL(this.state.file)} />
      </audio>
    </div>
  );

  renderInputTypSelection = () => (
    <InputTypesWrapper>
      <RadioWrapper>
        <input
          type="radio"
          id="microphoneInput"
          value={MICROPHONE}
          onChange={this.handleChangeInputType}
          checked={this.state.inputType === MICROPHONE}
        />
        <label htmlFor="microphoneInput">Record</label>
      </RadioWrapper>
      <span>|</span>
      <RadioWrapper>
        <input
          type="radio"
          id="fileUploadInput"
          value={FILE_UPLOAD}
          onChange={this.handleChangeInputType}
          checked={this.state.inputType === FILE_UPLOAD}
        />
        <label htmlFor="fileUploadInput">Upload</label>
      </RadioWrapper>
    </InputTypesWrapper>
  );

  render() {
    const { file, inputType } = this.state;

    return (
      <div>
        {this.renderInputTypSelection()}
        {inputType === MICROPHONE ? this.renderRecorder() : this.renderFileUpload(file)}
        {file && this.renderAudio()}
      </div>
    );
  }
}

UploadRecording.propTypes = {
  onUpload: PropTypes.func.isRequired,
  lastRecording: PropTypes.object,
  isUploading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  lastRecording: last(state.recordings.items),
  isUploading: state.recordings.isUploading,
});

const mapDispatchToProps = (dispatch) => ({
  onUpload: (file) => dispatch(uploadRecording(file)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadRecording);
