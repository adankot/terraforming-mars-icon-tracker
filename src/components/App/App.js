import React from 'react';
import './App.scss';
import Icons from '../Icons/Icons'
import Productions from '../Productions/Productions'
import Sidebar from '../Sidebar/Sidebar'
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
  },
  terraformRate: 20,
  generation: 0
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

  closeMenu(key) {
    const newState = { ...this.state.menus, [key]: false }
    this.setState({ menus: newState }, this.storeStates);
  }

  openMenu(key) {
    const newState = { ...this.state.menus, [key]: true }
    this.setState({ menus: newState }, this.storeStates);
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

  onChildUpdate(key, newState) {
	  console.log(key, newState);
    this.setState({ [key]: newState }, this.storeStates);
  }

	render() {
	  const menus = this.state.menus;
	  const isSideBarOpened = menus.icons || menus.productions;
		return (
		  <div>
        <Sidebar
          isActive={this.state.menus.icons}
          name="icons"
          header={`Icons - Generation: ${this.state.generation}`}
          onClose={this.closeMenu.bind(this)}
          body={<Icons icons={this.state.icons} onUpdate={this.onChildUpdate.bind(this)}/>}
        />
        <Sidebar
          isActive={this.state.menus.productions}
          name="productions"
          header={`Productions - Generation: ${this.state.generation}`}
          onClose={this.closeMenu.bind(this)}
          body={<Productions
            productions={this.state.productions}
            resources={this.state.resources}
            terraformRate={this.state.terraformRate}
            generation={this.state.generation}
            onUpdate={this.onChildUpdate.bind(this)}/>
          }
        />
        <div className={`container-fluid app ${isSideBarOpened ? 'd-none' : ''}` }>
          <div className="row">
            <div className="col text-center name">
              Terraforming Mars Icon Tracker
            </div>
          </div>
          <div className="row">
            <div className="col menus text-center">
              <div className="menu">
                <button type="button" onClick={() => {
                  this.toggleMenu('icons');
                }}>
                  <span>Icons</span>
                </button>
              </div>
              <div className="menu">
                <button type="button" onClick={() => {
                  this.toggleMenu('productions');
                }}>
                  <span>Productions</span>
                </button>
              </div>
              <div className="menu">
                <button type="button" onClick={() => {
                  alert('Under development');
                }}>
                  <span>Settings</span>
                </button>
              </div>
              <div className="menu">
                <button type="button" onClick={() => {
                  const isConfirmed = window.confirm('Are you sure you want to reset the counters?');
                  if (isConfirmed) this.resetValues();
                }}>
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}
}

export default App;
