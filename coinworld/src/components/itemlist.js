import React, {useState, Fragment} from 'react';

import { Link } from "react-router-dom";

import { 
  useDispatch,
  useSelector,
} from 'react-redux';


import {
  portfolioDataSelector,
  coinDataSelector,
  setPortfolioData,
} from '../redux/apiCallsSlice';


import ItemDisplay from './itemdisplay';
import ItemEdit from './itemedit';

import PortfolioManager from '../functions/portfoliomanager'


const ItemList = ({editMode}) => {
  const [changes, setChanges] = useState([]);
  const dispatch = useDispatch();

  const selectCoinData = useSelector(coinDataSelector);
  const selectPortfolioData = useSelector(portfolioDataSelector);

  const savePortfolio = () => {
    const updatedPortfolio = PortfolioManager.UpdateData(selectPortfolioData, changes);
    dispatch(setPortfolioData(updatedPortfolio));
    PortfolioManager.Save(updatedPortfolio);
  }

  const portfolioItems = () => {

    let items = [];
    let portfolioData = selectPortfolioData;

    if (portfolioData.length < 1) {
      items.push(<Fragment key={"99999999"}>
        <tr> 
          <td>No coins found in portfolio.</td>
        </tr>
      </Fragment>);

    } else {

      for (let portfolioCoin of portfolioData) {
        let foundCoin = selectCoinData.find(item => item.id === portfolioCoin.id);
        
        if (editMode) {
          items.push(
            <ItemEdit
              key={portfolioCoin.id}
              itemkey={portfolioCoin.id}
              name={foundCoin.name}
              symbol={foundCoin.symbol}
              //price={foundCoin.quotes.USD.price} //coinpaprika data structure
              price={foundCoin.market_data.current_price.usd}
              units={portfolioCoin.units}
              changes={changes}
              setChanges={setChanges}
            />
          );
        } else {
          items.push(
            <ItemDisplay 
              key={portfolioCoin.id}
              itemkey={portfolioCoin.id}
              name={foundCoin.name}
              symbol={foundCoin.symbol}
              //price={foundCoin.quotes.USD.price} //coinpaprika data structure
              price={foundCoin.market_data.current_price.usd}
              units={portfolioCoin.units}
            />
          );
        }
      }

    }



    if (editMode) {
      items.push(<tr key="0" className="add-coin"><td colSpan="6"><Link className="btn btn-danger" to="/portfolio/edit/add">+ Add Coin</Link></td></tr>);

      items.push(<tr key="1" className="portfolio-control">
        <td colSpan="6" className="btn-area">
          <div className="btn-group" role="group" aria-label="Editing Controls">
            
            <Link className="btn btn-warning" to="/portfolio/edit/save" 
              onClick={ () => 
                savePortfolio()
              }
            >Save Changes</Link>
            <Link className="btn btn-primary" to="/portfolio">Cancel Changes</Link>
          </div>
        </td>
      </tr>);
    }

    return items;
  
  }

  return (
    <div className="table-container">
      <table className={editMode ? 
        "table table-sm coin-table edit" : 
        "table table-sm coin-table" 
      }>
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="coin-name">Name</th>
            <th scope="col" className="coin-symbol">Symbol</th>
            <th scope="col" className="coin-price">Price</th>
            <th scope="col" className="coin-units">Units</th>
            <th scope="col" className="coin-value" colSpan="2">Value</th>
          </tr>
        </thead>
        <tbody>
          {portfolioItems()}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;