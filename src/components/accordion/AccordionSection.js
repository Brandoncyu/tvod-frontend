import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AccordionSection extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const {
      onClick,
      props: { isOpen, label },
    } = this;

    return (
      <div
        style={{
          border: '1px solid #008f68',
          padding: '5px 10px'
        }}
      >
        <div onClick={onClick} className="seasonLabels" style={{ cursor: 'pointer' }}>
          {label}
          <div style={{ float: 'right' }}>
            {!isOpen && <span>&#9660;</span>}
            {isOpen && <span>&#9650;</span>}
          </div>
        </div>
        {isOpen && (
          <div
            style={{
              margin: 10,
              padding: '5px 5px 5px 5pxx',
            }}
          >
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}

export default AccordionSection;
