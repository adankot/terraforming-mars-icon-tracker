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
                  <div className="icon-image" style={{'background-image': 'url(' + require(`../../img/${key}.png`) + ')'}}>
                    <button className="btn btn-minus" onClick={() => {
                      if (this.props.icons[key] > 0) {
                        this.setIcon(key, this.props.icons[key] - 1);
                      }
                    }}/>
                    <button className="btn btn-plus" onClick={() => {
                      this.setIcon(key, this.props.icons[key] + 1);
                    }}/>
                    <div className="icon-count">
                      {this.props.icons[key]}
                    </div>

                    {this.props.icons.questionMark && key !== 'questionMark' ?
                      (<span className="icon-question-mark">
                        {this.props.icons[key] + this.props.icons.questionMark}
                      </span>)
                      : ''
                    }

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
