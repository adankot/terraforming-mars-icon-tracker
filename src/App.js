import React from 'react';
import './App.css';
const localStorageKey = 'mars-icons';
const initValues = {
  icons: {
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
    none: 0,
  },
  productions: {
    megaCredit: 0,
    steel: 0,
    titanium: 0,
    plant: 0,
    power: 0,
    heat: 0,
  },
  resources: {
    megaCredit: 0,
    steel: 0,
    titanium: 0,
    plant: 0,
    power: 0,
    heat: 0,
  },
  menus: {
    icons: false,
    productions: false,
    resources: false,
  },
  terraformRate: 20,
  generation: 0,
  selectedType: 'productions'
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

  setIcon(key, value) {
    const newState = {...this.state.icons, [key]: value}
    this.setState({icons: newState}, this.storeStates);
  }

  toggleMenu(key) {
    const newState = {};
    for (let menuKey in this.state.menus) {
      if (this.state.menus.hasOwnProperty(menuKey)) {
        if (key === menuKey) {
          newState[key] = !this.state.menus[key];
        } else {
          newState[menuKey] = false;
        }
      }
    }
    this.setState({ menus: newState }, this.storeStates);
  }

  addProduction(key, value) {
    const sum = this.state.productions[key] + value;
    let shouldUpdate = (sum >= 0) || (key === 'megaCredit' && sum >= -5);
    if (shouldUpdate) {
      const newState = { ...this.state.productions, [key]: sum }
      this.setState({ productions: newState }, this.storeStates);
    }
  }

  addResource(key, value) {
    const sum = this.state.resources[key] + value;
    if (sum >= 0) {
      const newState = { ...this.state.resources, [key]: sum }
      this.setState({ resources: newState }, this.storeStates);
    }
  }

  add(type, key, value) {
    if (type === 'productions') {
      this.addProduction(key, value);
    } else if (type === 'resources') {
      this.addResource(key, value);
    }
  }

  addTerraformRate(value) {
    const sum = this.state.terraformRate + value;
    if (sum >= 0) {
      this.setState({ terraformRate: sum }, this.storeStates);
    }
  }

  newGeneration() {
    const newResources = {...this.state.resources};
    newResources.heat = newResources.power + newResources.heat;
    newResources.power = 0;
    for (let key in this.state.productions) {
      if (this.state.productions.hasOwnProperty(key)) {
        let sum = this.state.productions[key] + newResources[key];
        if (key === 'megaCredit') {
          sum += this.state.terraformRate;
        }
        newResources[key] = sum;
      }
    }
    this.setState({
      resources: newResources,
      generation: this.state.generation + 1,
      terraformRate: this.state.terraformRate - 1
    }, this.storeStates);
  }

	render() {
		return (
			<div className="App">
        <div className="generation">
          Generation: {this.state.generation}
        </div>
        <div className="side-buttons">
          <button type="button" onClick={() => {
            this.toggleMenu('icons');
          }}><span>Icons</span></button>
          <button type="button" onClick={() => {
            this.toggleMenu('productions');
          }}><span>Productions</span></button>
        </div>

        <div className="reset-button-container">
          <button type="button" onClick={() => {
            const isConfirmed = window.confirm('Are you sure you want to do the production phase?');
            if (isConfirmed) this.newGeneration();
          }}>New generation</button>
        </div>
        <div className="reset-button-container">
          <button type="button" onClick={() => {
            const isConfirmed = window.confirm('Are you sure you want to reset the counters?');
            if (isConfirmed) this.resetValues();
          }}>Reset</button>
        </div>


        <div className={`icons hidden ${this.state.menus.icons ? "active" : ""}`}>
          <div className="hidden-wrapper">
            <div className="close">
              <button type="button" className="closeButton" onClick={() => {
                this.toggleMenu('icons');
              }}>&times;</button>
            </div>
            {Object.keys(this.state.icons).map(key => {
              return (
                <div className="icon-container" key={key}>
                  <button className="btnMinus" onClick={() => {
                    if (this.state.icons[key] > 0) {
                      this.setIcon(key, this.state.icons[key] - 1);
                    }
                  }}/>
                  <button className="btnPlus" onClick={() => {
                    this.setIcon(key, this.state.icons[key] + 1);
                  }}/>
                  <div className="icon" style={{ backgroundImage: 'url(' + require(`./img/${key}.png`) + ')' }}/>
                  <div className="icon-count-container">
                    <div className="icon-count">
                      {this.state.icons[key]}
                    </div>
                  </div>
                  {key !== "questionMark" && this.state.icons.questionMark > 0 &&
                  <div className="icon-count-extra-container">
                    <div className="icon-count-extra">
                      {this.state.icons[key] + this.state.icons.questionMark}
                    </div>
                  </div>
                  }
                </div>)
            })}
          </div>
        </div>

        <div className={`productions hidden ${this.state.menus.productions ? "active" : ""}`}>
          <div className="hidden-wrapper">
            <div className="close">
              <button type="button" className="closeButton" onClick={() => {
                this.toggleMenu('productions');
              }}>&times;</button>
            </div>
            <div className="table-container">
              <div className="production-wrapper">
                <div className="buttons-wrapper">
                  <button className="add a-1" onClick={() => {
                    this.addTerraformRate(-1);
                  }}>
                    -1
                  </button>
                  <button className="add a-5" onClick={() => {
                    this.addTerraformRate(-5);
                  }}>
                    -5
                  </button>
                  <button className="add a-10" onClick={() => {
                    this.addTerraformRate(-10);
                  }}>
                    -10
                  </button>
                </div>
                <div className="resource-icon-wrapper">
                  <div className="production-icon TR"
                       style={{ backgroundImage: 'url(' + require(`./img/terraformRate.png`) + ')' }}>
                    <div className="production-count">
                      {this.state.terraformRate}
                    </div>
                  </div>
                </div>
                <div className="buttons-wrapper">
                  <button className="add a-1" onClick={() => {
                    this.addTerraformRate(1);
                  }}>
                    +1
                  </button>
                  <button className="add a-5" onClick={() => {
                    this.addTerraformRate(5);
                  }}>
                    +5
                  </button>
                  <button className="add a-10" onClick={() => {
                    this.addTerraformRate(10);
                  }}>
                    +10
                  </button>
                </div>
              </div>
            </div>
            {Object.keys(this.state.productions).map(key => {
              return (
                <div className="table-container" key={key}>
                  <div className="production-wrapper">
                    <div className="buttons-wrapper">
                      <button className="add" onClick={() => {
                        this.add(this.state.selectedType, key, -1);
                      }}>
                        -1
                      </button>
                      <button className="add" onClick={() => {
                        this.add(this.state.selectedType, key, -5);
                      }}>
                        -5
                      </button>
                      <button className="add" onClick={() => {
                        this.add(this.state.selectedType, key, -10);
                      }}>
                        -10
                      </button>
                    </div>
                    <div className={`
                      ${this.state.selectedType === 'productions' ? 'production-icon-bg' : ''}
                      ${this.state.selectedType === 'resources' ? 'resource-icon-wrapper' : ''}
                    `}>
                      <div className={`production-icon ${this.state.selectedType === 'resources' ? 'resource-icon' : ''}`}
                           style={{ backgroundImage: 'url(' + require(`./img/${key}.png`) + ')' }}>
                        <div className="production-count" onClick={() => {
                          this.setState({
                            selectedType: 'productions'
                          }, this.storeStates);
                        }}>
                          {this.state.productions[key]}
                        </div>
                        <div className="resource-count" onClick={() => {
                          this.setState({
                            selectedType: 'resources'
                          }, this.storeStates);
                        }}>
                          {this.state.resources[key]}
                        </div>
                      </div>
                    </div>
                    <div className="buttons-wrapper">
                      <button className="add" onClick={() => {
                        this.add(this.state.selectedType, key, 1);
                      }}>
                        +1
                      </button>
                      <button className="add" onClick={() => {
                        this.add(this.state.selectedType, key, 5);
                      }}>
                        +5
                      </button>
                      <button className="add" onClick={() => {
                        this.add(this.state.selectedType, key, 10);
                      }}>
                        +10
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

			</div>
		);
	}
}

export default App;
