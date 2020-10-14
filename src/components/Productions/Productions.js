import React from 'react';
import './Productions.scss';

class Productions extends React.Component {
  setProduction(key, value) {
    const newState = { ...this.props.productions, [key]: value }
    this.props.onUpdate('productions', newState);
  }

  setResource(key, value) {
    const newState = { ...this.props.resources, [key]: value }
    this.props.onUpdate('resources', newState);
  }

  setTR(value) {
    this.props.onUpdate('terraformRate', value);
  }

  newGeneration() {
    const newResources = {...this.props.resources};
    newResources.heat = newResources.power + newResources.heat;
    newResources.power = 0;
    for (let key in this.props.productions) {
      if (this.props.productions.hasOwnProperty(key)) {
        let sum = this.props.productions[key] + newResources[key];
        if (key === 'megaCredit') {
          sum += this.props.terraformRate;
        }
        newResources[key] = sum;
      }
    }
    this.props.onUpdate('resources', newResources);
    this.props.onUpdate('terraformRate', this.props.terraformRate - 1);
    this.props.onUpdate('generation', this.props.generation + 1);
  }

  render() {
    return (
      <div className="productions">
        <div className="row">
          <div className="col text-center">
            <div className="wrapper">
              <div className="icon-wrapper terraform-rate">
                <button className="btn btn-plus" onClick={() => {
                  this.setTR(this.props.terraformRate + 1);
                }}/>
                <button className="btn btn-minus" onClick={() => {
                  if (this.props.terraformRate > 0) {
                    this.setTR(this.props.terraformRate - 1);
                  }
                }}/>
                <div className="icon-image" style={{'background-image': 'url(' + require(`../../img/terraformRate.png`) + ')'}}>
                  {this.props.terraformRate}
                </div>
              </div>
            </div>
          </div>
          <div className="col text-center">
            <button type="button" className="new-generation" onClick={() => {
              const isConfirmed = window.confirm('Are you sure you want to do the production phase?');
              if (isConfirmed) this.newGeneration();
            }}>
              <span>New Generation</span>
            </button>
          </div>
        </div>

        {Object.keys(this.props.productions).map(key => {
          return (
            <div className="row" key={key}>
              <div className="col text-center">
                <div className="wrapper">
                  <div className="icon-wrapper production">
                    <button className="btn btn-plus" onClick={() => {
                      this.setProduction(key, this.props.productions[key] + 1);
                    }}/>
                    <button className="btn btn-minus" onClick={() => {
                      if (this.props.productions[key] > 0 || (key === 'megaCredit' && this.props.productions[key] > -5)) {
                        this.setProduction(key, this.props.productions[key] - 1);
                      }
                    }}/>
                    <div className="icon-image" style={{'background-image': 'url(' + require(`../../img/${key}.png`) + ')'}}>
                      {this.props.productions[key]}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col text-center">
                <div className="wrapper">
                  <div className="icon-wrapper resource">
                    <button className="btn btn-plus" onClick={() => {
                      this.setResource(key, this.props.resources[key] + 1);
                    }}/>
                    <button className="btn btn-minus" onClick={() => {
                      if (this.props.resources[key] > 0) {
                        this.setResource(key, this.props.resources[key] - 1);
                      }
                    }}/>
                    <div className="icon-image" style={{'background-image': 'url(' + require(`../../img/${key}.png`) + ')'}}>
                      {this.props.resources[key]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Productions;
