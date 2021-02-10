import React from 'react';
import './App.css';

const localStorageKey = 'mars-icons';
const initValues = {
	earth: 0,
	jovian: 0,
	venus: 0,
	science: 0,
	space: 0,
	building: 0,
	event: 0,
	city: 0,
	energy: 0,
	animal: 0,
	leaf: 0,
	microbe: 0,
	questionMark: 0,
	none: 0
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
		if (this.isLocalStorageSupported) {
			localStorage.setItem(localStorageKey, JSON.stringify(this.state));
		}
	}

	resetValues() {
		this.setState(Object.assign({}, initValues), this.storeStates);
	}


	render() {
		return (
			<div className="App">
				<div className="icons">
					{Object.keys(this.state).map(key => {
						return (
							<div className="icon-container" key={key}>
								<div className="button-container">
									<button className="btn" onClick={() => {
										if (this.state[key] > 0) this.setState({ [key]: this.state[key] - 1 }, this.storeStates);
									}}>
										<i className="fa fa-minus-circle"/>
									</button>
								</div>
								<div className="icon" style={{ backgroundImage: 'url(' + require(`./img/${key}.png`) + ')' }}>
								<span className="icon-count">
									{this.state[key]}
								</span>
									{this.state.questionMark && key !== 'questionMark' && key !== 'none' ? (<span className="question-mark-counter">
									(+{this.state.questionMark})
								</span>) : null}
								</div>
								<div className="button-container">
									<button className="btn" onClick={() => {
										this.setState({ [key]: this.state[key] + 1 }, this.storeStates);
									}}>
										<i className="fa fa-plus-circle"/>
									</button>
								</div>
							</div>)
					})}
				</div>

				<div className="reset-button-container">
					<button type="button" onClick={() => {
						const isConfirmed = window.confirm('Are you sure you want to reset the counters?');
						if (isConfirmed) this.resetValues();
					}}>Reset
					</button>
				</div>
			</div>
		);
	}
}

export default App;
