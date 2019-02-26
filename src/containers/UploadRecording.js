import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Recorder from 'react-mp3-recorder'

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

  startRecording = async () => {
    this.setState({ record: true });
  };

  stopRecording = async () => {
    this.setState({ record: false });
  };

  onReceiveData = (recordedBlob) => {
    console.log(recordedBlob);
  };

  onStopRecording = (recordedBlob) => {
    const file = blobToFile(recordedBlob);
    console.log(file);
    this.setState({ file }, () => {
      this.props.onUpload(file);
    })
  }

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
          <Recorder
            onRecordingComplete={this.onStopRecording}
            onMouseDown={() => console.log('mouse is DOWN')}
            onMouseUp={() => console.log('mouse is UP')}
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
