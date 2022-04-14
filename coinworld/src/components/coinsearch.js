import React from 'react';
import { Link } from "react-router-dom";

import CustomSelect from './customselect';
import PortfolioManager from '../functions/portfoliomanager';

import { 
  tidyRound,
} from '../functions/functions';


//CoinSearch includes search input box and results dropdown 

//props include coinData, portfolioManager, returnNewCoin (addNewCoin)
class CoinSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCoin: {},
      previewCoin: false,
    };
    this.selectedCoinData = this.selectedCoinData.bind(this);
    this.returnSelection = this.returnSelection.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  selectedCoinData(coinId) {
    this.setState({selectedCoin: this.props.coinData[coinId]});
    this.setState({previewCoin: true});
    //console.log(this.props.coinData[coinId].market_data.current_price.usd)
  }
  
  returnSelection(coinId, units) {
    this.props.selectionAction({'id': coinId, 'units': units});
  }

  handleChange(inputType, price) {
    let inputValue = document.getElementById(inputType).value;
    document.getElementById('coin-value').innerHTML = tidyRound(inputValue * price, ',');
  }

  render () {
    const { error } = this.state;
    if (error) {
      return <p>{error}</p>;
    }
//for use with coinpaprika data scheme
//<td><span className="sign">{tidyRound(this.state.selectedCoin.quotes.USD.price, ',')}</span></td>
    return (
      <div id="coin-search">
        <h3>Add Coin</h3>
        <p>Type to search for a coin to add to your portfolio:</p>
        <CustomSelect
          options={this.props.coinData}
          dropdownCountLimit="20"
          placeholder="Type to Search..."
          selectedAction={this.selectedCoinData}
        />
        {(() => {
          let isInPortfolio = PortfolioManager.NewCoinOrNot(this.props.portfolioData, this.state.selectedCoin.id);

          if (this.state.previewCoin && !isInPortfolio) {
            return (
              <table className={'coin-table coin-preview table table-' + this.state.appTheme}>
                <thead>
                  <tr>
                    <th>Name</th><th>Symbol</th><th>Price</th><th>Units</th><th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.selectedCoin.name}</td>
                    <td>{this.state.selectedCoin.symbol}</td>
                    <td><span className="sign">{tidyRound(this.state.selectedCoin.market_data.current_price.usd, ',')}</span></td>
                    <td><input id="coin-units" className="form-control" placeholder="units.." 
                        onChange={() => this.handleChange('coin-units', this.state.selectedCoin.market_data.current_price.usd)}
                    /></td>
                    <td><span className="sign" id="coin-value">0</span></td>
                  </tr>
                  <tr>
                    <td colSpan="5"><Link className="btn btn-danger btn-block" to = "/portfolio/edit/save" onClick={ () => this.returnSelection(this.state.selectedCoin.id, document.getElementById('coin-units').value) }>Add Coin</Link></td>
                  </tr>
                </tbody>
              </table>
            );
          }
          if (isInPortfolio) {
            return (<p><b>{this.state.selectedCoin.name}</b> is already in your portfolio! Try searching for a different coin, or go back to edit your portfolio.</p>);
          }

        })()}
        
      </div>
    )
  };

}

export default CoinSearch;