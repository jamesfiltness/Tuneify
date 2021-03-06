import React, { PropTypes } from 'react';

export default class Track extends React.Component {
  static PropTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onClickTrackTools: PropTypes.func.isRequired,
    rank: PropTypes.number,
    artist: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.optionSelected = this.optionSelected.bind(this);
  }

  optionSelected(e) {
    e.stopPropagation();
    this.props.onClickTrackTools(e);
  }

  render() {
    return (
      <tr 
        className="track" 
        onClick={this.props.onClick}
      >
        <td 
          className="track__cell"
        >
          <span className="track__rank">
            {this.props.rank}
          </span>
          <span className="track__play">
            <i className="fa fa-play" />
          </span>
        </td>
        <td className="track__cell track__name">{this.props.name}</td>
        {
          this.props.artist ? 
            <td className="track__cell track__artist">
              {this.props.artist}
            </td> : 
            null
        }
        <td 
          className="track__cell track__options"
          onClick={this.optionSelected}
        >
        </td>
      </tr>
    )
  }
}
