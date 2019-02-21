import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReactMic } from 'react-mic';

import { uploadRecording } from '../actions/recording';
import FileUpload from '../components/FileUpload';
import { blobToFile } from '../utils/file';

class UploadRecording extends PureComponent {
  state = {
    file: null,
    record: false,

  };

  handleSelectFile = (file) => {
    if (!file) {
      return null;
    }
    this.setState({ file }, () => {
      this.props.onUpload(file)
    });
  };

  startRecording = () => {
    this.setState({ record: true });
  };

  stopRecording = () => {
    this.setState({ record: false });
  };

  onReceiveData = (recordedBlob) => {
    console.log(recordedBlob);
  };

  onStopRecording = (recordedBlob) => {
    console.log(recordedBlob);
    const file = blobToFile(recordedBlob.blob);
    this.setState({ file }, () => {
      this.props.onUpload(file);
    });
  };

  render() {
    const { file } = this.state;

    return (
      <div>
        {file && (
          <audio controls>
            <source src={URL.createObjectURL(file)} />
          </audio>
        )}

        <div>
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStopRecording}
            onData={this.onReceiveData}
            strokeColor="#ccc"
            backgroundColor="#f5f5f5"
          />
          <button onClick={this.startRecording} type="button">
            Start
          </button>
          <button onClick={this.stopRecording} type="button">
            Stop
          </button>
        </div>

        <FileUpload
          onSelectFile={this.handleSelectFile}
          label={file ? file.name : undefined}
          selected={!!file}
        />
      </div>
    );
  }
}

UploadRecording.propTypes = {
  onUpload: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onUpload: (file) => dispatch(uploadRecording(file)),
});

export default connect(
  undefined,
  mapDispatchToProps
)(UploadRecording);