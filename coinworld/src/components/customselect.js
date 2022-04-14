import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import { delayedAction } from '../functions/functions';

//regular Select component doesn't appear to limit size.  created custom select to allow this feature (& to learn more about React !)
class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      dropdownHtml: '',
      selection: '',
      searchIcon: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.returnSelection = this.returnSelection.bind(this);
    this.clearText = this.clearText.bind(this);
  }

  componentDidMount() {
    document.querySelector(".form-control").focus();
  }

  returnSelection(selection) {
    this.props.selectedAction(selection);
  }

  clearText(e) {
    let inputField = e.target.parentNode.className === 'search-icon'? e.target.parentNode.previousSibling : e.target.parentNode.parentNode.previousSibling;
    inputField.value = '';
    this.setState({searchIcon: ''});
  }

  chosenCoin(e) {
    this.returnSelection(e.target.id);
    this.setState({searchIcon: ''});
    this.setState({dropdownHtml: ''});
    e.target.parentNode.parentNode.parentNode.firstChild.value = '';
  }

  //blurs any dropdowns that are open
  handleBlur(e) {
    if (e.target.parentNode.className === 'dropdown-form' || e.target.parentNode.parentNode.className === 'dropdown') {
      //action is delayed because element is not quite ready in browser dom, this enables hiding the dropdown after it's rendered
      delayedAction(() => {
        if (document.activeElement.className !== 'dropdown-item' && document.activeElement.className !== 'form-control') {
          this.setState({dropdownOpen: false});
        }
      });
    }
  }

  handleFocus(e) {
    if (e.target.className === 'form-control' && e.target.value !== '') {
      this.setState({dropdownOpen: true})
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' || e.key === 'Space') {
      this.chosenCoin(e);
    }
  }

  handleClick(e) {
    this.chosenCoin(e);
  }

  handleChange(e) {
    let i, childDivs = [], val = e.target.value, dropdownCount = 0;
    if (!val) {
      this.setState({searchIcon: ''});
      this.setState({dropdownHtml: ''});
      this.setState({dropdownOpen: false});
      return false;
    }
    this.setState({searchIcon: 'show'});

    //for each name in the array...
    for (i = 0; i < this.props.options.length; i++) {
      //check if the item starts with the same letters as the text field value:
      if (this.props.options[i].id.substr(0, val.length).toUpperCase() === val.toUpperCase() || this.props.options[i].name.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        let thisVal = this.props.options[i].name + " (" + this.props.options[i].id + ")";
        childDivs.push(<Fragment key={i}>
            <li>
              <button
                className="dropdown-item" tabIndex="0" 
                value={thisVal} 
                id={i} 
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyPress}
                onClick={this.handleClick}
              >
                {this.props.options[i].name} ({this.props.options[i].id.split('-')[0].toUpperCase()})
              </button>
            </li>
        </Fragment>);
        //stop generating dropdown items, according to whatever was passed when dropdown called
        ++dropdownCount;
        if (dropdownCount >= this.props.dropdownCountLimit) {break;}
      }
    }

    this.setState({dropdownHtml: childDivs});
    this.setState({dropdownOpen: true});
  }

  render () {
    return (
      <form autoComplete="off" action="/" className="dropdown-form" >
        <input
          onChange={this.handleChange} 
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          className="form-control" 
          type="text"
          autoFocus={true}
          placeholder={this.props.placeholder}
        />
        <span className="search-icon" >
          <FontAwesomeIcon icon={faSearch} className={this.state.searchIcon} />
          <FontAwesomeIcon icon={faTimes} className={this.state.searchIcon} onClick={this.clearText} />
        </span>
        {this.state.dropdownOpen && (
          <ul className="dropdown">
              {this.state.dropdownHtml}
          </ul>
        )}
      </form>
    );
  }
}

export default CustomSelect;