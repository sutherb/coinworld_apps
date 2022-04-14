
/**
 * API CALLS
 * 
 * Interface functions for proxy, which uses the coingecko.com API
 * -tickers
 * returns list of all coin tickers (needs nothing, returns array of all coin ids) 
 * -prices
 * -get historical coin prices (needs list with start date, returns array of object pairs with coin id & array of prices for each)
 * 
 */

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
//used in portfolio page (with apicallsslice)

//proxy server is no longer required!  coingecko api doesn't throw CORS error in browser
const CoinGecko = require('coingecko-api');
const gecko = new CoinGecko();


const getTickers = async (coinList, currency) => {
  

  //proxy

  if (coinList){
    let results = await gecko.coins.fetchHistory({'date':'01-04-2022'})
    console.log(results.data)
    return results.data;
  } else {
    let results = await gecko.coins.all();
    console.log(results.data)
    return results.data;
  }

  
}


//returns history of requested coin.  defaults to Jan 2020 for BTC/USD
//takes coin id, trading pair, start & end dates for args in object 
//used in analysis page to populate chart (with apicallsslice)
const getCoinHistory = async (coinRequest) => {
  
  console.log(coinRequest)
  
  if (coinRequest) {
    if (coinRequest.coinId) {
      let results = await gecko.coins.fetchMarketChart(coinRequest.coinId, {vs_currency: coinRequest.vs_currency, date: coinRequest.date});
      console.log(results)
      return {
        coinId: coinRequest.coinId,
        coinDetails: results.data,
      };
      
    } else {
      return {
          coinId: "bitcoin",
          vs_currency: "usd",
          date: "2022-01-01",           
      };
    }

  } else {
    return false;
  }

}


export default {getTickers, getCoinHistory};