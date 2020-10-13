import React from 'react';
import './Icons.scss';

class Icons extends React.Component {
  setIcon(key, value) {
    const newState = { ...this.props.icons, [key]: value }
    this.props.onUpdate('icons', newState);
  }

  render() {
    return (
      <div className="d-flex flex-wrap align-content-center">
        {Object.keys(this.props.icons).map(key => {
          return (
            <div className="flex-fill" key={key}>
              <div className="icon-wrapper">
                <div className="icon">
                  <img className="icon-image" src={require(`../../img/${key}.png`)} alt={key}/>
                  <div className="icon-count-wrapper">
                    <button className="btn btn-plus" onClick={() => {
                      this.setIcon(key, this.props.icons[key] + 1);
                    }}>
                      <i className="fa fa-plus"></i>
                    </button>
                    <div className="icon-count">
                      {this.props.icons[key]}
                      {this.props.icons.questionMark && key !== 'questionMark' ?
                        (<span className="icon-question-mark">
                        +{this.props.icons.questionMark}
                      </span>)
                        : ''
                      }
                    </div>
                    <button className="btn btn-minus" onClick={() => {
                      if (this.props.icons[key] > 0) {
                        this.setIcon(key, this.props.icons[key] - 1);
                      }
                    }}>
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>)
        })}
      </div>
    );
  }
}

export default Icons;
