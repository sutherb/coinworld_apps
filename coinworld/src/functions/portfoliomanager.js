
/**
 * PORTFOLIO MANAGER
 * 
 * Functions for managing portfolio data.  Saves/load from localstorage in browser, add/remove coins & update unit amounts
 * 
 * 
*/


//returns data from localstorage
const Load = async () => {
  const storedPortfolio = localStorage.getItem('portfolioData');
  if (storedPortfolio === 'undefined' || storedPortfolio === null) {
    return [];
  } else {
    return JSON.parse(storedPortfolio);
  } 
}

const Save = (portfolioData) => {
  const dataString = JSON.stringify(portfolioData);
  //URLSearchParams(window.location.search).set('portfoliodata', dataString);
  localStorage.setItem('portfolioData', dataString);
}

//returns total value of portfolio, based on current prices
const TotalValue = (coinData, portfolioData) => {
  let totalValue = 0;
  for (let portfolioCoin of portfolioData) {
    let foundCoin = coinData.find(coin => coin.id === portfolioCoin.id);
    //totalValue += portfolioCoin.units * foundCoin.quotes.USD.price;  //coinpaprika data structure
    totalValue += portfolioCoin.units * foundCoin.market_data.current_price.usd;
  }
  return totalValue;
} 

//ckeck for whether a coin is already in the portfolio, returns true or false
const NewCoinOrNot = (portfolioData, coinId) => {
  return portfolioData.find(c => c.id === coinId) ? true : false;
} 

//updates units per coin in portfolio data object.  also removes coin from portfolio if units = 0
//both sets of data should be arrays of objects {id, units}
const UpdateData = (portfolioData, newData) => {

  //case when adding first coin to portfolio 
  if (portfolioData.length < 1) return newData;
  //slice will deep copy object
  let tmpPortfolioData = portfolioData.slice();
  
  for (let newCoin of newData) {
    //if units are smaller than 0
    if (newCoin.units > 0) {
      const foundCoinIndex = tmpPortfolioData.findIndex(coin => coin.id === newCoin.id);
      //replaces units in existing portfolio
      if (foundCoinIndex >= 0) {
        tmpPortfolioData.splice(foundCoinIndex, 1, newCoin);
      //coin wasn't found so add it to portfolio
      } else {
        tmpPortfolioData.push(newCoin);
      }
      
    //case covers when coin is to be deleted from portfolio (looks for zero units in newData)
    } else {
      tmpPortfolioData.splice(tmpPortfolioData.findIndex(coin => coin.id === newCoin.id), 1);
    }
  }

  return tmpPortfolioData;
} 


export default {Load, Save, TotalValue, NewCoinOrNot, UpdateData };