import React from 'react';
import './Sidebar.scss';

class Sidebar extends React.Component {
  close() {
    this.props.onClose(this.props.name);
  }

  render() {
    return (
      <div className={`sidebar ${this.props.isActive ? 'active' : ''}`}>
        <div className="header">
          <div className="header-title">
            {this.props.header}
            <button type="button" className="close pull-right" onClick={() => {
              this.close();
            }}>&times;</button>
          </div>
        </div>
        <div className="body">
          {this.props.body}
        </div>
      </div>
    );
  }
}

export default Sidebar;
