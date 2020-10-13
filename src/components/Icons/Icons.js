import React from 'react';
import './Icons.scss';

class Icons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: props.icons
    };
  }

  updateParent() {
    this.props.onUpdate('icons', this.state.icons);
  }

  setIcon(key, value) {
    const newState = { ...this.state.icons, [key]: value }
    this.setState({ icons: newState }, this.updateParent);
  }

  render() {
    return (
      <div className="d-flex flex-wrap align-content-center">
        {Object.keys(this.state.icons).map(key => {
          return (
            <div className="flex-fill" key={key}>
              <div className="icon-wrapper">
                <div className="icon">
                  <img className="icon-image" src={require(`../../img/${key}.png`)} alt={key}/>
                  <div className="icon-count-wrapper">
                    <button className="btn btn-plus" onClick={() => {
                      this.setIcon(key, this.state.icons[key] + 1);
                    }}>
                      <i className="fa fa-plus"></i>
                    </button>
                    <div className="icon-count">
                      {this.state.icons[key]}
                      {this.state.icons.questionMark && key !== 'questionMark' ?
                        (<span className="icon-question-mark">
                        +{this.state.icons.questionMark}
                      </span>)
                        : ''
                      }
                    </div>
                    <button className="btn btn-minus" onClick={() => {
                      if (this.state.icons[key] > 0) {
                        this.setIcon(key, this.state.icons[key] - 1);
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
