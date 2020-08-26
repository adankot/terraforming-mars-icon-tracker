import React from 'react';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
			microbe: 0
		};
	}


	render() {
		return (
			<div className="App">
				{Object.keys(this.state).map(key => {
					console.log(`url(require("${key}.png"))`);
					return (
						<div className="icon-container" key={key}>
							<div className="button-container">
								<button className="btn" onClick={() => {
									if (this.state[key] > 0) this.setState({ [key]: this.state[key] - 1 })
								}}>
									<i className="fa fa-minus-circle"/>
								</button>
							</div>
							<div className="icon" style={{ backgroundImage: 'url(' + require(`./img/${key}.png`) + ')' }}>
								<span class="icon-count">
									{this.state[key]}
								</span>
							</div>
							<div className="button-container">
								<button className="btn" onClick={() => this.setState({ [key]: this.state[key] + 1 })}>
									<i className="fa fa-plus-circle"/>
								</button>
							</div>
						</div>)
				})}
			</div>
		);
	}
}

export default App;
