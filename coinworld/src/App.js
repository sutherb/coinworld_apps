import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import Navbar from './components/navbar';
import Intro from './pages/Intro';
import Portfolio from './pages/Portfolio';
import Trade from './pages/Trade';
import Analysis from './pages/Analysis';
import News from './pages/News';
import Settings from './pages/Settings';

import { 
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  getCoinPortfolioData,
  getSettings,
  apiReadySelector,
  settingsSelector,
  setSettings,
  //portfolioDataSelector,
  //getCoinDataDemo,
//  getCoinPortfolioDataDemo,
} from './redux/apiCallsSlice';

//import Apiworker from './functions/apiworker.js';


import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootswatch/dist/darkly/bootstrap.min.css';
//import 'bootswatch/dist/lumen/bootstrap.min.css';
import './styles/App.scss';

import SettingsManager from './functions/settingsmanager';

//bitcoin symbol = &#8383;

const App = () => {
 
  const dispatch = useDispatch();
  const selectApiReady = useSelector(apiReadySelector);
  //const selectPortfolioData = useSelector(portfolioDataSelector);

  const defaultSettings = {
    global: {
      theme: 'dark',
    },
  }

  const [appReady, setAppReady] = useState(false);
  const [appTheme, setAppTheme] = useState(defaultSettings.global.theme);
  

  const selectSettings = useSelector(settingsSelector);

  const toggleTheme = () => {
    const newTheme = appTheme === 'dark' ? 'light' : 'dark'
    setAppTheme(newTheme);
    const settingsData = SettingsManager.FormatSettingsObject(selectSettings, "global", "theme", newTheme);
    dispatch(setSettings(settingsData));
    SettingsManager.Save(settingsData);
  }


  useEffect(() => {

    //DEMO MODE: use these 2 functions to use stale coin data (useful when proxy not available)
   // dispatch(getCoinPortfolioDataDemo());
   // dispatch(getCoinHistoryDemo());
    
    //NORMAL MODE: use these 2 functions when proxy server is available
    dispatch(getCoinPortfolioData());

    dispatch(getSettings()); 
 
    


   // const setTimeoutSeconds = 1;
   // const setIntervalSeconds = 6000;

    /*
      setTimeout(() => {
        
        setInterval(() => {

          //const dt = new Date()

          dispatch(getCoinData());

          //dispatch(getCoinDataDemo());
          //dispatch(getCoinHistoryDemo());
        }, setIntervalSeconds*1000)
      }, setTimeoutSeconds*1000);
    */

      
  }, [dispatch]);

  if (!appReady) {
    
    if (!selectApiReady.coinData || !selectApiReady.portfolioData) return <section id="loader"><div id="spinner"></div></section>;
    if (selectApiReady.coinData && selectApiReady.portfolioData) setAppReady(true);

    

    if (!selectSettings.global) {
      setAppTheme(defaultSettings.global.theme);
      const settingsData = SettingsManager.FormatSettingsObject(selectSettings, "global", "theme", appTheme);      
      dispatch(setSettings(settingsData));
      SettingsManager.Save(settingsData);
    } else {
      setAppTheme(selectSettings.global.theme);
    }

  }
  
  
  return (
    <div className={'App ' + appTheme}>
      <Router>
        <header className="App-header">
          <div className="fixed-top">
            <h1>Coin World!</h1>
            <button id="theme-toggle" className="btn btn-xl" onClick={() => toggleTheme()}><FontAwesomeIcon className="moon" icon={faMoon}/><FontAwesomeIcon className="sun" icon={faSun}/></button>
          </div>
        </header>
        <div id="Appbody">
          <Switch>
            <Route path="/portfolio">
              <Portfolio/>
            </Route>
            <Route path="/trade">
              <Trade/>
            </Route>
            <Route path="/analysis">
              <Analysis/>
            </Route>
            <Route path="/news">
              <News/>
            </Route>
            <Route path="/settings">
              <Settings/>
            </Route>
            <Route path="/">
              <Intro/>
            </Route>
          </Switch>
        </div>
        <footer className="App-footer">
          <Navbar />
        </footer>
      </Router>
    </div>
  );

}

export default App;