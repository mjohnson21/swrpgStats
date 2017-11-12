import React, { PropTypes } from 'react';
import cx from 'classnames';

export default class CharSelector extends React.Component {
  render() {
    return (
      <div>
        {this.props.chars.map((char, i) => {
          return (
            <h4
              className={cx('test': char.current)}
              key={i}
              onClick={() => this.props.handleSelect(i)}
            >{char.name}</h4>
          );
        })}
      </div>
    );
  }
}

CharSelector.propTypes = {
  handleSelect: PropTypes.func,
  chars: PropTypes.array,
};

CharSelector.defaultProps = {
  chars: [],
};
