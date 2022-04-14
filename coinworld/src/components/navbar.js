import React from 'react';

import '../styles/navbar.scss';

//eslint-disable-next-line
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faExchangeAlt, faCoins } from '@fortawesome/free-solid-svg-icons';  //faTools



class Navbar extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.currentTarget.className.includes('active'))  e.preventDefault();
  }

  
  render() {
    return (
      <nav className="navbar fixed-bottom navbar-light  btn-group">
        <NavLink className="btn btn-xl" onClick={this.handleClick} to="/portfolio"><FontAwesomeIcon icon={faCoins}/><span className="text">Portfolio</span></NavLink>
        <NavLink className="btn btn-xl" onClick={this.handleClick} to="/analysis"><FontAwesomeIcon icon={faChartArea}/><span className="text">Analysis</span></NavLink>
        <NavLink className="btn btn-xl" onClick={this.handleClick} to="/news"><FontAwesomeIcon icon={faExchangeAlt}/><span className="text">News</span></NavLink>
        
      </nav>
    );
  }
}
//<NavLink className="btn btn-xl" onClick={this.handleClick} to="/settings"><FontAwesomeIcon icon={faTools}/><span className="text">Settings</span></NavLink>
export default Navbar;