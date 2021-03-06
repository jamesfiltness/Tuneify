import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';
import { createPlaylist } from '../../../../actions/playlists';

export class SavePlaylistModal extends React.Component {
  static PropTypes = {
    playQueue: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
    createPlaylist: PropTypes.func.isRequired,
    creatingUserPlaylist: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      saveError: false,
      inputVal: '',
    };

    this.savePlaylist = this.savePlaylist.bind(this);
    this.updateFieldState = this.updateFieldState.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.creatingUserPlaylist) {
      this.setState({
        inputVal: '',
      });
    }
  }

  savePlaylist() {
    if (!this.input.value.length) {
      this.showErrorState();
    } else {
      this.props.createPlaylist(
        this.input.value,
        this.props.playQueue
      );
    }
  }

  showErrorState() {
    this.setState({
      saveError: true,
    })
  }

  showErrorMessage() {
    return this.state.saveError ?
    <p className="dialog__error-text">
      Please give your playlist a name
    </p> :
    null
  }

  updateFieldState() {
    let saveError = true;

    if (this.input.value.length) {
      saveError = false;
    }

    this.setState({
      saveError,
      inputVal: this.input.value,
    });
  }

  render() {
    const inputClasses = classNames(
      'dialog__input',
      this.state.saveError ? 'dialog__input--error' : '',
    );

    const spinnerClasses = classNames(
      'dialog__spinner',
      this.props.creatingUserPlaylist ? 'dialog__spinner--visible' : '',
    );

    return (
      <div className="save-playlist-modal">
        <h3 className="dialog__heading">
          {this.props.text}
        </h3>
        <div className="dialog__content">
          {this.showErrorMessage()}
          <input
            type="text"
            value={this.state.inputVal}
            onChange={this.updateFieldState}
            placeholder="Give your playlist a name"
            ref={(input) => { this.input = input }}
            className={inputClasses}
          />
          <button
            onClick={this.savePlaylist}
            className="dialog__button"
          >
            Create
          </button>
          <div className={spinnerClasses}>
            <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    playQueue: state.playQueue.playQueueTracks,
    creatingUserPlaylist: state.playlists.creatingUserPlaylist,
  }
}

const mapDispatchToProps = {
  createPlaylist
}

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(SavePlaylistModal);
