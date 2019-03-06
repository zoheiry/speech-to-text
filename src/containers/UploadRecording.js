import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Recorder from 'react-mp3-recorder';
import styled from 'styled-components';
import { last } from 'lodash';
import { LoadingSpinner } from '@fashiontrade/wardrobe';

import { BUSY, SUCCESS } from '../constants/UploadStatuses';
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
    ${(p) => p.isUploading && `content: ''`};
    width: 110%;
    height: 110%;
    position: absolute;
    top: -5%;
    left: -5%;
    border-radius: 50%;
    background: ${(p) => p.theme.success};
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

const SuccessMessage = styled('p')`
  background: ${p => p.theme.success};
  color: #fff;
  padding: 10px;
  font-weight: 600;
  border-radius: 5px;
`;

const InfoText = styled('p')`
  font-size: 14px;
  font-style: italic;
`;

class UploadRecording extends PureComponent {
  state = {
    file: null,
    recording: false,
    inputType: MICROPHONE,
    uploadSuccess: false,
  };

  static getDerivedStateFromProps(_, state) {
    if (state.recording) {
      return { file: null };
    }
    return null;
  }

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
    if (file.size < 5000) {
      return;
    }
    this.setState({ file }, () => {
      this.props.onUpload(file);
    });
  };

  handleChangeInputType = (e) => {
    this.setState({ inputType: e.target.value });
  };

  isUploading = () => this.props.uploadStatus === BUSY;

  uploadSuccess = () => this.props.uploadStatus === SUCCESS;

  renderRecorderStatus = () => {
    if (this.isUploading()) {
      return (
        <p>
          <strong>Uploading...</strong>
        </p>
      );
    }
    if (this.state.recording) {
      return (
        <p>
          <strong>Recording...</strong>
        </p>
      );
    }
    return (
      <p>
        <strong>Click & Hold</strong> to start recording.
      </p>
    );
  }

  renderRecorder = () => (
    <div>
      <RecorderWrapper isUploading={this.isUploading()}>
        <Recorder
          onRecordingComplete={this.onStopRecording}
          onMouseDown={this.startRecording}
          onMouseUp={this.stopRecording}
        />
        {this.isUploading() && <StyledLoadingSpinner appearance="light" />}
      </RecorderWrapper>
      {this.renderRecorderStatus()}
    </div>
  );

  renderFileUpload = (file) => (
    <div>
      <FileUpload
        onSelectFile={this.handleSelectFile}
        label={file ? file.name : undefined}
        loading={this.isUploading()}
        selected={!!file}
      />
      <InfoText>Supported formats are (.mp3, .wav, .flac)</InfoText>
    </div>
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

  renderUploadSuccessMessage = () => (
    <SuccessMessage>
      Your recording is uploaded successfully. <br />
      You will receive an email with the trasncribed text shortly.
    </SuccessMessage>
  );

  render() {
    const { file, inputType } = this.state;

    return (
      <div>
        {this.uploadSuccess() && this.renderUploadSuccessMessage()}
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
  uploadStatus: PropTypes.string,
};

const mapStateToProps = (state) => ({
  lastRecording: last(state.recordings.items),
  uploadStatus: state.recordings.uploadStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onUpload: (file) => dispatch(uploadRecording(file)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadRecording);
