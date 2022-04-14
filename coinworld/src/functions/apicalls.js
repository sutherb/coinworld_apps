
/**
 * API CALLS
 * 
 * Interface functions for proxy, which uses the Coinpaprika.com API
 * -tickers
 * returns list of all coin tickers (needs nothing, returns array of all coin ids) 
 * -prices
 * -get historical coin prices (needs list with start date, returns array of object pairs with coin id & array of prices for each)
 * 
 */


//returns overall marketcap details
const getGlobal = async () => {
  const results = await fetch("/api?mode=/getglobal", {method: 'GET', headers: {'Content-Type': 'application/json'}});
  const data = await results.json();
  data.sort((a, b) => (a.rank - b.rank));
  console.log(data)
  return data;
}


/**
[0]:
  beta_value: 1.03718
  circulating_supply: 18355525​​​
  id: "btc-bitcoin"
  last_updated: "2020-05-01T17:52:35Z"​​​
  max_supply: 21000000​​​
  name: "Bitcoin"
  quotes:
    USD:
      ath_date: "2017-12-17T12:19:00Z"
      ath_price: 20089
      market_cap: 161648033568
      market_cap_change_24h: 3.12
      percent_change_12h: 0.08
      percent_change_1h: 0.02​​​​​
      percent_change_1y: 59.57​​​​​
      percent_change_24h: 3.11​​​​​
      percent_change_30d: 41.37​​​​​
      percent_change_7d: 16.03​​​​​
      percent_from_price_ath: -56.16​​​​​
      price: 8806.51182974​​​​​
      volume_24h: 36372253869.284​​​​​
      volume_24h_change_24h: -24.9
 * 
*/

//-returns current coin price details, returns all coin prices or based on list of coin ids.
//-can also set prices in alternative currency, default is USD
//required by portfolio page, and any coin search page
const getTickers = async (coinList, currency) => {
  let apiString = '/api?mode=getalltickers';

  if (coinList && coinList.length) {
    apiString = apiString.concat('&coinlist=')
    coinList.forEach(sym => {
      apiString = apiString.concat(sym+',')
    });
    apiString = apiString.substring(0, apiString.length-1);

    if (currency && currency.length) {
      apiString = apiString.concat('&currency='+currency)
    }
  }
  
  let results = await fetch(apiString, {method: 'GET', headers: {'Content-Type': 'application/json'}});
  let data = await results.json();

  if (data.length > 1) {
    data.sort((a, b) => (a.rank - b.rank));
  }

  return data;
}


//returns history of requested coin.  defaults to Jan 2020 for BTC/USD
//takes coin id, trading pair, start & end dates for args in object (limited to 1 year range)
const getCoinHistory = async (coinRequest) => {
  const apiString = '/api?mode=getcoinhistory';
  console.log(coinRequest)
  let apiRequest = apiString;
  if (coinRequest) {
    apiRequest += `&coinId=${coinRequest.coinId}&quote=${coinRequest.quote}&start=${coinRequest.start}&end=${coinRequest.end}`;
  } else {
    return false;
  }
  //console.log(apiRequest)
  let results = await fetch(apiRequest, {method: 'GET', headers: {'Content-Type': 'application/json'}});
  let data = await results.json();

  if (data.length > 1) {
    data.sort((a, b) => (a.rank - b.rank));
  }

  return data;
}

/*

//returns coin ticker details (symbol, id, active)
const getCoins = async () => {
  let results = await fetch("/api/?mode=getcoins", {method: 'GET', headers: {'Content-Type': 'application/json'}});
  let data = await results.json();
  console.log(data)
  data.sort((a, b) => (a.rank - b.rank));

  return data;
}

*/

//getCoins,
export default {getTickers, getGlobal, getCoinHistory};