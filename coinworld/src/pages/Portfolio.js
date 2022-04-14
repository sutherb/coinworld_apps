import React from 'react';

import '../styles/Portfolio.scss';

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

import PortfolioManager from '../functions/portfoliomanager';

import { 
  useSelector,
  useDispatch,
} from 'react-redux';

import {
  portfolioDataSelector,
  coinDataSelector,
  //apiReadySelector,
  setPortfolioData,
  //getCoinPortfolioData,
} from '../redux/apiCallsSlice';

import { tidyRound } from '../functions/functions';
import CoinSearch from '../components/coinsearch';
import ItemList from '../components/itemlist';

import Modal from '../components/modal';
//import { current } from '@reduxjs/toolkit';

const Portfolio = () => {

  //const selectApiReady = useSelector(apiReadySelector);
  const selectCoinData = useSelector(coinDataSelector);
  const selectPortfolioData = useSelector(portfolioDataSelector);

  const dispatch = useDispatch();

  const addCoin = (data) => {
    const portfolioData = PortfolioManager.UpdateData(selectPortfolioData, [data]);
    dispatch(setPortfolioData(portfolioData));
    PortfolioManager.Save(portfolioData);
  }

  
  const currentUrlPath = window.location.pathname.replace('/','');
  console.log(selectPortfolioData.length)
  if (selectPortfolioData.length < 1 && currentUrlPath !== 'intro' && currentUrlPath !== 'portfolio/edit/add' && currentUrlPath !== 'portfolio/edit/save')   return <Redirect to={'/intro'} />;
  

  
  
  return (
    <Router>
      <section id="portfolio-list">
        <div className="page-header"><span className="header-icon"><FontAwesomeIcon icon={faCoins} /></span><h2>Your Portfolio</h2></div>
        <Switch>
          <Route exact path={'/portfolio'}>
            <div className="container">
              <h3>$ { 
                tidyRound(PortfolioManager.TotalValue(selectCoinData, selectPortfolioData), ',') 
              }</h3>
                <Modal/>
                <ItemList 
                  editMode={false}
                />
              <p>Boop the Edit button to add, edit, or remove coins from your portfolio</p>
              <Link className="btn btn-danger" to = "/portfolio/edit">Edit Portfolio</Link>
            </div>
          </Route>
          <Route exact path={'/portfolio/edit/save'}>
            <div id="portfolio-saved" className="container">
              <h2>SUCCESS</h2>
              <p>Changes saved to portfolio!</p>
              <Link className="btn btn-primary" to="/portfolio">Back to Portfolio</Link>
            </div>
          </Route>
          <Route exact path={'/portfolio/edit/add'}>
            <div className="container">
              <CoinSearch
                coinData={selectCoinData}
                portfolioData={selectPortfolioData}
                selectionAction={addCoin}
              />
              {(selectPortfolioData.length > 0) ? <Link className="btn btn-primary mt-3" to="/portfolio/edit/">Back to Edit Portfolio</Link> : ''}
            </div>
          </Route>
          <Route exact path={'/portfolio/edit'}>
            <div className="container">
              <p>Add a new coin, remove existing coins, or change number of units.</p>
              <p>Click Save Portfolio to commit your changes, or Cancel to go back.</p>
              <ItemList 
                editMode={true}
              />
            </div>
          </Route>
        </Switch>
      </section>
    </Router>
  );
}

export default Portfolio;