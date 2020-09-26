import React from 'react';
import './App.css';
const localStorageKey = 'mars-icons';
const initValues = {
  earth: 0,
  jovian: 0,
  science: 0,
  space: 0,
  building: 0,
  event: 0,
  city: 0,
  energy: 0,
  animal: 0,
  leaf: 0,
  microbe: 0,
  questionMark: 0
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.isLocalStorageSupported =
			localStorage && typeof localStorage.setItem === 'function' && typeof localStorage.getItem === 'function';
		this.state = Object.assign({}, initValues);

    if (this.isLocalStorageSupported) {
      const values = localStorage.getItem(localStorageKey);
      if (values) {
        this.state = Object.assign({}, initValues, JSON.parse(values));
      }
    }
	}

	storeStates() {
    if(this.isLocalStorageSupported) {
      localStorage.setItem(localStorageKey, JSON.stringify(this.state));
    }
	}

  resetValues() {
    this.setState(Object.assign({}, initValues), this.storeStates);
  }

	render() {
    const questionCount = Object.keys(this.state).questionMark;
		return (
			<div className="App">
        <div className="icons">
          {Object.keys(this.state).map(key => {
            return (
              <div className="icon-container" key={key}>
                <button className="btnMinus" onClick={() => {
                    if (this.state[key] > 0) this.setState({ [key]: this.state[key] - 1 }, this.storeStates);
                  }}/>
                <button className="btnPlus" onClick={() => {
                    this.setState({ [key]: this.state[key] + 1 }, this.storeStates);
                  }}/>
                <div className="icon" style={{ backgroundImage: 'url(' + require(`./img/${key}.png`) + ')' }}/>
                <div className="icon-count-container">
                  <div className="icon-count">
									  {this.state[key]}
								  </div>
                </div>
                {key !== "questionMark" &&
                  <div className="icon-count-extra-container">
                    <div className="icon-count-extra">
  									  {this.state[key] + this.state.questionMark}
  								  </div>
                  </div>
                }
              </div>)
          })}
        </div>

				<div className="reset-button-container">
          <button type="button" onClick={() => {
            const isConfirmed = window.confirm('Are you sure you want to reset the counters?');
            if (isConfirmed) this.resetValues();
          }}>Reset</button>
        </div>
			</div>
		);
	}
}

export default App;
