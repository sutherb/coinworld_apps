import React, { useEffect, } from 'react';

import '../styles/Analysis.scss';

import { BrowserRouter as Router } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';

import { 
  useSelector,
  useDispatch,
} from 'react-redux';

import {
  getCoinHistory,
  setSettings,
  coinHistorySelector,
  coinDataSelector,
  settingsSelector,
  portfolioDataSelector,
} from '../redux/apiCallsSlice';

import Chart from '../components/chart';
import Dropdown from '../components/dropdown';
import CustomSelect from '../components/customselect';

import {
  getDate, 
  //tidyRound, 
  findObjectByKey, 
} from '../functions/functions';
import SettingsManager from '../functions/settingsmanager';
//import PortfolioManager from '../functions/portfoliomanager';


const Analysis = () => {

  const dispatch = useDispatch();
  const selectCoinData = useSelector(coinDataSelector);
  const selectCoinHistory = useSelector(coinHistorySelector);
  const selectSettings = useSelector(settingsSelector);
  const selectPortfolioData = useSelector(portfolioDataSelector);
  

  
  const defaultCoinRequest = {
    coinId: "bitcoin",
    vs_currency: "usd",
    date: "30",
    //quote: "usd",
    //start: getDate('month'),
    //end: getDate('today'),
  }

  let selectedItem = defaultCoinRequest.coinId;

  const getCoinByRank = (coinRank) => {
    const coinCode = selectCoinData[coinRank].id;

    chartRefresh('coin-id', coinCode);
    const updatedSettings = SettingsManager.FormatSettingsObject(selectSettings, 'analysis-chart', 'coin-id', coinCode);

    dispatch(setSettings(updatedSettings));
    
    SettingsManager.Save(updatedSettings);
  }


  const getCoinByCode = (listId, coinCode) => {
    
    //if (coinCode === '-') return;

    chartRefresh('coin-id', coinCode);

    const updatedSettings = SettingsManager.FormatSettingsObject(selectSettings, 'analysis-chart', 'coin-id', coinCode);

    dispatch(setSettings(updatedSettings));
    
    SettingsManager.Save(updatedSettings);
  }


  const chartRefresh = (prop, val) => {

    let coinRequest = defaultCoinRequest;

    if (selectSettings['analysis-chart']) {
      if (selectSettings['analysis-chart']['coin-id'] !== undefined) {
        coinRequest['coinId'] = selectSettings['analysis-chart']['coin-id'];
        selectedItem = selectSettings['analysis-chart']['coin-id'];
      }
      if (selectSettings['analysis-chart']['trading-pair'] !== undefined) {
        coinRequest['quote'] = selectSettings['analysis-chart']['trading-pair'];
      }
      if (selectSettings['analysis-chart']['date-range'] !== undefined) {
        coinRequest['start'] = getDate(selectSettings['analysis-chart']['date-range']);
      }
    }


    let change = {};
    switch (prop)  {
      case ('coin-id') : {
        change = {
          coinId: val
        };
        break;
      }
      case ('date-range') : {
        change = {
          start: getDate(val)
        };
        break;
      }
      case ('trading-pair') : {
        change = {
          quote: val
        };
        break;
      }
      //default is don't change anything
      default : {
        change = {};
      }
    }

    const newRequest = Object.assign(coinRequest, change);
    dispatch(getCoinHistory(newRequest));
  }


  const dropdownData = [
    {
      settingName : 'trading-pair',
      defaultItem: 'usd',
      itemList: [
        {label: 'USD',
        value: 'usd'},
        {label: 'BTC',
        value: 'btc'},
      ]
    },
    {
      settingName : 'date-range',
      defaultItem: 'month',
      itemList: [
        //commented out 24 hr setting as coinpaprika API can't show 24hr data
      //  {label: '24hr',
      //  value: 'day'},
        {label: '7d',
        value: 'week'},
        {label: '30d',
        value: 'month'},
        {label: 'YTD',
        value: 'ytd'},
        {label: 'Year',
        value: 'year'},
    //    {label: 'Max',
    //    value: 'max'},
    //commented out Max setting as coinpaprika API limited to 1 year per request (will need to make multiple requests & package that all together, bleh)
      ]
    }
  ];

  
  const buildChart = () => {
    
    console.log(selectCoinData)
    console.log(selectedItem)
    console.log(findObjectByKey(selectCoinData, 'id', selectedItem))
    let chartOptions = {
      'dropdownData': dropdownData,
      'chartLabel' : findObjectByKey(selectCoinData, 'id', selectedItem).name,
    }
    //console.log(chartOptions)
    if (selectCoinHistory.length > 0) {
      return (
        <Chart 
          chartId={'analysis-chart'}
          lineData={selectCoinHistory}
          options={chartOptions}
          chartRefresh={chartRefresh}
        />
      );
    }
  }


  const buildDropdown = () => {

    let list = [];
    let ddSelectedItem = defaultCoinRequest.coinId;

    if (selectPortfolioData.length > 0) {
      for (let coin in selectPortfolioData) {
        list[coin] = (
          {
            label: findObjectByKey(selectCoinData, 'id', selectPortfolioData[coin].id).name,
            value : selectPortfolioData[coin].id
          }
        )
      }
      
      if (selectSettings['analysis-chart']) {
        if (selectSettings['analysis-chart']['coin-id'] !== undefined) {
          selectedItem = selectSettings['analysis-chart']['coin-id'];
        }
      }

      
      ddSelectedItem = selectedItem;
      if (!findObjectByKey(selectPortfolioData, 'id', selectedItem))  ddSelectedItem = list[0].value;
    } else {
      list[0] = {
        label: 'Bitcoin',
        value: 'bitcoin'
      }
      
    }

    return (
      <Dropdown 
        key={0}
        listId={'portfolio'}
        selectedItem={ ddSelectedItem }
        listItems={list}
        buttonAction={getCoinByCode}
      />
    );
  }

  useEffect(() => {

    let coinRequest = defaultCoinRequest;
    
    if (selectSettings['analysis-chart']) {
      if (selectSettings['analysis-chart']['coin-id'] !== undefined) {
        coinRequest['coinId'] = selectSettings['analysis-chart']['coin-id'];
        //selectedItem = selectSettings['analysis-chart']['coin-id'];
      }
      if (selectSettings['analysis-chart']['trading-pair'] !== undefined) {
        //coinRequest['quote'] = selectSettings['analysis-chart']['trading-pair'];
        coinRequest['vs_currency'] = selectSettings['analysis-chart']['trading-pair'];
      }
      if (selectSettings['analysis-chart']['date-range'] !== undefined) {
        //coinRequest['start'] = getDate(selectSettings['analysis-chart']['date-range']);
        coinRequest['date'] = getDate(selectSettings['analysis-chart']['date-range']);
      }
    }

    dispatch(getCoinHistory(coinRequest));

    
    //const setTimeoutSeconds = 1;
    //const setIntervalSeconds = 10;
  
    /*
    setTimeout(() => {
      
      setInterval(() => {

        //const dt = new Date()

        //dispatch(getCoinData());
        dispatch(getCoinHistory(coinRequest));

        //dispatch(getCoinDataDemo());
        //dispatch(getCoinHistoryDemo());
      }, setIntervalSeconds*1000)
    }, setTimeoutSeconds*1000);
    */
    
    // following comment is used to remove warnings about defaultCoinRequest missing dependacy warning (remove to enable warning again) :
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  let hidePortfolioSelector = 'hide';
  if (selectPortfolioData.length < 1) {
    hidePortfolioSelector = 'hide';
  } else {
    hidePortfolioSelector = '';
  }
  
  
  
  


  return (

    <Router>
      <section id="coin-analysis">
        <div className="page-header"><span className="header-icon"><FontAwesomeIcon icon={faChartArea}/></span><h2>Analysis</h2></div>
        <div className="container">
          <div className="row">
            <div id="portfolio-select" className={'col-sm ' + hidePortfolioSelector}>
              <span>Select from Portfolio:</span>
              { buildDropdown() }
            </div>
            <div id="coin-select" className="col-sm">
              <CustomSelect
                options={selectCoinData}
                dropdownCountLimit="5"
                placeholder="Type to search any coin..."
                selectedAction={getCoinByRank}
              />
            </div>

          </div>
          <div className="chart-container">
            { buildChart() }
          </div>
        </div>
      </section>
    </Router>
  );
  
}

export default Analysis;