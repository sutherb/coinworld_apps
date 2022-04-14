import { createSlice } from '@reduxjs/toolkit';
import ApiCalls from '../functions/apicalls_g_direct';
import PortfolioManager from '../functions/portfoliomanager';
import SettingsManager from '../functions/settingsmanager';

export const apiCallsSlice = createSlice({
  name: 'apiData',
  initialState: {
    coinData: [],
    portfolioData: [],
    settings: [],
    coinHistory: [],
    apiReady: {
      coinData: false,
      portfolioData: false,
      coinHistory: false,
      introMode: false,
    },
  },
  reducers: {
    setSettings: (state, {payload}) => {
      state.settings = payload;
    },

    setCoinData: (state, {payload}) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(payload)
      state.coinData = payload;
      state.apiReady.coinData = true;
    },
    setCoinHistory: (state, {payload}) => {
      state.coinHistory = [payload.coinDetails.prices];
      console.log(state.coinHistory)
      state.apiReady.coinHistory = true; 
    },
    setPortfolioData: (state, {payload}) => {
      state.portfolioData = payload;
      state.apiReady.portfolioData = true;
    },
    setLoading: (state, {payload}) => {
      state.apiReady[payload] = false;
    },
    setIntroMode: (state, {payload}) => {
      state.apiReady.introMode = true;
    }
  },
});

export const { 
  setCoinData, 
  setCoinHistory, 
  setPortfolioData,
  setSettings,
  setLoading,

} = apiCallsSlice.actions;


// The function below is called a selector and allows us to select a value from the state. 
// Selectors can also be defined inline where they're used instead of in the slice file. 
// For example: `useSelector((state) => state.counter.value)`
//also, to avoid wasting another Sunday on dumb syntax errors, remember!  selectors = state.nameofslice.whatevertoselect  
export const portfolioDataSelector = state => state.apiData.portfolioData;
export const coinDataSelector = state => state.apiData.coinData;
export const coinHistorySelector = state => state.apiData.coinHistory;
export const apiReadySelector = state => state.apiData.apiReady;
export const settingsSelector = state => state.apiData.settings;


export default apiCallsSlice.reducer;


// The function below is called a thunk and allows us to perform async logic. 
// It can be dispatched like a regular action: `dispatch(incrementAsync(10))`. 
// This will call the thunk with the `dispatch` function as the first argument. 
// Async code can then be executed and other actions can be dispatched


//disabled in App.js, only needed if simulating timeout
/*
export const getCoinData = () => dispatch => {
  dispatch(setLoading('coinData'));
  ApiCalls.getTickers()
  .then((res) => {
    dispatch(setCoinData(res));
  });
};
*/

//used for retrieving history in Analysis chart
export const getCoinHistory = (coinRequest) => dispatch => {
  console.log('coinHistory')
  console.log(coinRequest)
  dispatch(setLoading('coinHistory'));
  if (coinRequest) {
    
    ApiCalls.getCoinHistory(coinRequest)
    .then((res) => {
      console.log(res)
      dispatch(setCoinHistory(res));
    });
  }

};


//disabled, never used
/*
export const getPortfolioData = () => dispatch => {
  dispatch(setLoading('portfolioData'));
  PortfolioManager.Load()
  .then((res) => {
    dispatch(setPortfolioData(res));
  });
  
};
*/

//used to retrieve portfolio data from localstorage in App.js
export const getCoinPortfolioData = () => async dispatch => {
  dispatch(setLoading('coinData'));

  ApiCalls.getTickers()
  .then((res) => {
    dispatch(setCoinData(res));
    dispatch(setLoading('portfolioData'));
    PortfolioManager.Load()
    .then((res) => {
      dispatch(setPortfolioData(res));
    });
  });
  
}



//demo, allows app to run without api proxy server
export const getCoinHistoryDemo = () => dispatch => {
  dispatch(setLoading('coinHistory'));

  const data = {
    id: 'btc-bitcoin',
    coinDetails: [
      {
        time_open: '2020-05-01T00:00:00Z',
        time_close: '2020-05-01T23:59:59Z',
        open: 8671.04211065,
        high: 9095.90579488,
        low: 8671.04211065,
        close: 8905.28199041,
        volume: 33767317698,
        market_cap: 159151341763
      },
      {
        time_open: '2020-05-02T00:00:00Z',
        time_close: '2020-05-02T23:59:59Z',
        open: 8891.98583845,
        high: 9060.00068811,
        low: 8770.57599781,
        close: 9040.22748367,
        volume: 29355329941,
        market_cap: 163222287953
      },
      {
        time_open: '2020-05-03T00:00:00Z',
        time_close: '2020-05-03T23:59:59Z',
        open: 9040.73366764,
        high: 9305.99965856,
        low: 8847.22904733,
        close: 8927.58887813,
        volume: 32894333585,
        market_cap: 165969336633
      },
      {
        time_open: '2020-05-04T00:00:00Z',
        time_close: '2020-05-04T23:59:59Z',
        open: 8932.48701157,
        high: 9086.17946416,
        low: 8666.29705885,
        close: 8910.39250861,
        volume: 32344378082,
        market_cap: 164000908156
      },
      {
        time_open: '2020-05-05T00:00:00Z',
        time_close: '2020-05-05T23:59:59Z',
        open: 8902.11842281,
        high: 9028.06304397,
        low: 8851.7369147,
        close: 8924.15289137,
        volume: 28947845348,
        market_cap: 163461036760
      },
      {
        time_open: '2020-05-06T00:00:00Z',
        time_close: '2020-05-06T23:59:59Z',
        open: 8977.00174196,
        high: 9377.18254183,
        low: 8910.93316819,
        close: 9222.9443333,
        volume: 35650272008,
        market_cap: 164853767713
      },
      {
        time_open: '2020-05-07T00:00:00Z',
        time_close: '2020-05-07T23:59:59Z',
        open: 9201.25648222,
        high: 9962.66410004,
        low: 9114.55513226,
        close: 9952.81626146,
        volume: 45618613730,
        market_cap: 168989706074
      },
      {
        time_open: '2020-05-08T00:00:00Z',
        time_close: '2020-05-08T23:59:59Z',
        open: 9877.18888304,
        high: 10029.30130192,
        low: 9777.78456129,
        close: 9846.46576386,
        volume: 36388737362,
        market_cap: 181422111439
      },
      {
        time_open: '2020-05-09T00:00:00Z',
        time_close: '2020-05-09T23:59:59Z',
        open: 9838.02444262,
        high: 9928.33569425,
        low: 9583.99189462,
        close: 9590.92321622,
        volume: 34445002509,
        market_cap: 180719589998
      },
      {
        time_open: '2020-05-10T00:00:00Z',
        time_close: '2020-05-10T23:59:59Z',
        open: 9566.35874181,
        high: 9566.35874181,
        low: 8385.54717103,
        close: 8762.78233268,
        volume: 48743348137,
        market_cap: 175745489717
      },
      {
        time_open: '2020-05-11T00:00:00Z',
        time_close: '2020-05-11T23:59:59Z',
        open: 8772.65235053,
        high: 9073.89433995,
        low: 8294.48097219,
        close: 8618.47994236,
        volume: 43843691766,
        market_cap: 161182792748
      },
      {
        time_open: '2020-05-12T00:00:00Z',
        time_close: '2020-05-12T23:59:59Z',
        open: 8625.00434246,
        high: 8952.75469524,
        low: 8588.11155647,
        close: 8818.7222054,
        volume: 29846672044,
        market_cap: 158485696793
      },
      {
        time_open: '2020-05-13T00:00:00Z',
        time_close: '2020-05-13T23:59:59Z',
        open: 8825.88177081,
        high: 9391.84650474,
        low: 8825.88177081,
        close: 9304.46034364,
        volume: 34791786053,
        market_cap: 162184791759
      },
      {
        time_open: '2020-05-14T00:00:00Z',
        time_close: '2020-05-14T23:59:59Z',
        open: 9314.4999072,
        high: 9826.58613916,
        low: 9209.17331103,
        close: 9722.30860573,
        volume: 39893904425,
        market_cap: 171170646007
      },
      {
        time_open: '2020-05-15T00:00:00Z',
        time_close: '2020-05-15T23:59:59Z',
        open: 9722.40024758,
        high: 9763.19833285,
        low: 9235.94990203,
        close: 9310.10948272,
        volume: 36262122509,
        market_cap: 178673595275
      },
      {
        time_open: '2020-05-16T00:00:00Z',
        time_close: '2020-05-16T23:59:59Z',
        open: 9319.46187459,
        high: 9575.44942476,
        low: 9253.04588716,
        close: 9397.15297077,
        volume: 28722153718,
        market_cap: 171275689099
      },
      {
        time_open: '2020-05-17T00:00:00Z',
        time_close: '2020-05-17T23:59:59Z',
        open: 9399.58479496,
        high: 9865.0424894,
        low: 9371.57227827,
        close: 9679.9269566,
        volume: 30951896016,
        market_cap: 172755796110
      },
      {
        time_open: '2020-05-18T00:00:00Z',
        time_close: '2020-05-18T23:59:59Z',
        open: 9678.33297506,
        high: 9925.98165846,
        low: 9571.40995822,
        close: 9744.90778298,
        volume: 31975271410,
        market_cap: 177884856581
      },
      {
        time_open: '2020-05-19T00:00:00Z',
        time_close: '2020-05-19T23:59:59Z',
        open: 9734.22439585,
        high: 9873.06218669,
        low: 9516.14759246,
        close: 9772.26267056,
        volume: 31290763431,
        market_cap: 178920096458
      },
      {
        time_open: '2020-05-20T00:00:00Z',
        time_close: '2020-05-20T23:59:59Z',
        open: 9784.25785001,
        high: 9814.85363783,
        low: 9431.02831133,
        close: 9531.30833308,
        volume: 29738915884,
        market_cap: 179846644999
      },
      {
        time_open: '2020-05-21T00:00:00Z',
        time_close: '2020-05-21T23:59:59Z',
        open: 9527.68821233,
        high: 9569.17638839,
        low: 8850.16091895,
        close: 9077.27717776,
        volume: 32474390681,
        market_cap: 175137488334
      },
      {
        time_open: '2020-05-22T00:00:00Z',
        time_close: '2020-05-22T23:59:59Z',
        open: 9055.91332717,
        high: 9264.07702064,
        low: 8975.42632593,
        close: 9184.60445982,
        volume: 25460271287,
        market_cap: 166472590715
      },
      {
        time_open: '2020-05-23T00:00:00Z',
        time_close: '2020-05-23T23:59:59Z',
        open: 9191.92247927,
        high: 9323.00405618,
        low: 9132.37599281,
        close: 9196.66531755,
        volume: 21693249192,
        market_cap: 168979421948
      },
      {
        time_open: '2020-05-24T00:00:00Z',
        time_close: '2020-05-24T23:59:59Z',
        open: 9196.52705681,
        high: 9305.41721214,
        low: 8780.25887866,
        close: 8785.33462448,
        volume: 24637170280,
        market_cap: 169070903076
      },
      {
        time_open: '2020-05-25T00:00:00Z',
        time_close: '2020-05-25T23:59:59Z',
        open: 8760.15068138,
        high: 8966.7746796,
        low: 8713.78432683,
        close: 8916.97857163,
        volume: 24877349063,
        market_cap: 161054879708
      },
      {
        time_open: '2020-05-26T00:00:00Z',
        time_close: '2020-05-26T23:59:59Z',
        open: 8908.02950284,
        high: 8996.14289094,
        low: 8741.68318302,
        close: 8844.50905363,
        volume: 22571144271,
        market_cap: 163780580731
      },
      {
        time_open: '2020-05-27T00:00:00Z',
        time_close: '2020-05-27T23:59:59Z',
        open: 8853.08124454,
        high: 9208.07278026,
        low: 8832.91713355,
        close: 9187.58867295,
        volume: 23727389353,
        market_cap: 162777010094
      },
      {
        time_open: '2020-05-28T00:00:00Z',
        time_close: '2020-05-28T23:59:59Z',
        open: 9195.30173029,
        high: 9602.67656772,
        low: 9134.13519831,
        close: 9560.2300302,
        volume: 26568908275,
        market_cap: 169077341614
      },
      {
        time_open: '2020-05-29T00:00:00Z',
        time_close: '2020-05-29T23:59:59Z',
        open: 9573.20764303,
        high: 9585.47611578,
        low: 9375.00862317,
        close: 9445.01232568,
        volume: 25269010977,
        market_cap: 176033874890
      },
      {
        time_open: '2020-05-30T00:00:00Z',
        time_close: '2020-05-30T23:59:59Z',
        open: 9435.98759654,
        high: 9707.06461325,
        low: 9363.51126241,
        close: 9682.98231951,
        volume: 26332845054,
        market_cap: 173518083397
      },
      {
        time_open: '2020-05-31T00:00:00Z',
        time_close: '2020-05-31T23:59:59Z',
        open: 9697.33713142,
        high: 9697.33713142,
        low: 9431.72379923,
        close: 9459.35808483,
        volume: 23899416963,
        market_cap: 178333544980
      },
      {
        time_open: '2020-06-01T00:00:00Z',
        time_close: '2020-06-01T23:59:59Z',
        open: 9469.5138161,
        high: 10279.11055888,
        low: 9445.05914195,
        close: 10203.65638744,
        volume: 29141589713,
        market_cap: 174152644902
      },
      {
        time_open: '2020-06-02T00:00:00Z',
        time_close: '2020-06-02T23:59:59Z',
        open: 10198.8282945,
        high: 10198.8282945,
        low: 9429.39921791,
        close: 9539.60171514,
        volume: 31057161774,
        market_cap: 187573790343
      },
      {
        time_open: '2020-06-03T00:00:00Z',
        time_close: '2020-06-03T23:59:59Z',
        open: 9544.76624733,
        high: 9676.76265078,
        low: 9463.29488018,
        close: 9676.76265078,
        volume: 21356526534,
        market_cap: 175552409091
      },
      {
        time_open: '2020-06-04T00:00:00Z',
        time_close: '2020-06-04T23:59:59Z',
        open: 9666.77568699,
        high: 9863.96118996,
        low: 9515.82892739,
        close: 9804.79951205,
        volume: 20862559785,
        market_cap: 177804630251
      },
      {
        time_open: '2020-06-05T00:00:00Z',
        time_close: '2020-06-05T23:59:59Z',
        open: 9795.87076474,
        high: 9844.59406647,
        low: 9646.7726782,
        close: 9646.7726782,
        volume: 18774518803,
        market_cap: 180188489279
      },
      {
        time_open: '2020-06-06T00:00:00Z',
        time_close: '2020-06-06T23:59:59Z',
        open: 9641.24182136,
        high: 9751.30480109,
        low: 9574.74486629,
        close: 9695.22326371,
        volume: 15773242917,
        market_cap: 177354981862
      },
      {
        time_open: '2020-06-07T00:00:00Z',
        time_close: '2020-06-07T23:59:59Z',
        open: 9694.93651099,
        high: 9782.9202078,
        low: 9472.48371645,
        close: 9746.10659914,
        volume: 19787057720,
        market_cap: 178354654307
      },
      {
        time_open: '2020-06-08T00:00:00Z',
        time_close: '2020-06-08T23:59:59Z',
        open: 9753.59275279,
        high: 9804.72133257,
        low: 9675.11862426,
        close: 9795.48446658,
        volume: 17130687461,
        market_cap: 179443429548
      },
      {
        time_open: '2020-06-09T00:00:00Z',
        time_close: '2020-06-09T22:32:00Z',
        open: 9793.61234081,
        high: 9866.79578663,
        low: 9664.75173332,
        close: 9797.85606373,
        volume: 19213906742,
        market_cap: 180189490534
      }
    ]
  }

    //delay set to 1 second
  setTimeout(() => {
    console.log('getCoinHistoryDemo - simulated delay for api call (disabled in demo mode)');
  }, 1000)
  dispatch(setCoinHistory(data));
};


//demo, allows app to run without api proxy server
export const getCoinPortfolioDataDemo = () => async dispatch => {
  dispatch(setLoading('coinData'));
  
  const data = [
    {
      "id": "btc-bitcoin",
      "name": "Bitcoin",
      "symbol": "BTC",
      "rank": 1,
      "circulating_supply": 18400325,
      "total_supply": 18400350,
      "max_supply": 21000000,
      "beta_value": 1.04731,
      "last_updated": "2020-06-10T14:52:03Z",
      "quotes": {
        "USD": {
          "price": 9781.43869386,
          "volume_24h": 17928305327.293,
          "volume_24h_change_24h": -1.25,
          "market_cap": 179981650934,
          "market_cap_change_24h": 0.62,
          "percent_change_15m": 0.09,
          "percent_change_30m": 0.1,
          "percent_change_1h": 0,
          "percent_change_6h": 0.15,
          "percent_change_12h": -0.16,
          "percent_change_24h": 0.61,
          "percent_change_7d": 2.16,
          "percent_change_30d": 10.27,
          "percent_change_1y": 25.03,
          "ath_price": 20089,
          "ath_date": "2017-12-17T12:19:00Z",
          "percent_from_price_ath": -51.31
        }
      }
    },
    {
      "id": "eth-ethereum",
      "name": "Ethereum",
      "symbol": "ETH",
      "rank": 2,
      "circulating_supply": 111292192,
      "total_supply": 111292210,
      "max_supply": 0,
      "beta_value": 1.05701,
      "last_updated": "2020-06-10T14:52:04Z",
      "quotes": {
        "USD": {
          "price": 244.65249429,
          "volume_24h": 6693903979.1887,
          "volume_24h_change_24h": -9.25,
          "market_cap": 27227912367,
          "market_cap_change_24h": 0.48,
          "percent_change_15m": 0.19,
          "percent_change_30m": 0.09,
          "percent_change_1h": 0.02,
          "percent_change_6h": 0.36,
          "percent_change_12h": 0.05,
          "percent_change_24h": 0.47,
          "percent_change_7d": 2.57,
          "percent_change_30d": 29.94,
          "percent_change_1y": 1.31,
          "ath_price": 1432.88,
          "ath_date": "2018-01-13T21:04:00Z",
          "percent_from_price_ath": -82.93
        }
      }
    },
    {
      "id": "usdt-tether",
      "name": "Tether",
      "symbol": "USDT",
      "rank": 3,
      "circulating_supply": 9401525889,
      "total_supply": 9479177442,
      "max_supply": 0,
      "beta_value": -0.0103925,
      "last_updated": "2020-06-10T14:52:09Z",
      "quotes": {
        "USD": {
          "price": 1.00315939,
          "volume_24h": 18470682651.452,
          "volume_24h_change_24h": -3.5,
          "market_cap": 9431228975,
          "market_cap_change_24h": 0.73,
          "percent_change_15m": 0.02,
          "percent_change_30m": 0.02,
          "percent_change_1h": 0,
          "percent_change_6h": 0.13,
          "percent_change_12h": 0.03,
          "percent_change_24h": 0.25,
          "percent_change_7d": 0.23,
          "percent_change_30d": 0.01,
          "percent_change_1y": -0.27,
          "ath_price": 1.21549,
          "ath_date": "2015-02-25T17:04:00Z",
          "percent_from_price_ath": -17.47
        }
      }
    },
    {
      "id": "xrp-xrp",
      "name": "XRP",
      "symbol": "XRP",
      "rank": 4,
      "circulating_supply": 44112853111,
      "total_supply": 99990976125,
      "max_supply": 100000000000,
      "beta_value": 0.772985,
      "last_updated": "2020-06-10T14:52:04Z",
      "quotes": {
        "USD": {
          "price": 0.20230532,
          "volume_24h": 771556061.07036,
          "volume_24h_change_24h": -6.52,
          "market_cap": 8924264864,
          "market_cap_change_24h": -0.1,
          "percent_change_15m": 0.1,
          "percent_change_30m": 0.02,
          "percent_change_1h": 0,
          "percent_change_6h": 0.14,
          "percent_change_12h": 0.21,
          "percent_change_24h": -0.1,
          "percent_change_7d": -0.55,
          "percent_change_30d": 3.46,
          "percent_change_1y": -48.29,
          "ath_price": 3.84194,
          "ath_date": "2018-01-04T07:14:00Z",
          "percent_from_price_ath": -94.73
        }
      }
    },
    {
      "id": "bch-bitcoin-cash",
      "name": "Bitcoin Cash",
      "symbol": "BCH",
      "rank": 5,
      "circulating_supply": 18431169,
      "total_supply": 18431169,
      "max_supply": 21000000,
      "beta_value": 1.13964,
      "last_updated": "2020-06-10T14:52:04Z",
      "quotes": {
        "USD": {
          "price": 254.59748055,
          "volume_24h": 1958259122.4402,
          "volume_24h_change_24h": 10.42,
          "market_cap": 4692529190,
          "market_cap_change_24h": 0.43,
          "percent_change_15m": 0.09,
          "percent_change_30m": 0.03,
          "percent_change_1h": -0.03,
          "percent_change_6h": -0.01,
          "percent_change_12h": -0.36,
          "percent_change_24h": 0.42,
          "percent_change_7d": 1.88,
          "percent_change_30d": 9.95,
          "percent_change_1y": -33.52,
          "ath_price": 4355.62,
          "ath_date": "2017-12-20T16:59:00Z",
          "percent_from_price_ath": -94.15
        }
      }
    },
    {
      "id": "xmr-monero",
      "name": "Monero",
      "symbol": "XMR",
      "rank": 16,
      "circulating_supply": 17592111,
      "total_supply": 17592110,
      "max_supply": 0,
      "beta_value": 0.96015,
      "last_updated": "2020-06-10T14:52:05Z",
      "quotes": {
        "USD": {
          "price": 68.51081034,
          "volume_24h": 64812022.993971,
          "volume_24h_change_24h": -4.88,
          "market_cap": 1205249780,
          "market_cap_change_24h": 0.41,
          "percent_change_15m": 0.26,
          "percent_change_30m": 0.17,
          "percent_change_1h": 0.08,
          "percent_change_6h": 0.47,
          "percent_change_12h": 0.9,
          "percent_change_24h": 0.41,
          "percent_change_7d": 1.57,
          "percent_change_30d": 13.77,
          "percent_change_1y": -20.83,
          "ath_price": 495.836,
          "ath_date": "2018-01-07T04:44:00Z",
          "percent_from_price_ath": -86.18
        }
      }
    },
    {
      "id": "dash-dash",
      "name": "Dash",
      "symbol": "DASH",
      "rank": 21,
      "circulating_supply": 9540347,
      "total_supply": 9540347,
      "max_supply": 18900000,
      "beta_value": 1.10696,
      "last_updated": "2020-06-10T14:55:05Z",
      "quotes": {
        "USD": {
          "price": 77.84120101,
          "volume_24h": 389150231.80373,
          "volume_24h_change_24h": 8.02,
          "market_cap": 742632068,
          "market_cap_change_24h": 0.63,
          "percent_change_15m": -0.02,
          "percent_change_30m": 0.06,
          "percent_change_1h": -0.06,
          "percent_change_6h": 0.08,
          "percent_change_12h": 0.62,
          "percent_change_24h": 0.61,
          "percent_change_7d": 0.49,
          "percent_change_30d": 10.08,
          "percent_change_1y": -46.29,
          "ath_price": 1642.22,
          "ath_date": "2017-12-20T14:59:00Z",
          "percent_from_price_ath": -95.26
        }
      }
    },
    {
      "id": "mkr-maker",
      "name": "Maker",
      "symbol": "MKR",
      "rank": 23,
      "circulating_supply": 1005577,
      "total_supply": 1005577,
      "max_supply": 0,
      "beta_value": 1.0673,
      "last_updated": "2020-06-10T14:55:11Z",
      "quotes": {
        "USD": {
          "price": 691.81212492,
          "volume_24h": 57181124.171947,
          "volume_24h_change_24h": 281.5,
          "market_cap": 695670361,
          "market_cap_change_24h": 19.06,
          "percent_change_15m": 0.58,
          "percent_change_30m": 0.65,
          "percent_change_1h": -0.14,
          "percent_change_6h": 0.57,
          "percent_change_12h": 0.6,
          "percent_change_24h": 19.06,
          "percent_change_7d": 60.98,
          "percent_change_30d": 112.27,
          "percent_change_1y": -1.89,
          "ath_price": 1773.92,
          "ath_date": "2018-01-18T16:34:00Z",
          "percent_from_price_ath": -61
        }
      }
    },
    {
      "id": "atom-cosmos",
      "name": "Cosmos",
      "symbol": "ATOM",
      "rank": 25,
      "circulating_supply": 190688439,
      "total_supply": 237928231,
      "max_supply": 0,
      "beta_value": 1.02445,
      "last_updated": "2020-06-10T14:53:53Z",
      "quotes": {
        "USD": {
          "price": 3.07250624,
          "volume_24h": 105827952.23197,
          "volume_24h_change_24h": 0.71,
          "market_cap": 585891418,
          "market_cap_change_24h": -2.49,
          "percent_change_15m": 0.08,
          "percent_change_30m": -0.18,
          "percent_change_1h": -0.55,
          "percent_change_6h": 0.37,
          "percent_change_12h": -0.48,
          "percent_change_24h": -2.49,
          "percent_change_7d": 8.79,
          "percent_change_30d": 26.64,
          "percent_change_1y": -47.57,
          "ath_price": 7.22688225,
          "ath_date": "2019-06-03T16:42:30Z",
          "percent_from_price_ath": -57.49
        }
      }
    },
    {
      "id": "nano-nano",
      "name": "Nano",
      "symbol": "NANO",
      "rank": 48,
      "circulating_supply": 133248297,
      "total_supply": 133248297,
      "max_supply": 133248290,
      "beta_value": 0.958366,
      "last_updated": "2020-06-10T14:53:45Z",
      "quotes": {
        "USD": {
          "price": 1.28484,
          "volume_24h": 18688587.648391,
          "volume_24h_change_24h": 101.51,
          "market_cap": 171202741,
          "market_cap_change_24h": 12.94,
          "percent_change_15m": 0.63,
          "percent_change_30m": 0.95,
          "percent_change_1h": 1.09,
          "percent_change_6h": 4.21,
          "percent_change_12h": 5.76,
          "percent_change_24h": 12.94,
          "percent_change_7d": 44.25,
          "percent_change_30d": 111.83,
          "percent_change_1y": -15.92,
          "ath_price": 37.6212,
          "ath_date": "2018-01-02T06:39:00Z",
          "percent_from_price_ath": -96.58
        }
      }
    },
    {
      "id": "waves-waves",
      "name": "Waves",
      "symbol": "WAVES",
      "rank": 60,
      "circulating_supply": 102164938,
      "total_supply": 102164938,
      "max_supply": 0,
      "beta_value": 0.766401,
      "last_updated": "2020-06-10T14:55:08Z",
      "quotes": {
        "USD": {
          "price": 1.22704588,
          "volume_24h": 32309342.673936,
          "volume_24h_change_24h": 13.15,
          "market_cap": 125361066,
          "market_cap_change_24h": 4.79,
          "percent_change_15m": 0.27,
          "percent_change_30m": 0.76,
          "percent_change_1h": 1.59,
          "percent_change_6h": 3.58,
          "percent_change_12h": 4.53,
          "percent_change_24h": 4.78,
          "percent_change_7d": 10.6,
          "percent_change_30d": 26.17,
          "percent_change_1y": -48.23,
          "ath_price": 18.0734,
          "ath_date": "2017-12-19T09:44:00Z",
          "percent_from_price_ath": -93.21
        }
      }
    },
    {
      "id": "sc-siacoin",
      "name": "Siacoin",
      "symbol": "SC",
      "rank": 67,
      "circulating_supply": 41817047634,
      "total_supply": 41817047634,
      "max_supply": 0,
      "beta_value": 1.03835,
      "last_updated": "2020-06-10T14:55:06Z",
      "quotes": {
        "USD": {
          "price": 0.00259503,
          "volume_24h": 1742702.1598196,
          "volume_24h_change_24h": 10.89,
          "market_cap": 108516493,
          "market_cap_change_24h": -1.15,
          "percent_change_15m": 0.12,
          "percent_change_30m": -0.94,
          "percent_change_1h": -1.05,
          "percent_change_6h": -2.15,
          "percent_change_12h": -3.37,
          "percent_change_24h": -1.15,
          "percent_change_7d": 3.23,
          "percent_change_30d": 33.29,
          "percent_change_1y": -14.93,
          "ath_price": 0.111708,
          "ath_date": "2018-01-06T18:04:00Z",
          "percent_from_price_ath": -97.68
        }
      }
    },
    {
      "id": "ren-republic-protocol",
      "name": "Ren",
      "symbol": "REN",
      "rank": 87,
      "circulating_supply": 864690804,
      "total_supply": 999999633,
      "max_supply": 0,
      "beta_value": 1.05071,
      "last_updated": "2020-06-10T14:53:45Z",
      "quotes": {
        "USD": {
          "price": 0.08706426,
          "volume_24h": 2183007.8708814,
          "volume_24h_change_24h": 5.5,
          "market_cap": 75283664,
          "market_cap_change_24h": 0.79,
          "percent_change_15m": 0.86,
          "percent_change_30m": 0.57,
          "percent_change_1h": 0.78,
          "percent_change_6h": 2.9,
          "percent_change_12h": 3.45,
          "percent_change_24h": 0.79,
          "percent_change_7d": 0,
          "percent_change_30d": 21.79,
          "percent_change_1y": 85.06,
          "ath_price": 0.14816903,
          "ath_date": "2019-08-05T07:56:22Z",
          "percent_from_price_ath": -41.24
        }
      }
    },

  ];
  

  //delay set to 1 second
  setTimeout(() => {
    console.log('getCoinPortfolioDataDemo - simulated delay for api call (disabled in demo mode)');  
    dispatch(setCoinData(data));
    dispatch(setLoading('portfolioData'));
    PortfolioManager.Load()
    .then((res) => {
      dispatch(setPortfolioData(res));
    });
  }, 1000)

}

//demo
export const getCoinDataDemo = () => dispatch => {
  dispatch(setLoading('coinData'));

  
  const data = [
    {
      "id": "btc-bitcoin",
      "name": "Bitcoin",
      "symbol": "BTC",
      "rank": 1,
      "circulating_supply": 18400325,
      "total_supply": 18400350,
      "max_supply": 21000000,
      "beta_value": 1.04731,
      "last_updated": "2020-06-10T14:52:03Z",
      "quotes": {
        "USD": {
          "price": 9779.43869386,
          "volume_24h": 17928305327.293,
          "volume_24h_change_24h": -1.25,
          "market_cap": 179981650934,
          "market_cap_change_24h": 0.62,
          "percent_change_15m": 0.09,
          "percent_change_30m": 0.1,
          "percent_change_1h": 0,
          "percent_change_6h": 0.15,
          "percent_change_12h": -0.16,
          "percent_change_24h": 0.61,
          "percent_change_7d": 2.16,
          "percent_change_30d": 10.27,
          "percent_change_1y": 25.03,
          "ath_price": 20089,
          "ath_date": "2017-12-17T12:19:00Z",
          "percent_from_price_ath": -51.31
        }
      }
    },
    {
      "id": "eth-ethereum",
      "name": "Ethereum",
      "symbol": "ETH",
      "rank": 2,
      "circulating_supply": 111292192,
      "total_supply": 111292210,
      "max_supply": 0,
      "beta_value": 1.05701,
      "last_updated": "2020-06-10T14:52:04Z",
      "quotes": {
        "USD": {
          "price": 279.65249429,
          "volume_24h": 6693903979.1887,
          "volume_24h_change_24h": -9.25,
          "market_cap": 27227912367,
          "market_cap_change_24h": 0.48,
          "percent_change_15m": 0.19,
          "percent_change_30m": 0.09,
          "percent_change_1h": 0.02,
          "percent_change_6h": 0.36,
          "percent_change_12h": 0.05,
          "percent_change_24h": 0.47,
          "percent_change_7d": 2.57,
          "percent_change_30d": 29.94,
          "percent_change_1y": 1.31,
          "ath_price": 1432.88,
          "ath_date": "2018-01-13T21:04:00Z",
          "percent_from_price_ath": -82.93
        }
      }
    },
    {
      "id": "usdt-tether",
      "name": "Tether",
      "symbol": "USDT",
      "rank": 3,
      "circulating_supply": 9401525889,
      "total_supply": 9479177442,
      "max_supply": 0,
      "beta_value": -0.0103925,
      "last_updated": "2020-06-10T14:52:09Z",
      "quotes": {
        "USD": {
          "price": 1.07915939,
          "volume_24h": 18470682651.452,
          "volume_24h_change_24h": -3.5,
          "market_cap": 9431228975,
          "market_cap_change_24h": 0.73,
          "percent_change_15m": 0.02,
          "percent_change_30m": 0.02,
          "percent_change_1h": 0,
          "percent_change_6h": 0.13,
          "percent_change_12h": 0.03,
          "percent_change_24h": 0.25,
          "percent_change_7d": 0.23,
          "percent_change_30d": 0.01,
          "percent_change_1y": -0.27,
          "ath_price": 1.21549,
          "ath_date": "2015-02-25T17:04:00Z",
          "percent_from_price_ath": -17.47
        }
      }
    },
    {
      "id": "xrp-xrp",
      "name": "XRP",
      "symbol": "XRP",
      "rank": 4,
      "circulating_supply": 44112853111,
      "total_supply": 99990976125,
      "max_supply": 100000000000,
      "beta_value": 0.772985,
      "last_updated": "2020-06-10T14:52:04Z",
      "quotes": {
        "USD": {
          "price": 0.20790532,
          "volume_24h": 771556061.07036,
          "volume_24h_change_24h": -6.52,
          "market_cap": 8924264864,
          "market_cap_change_24h": -0.1,
          "percent_change_15m": 0.1,
          "percent_change_30m": 0.02,
          "percent_change_1h": 0,
          "percent_change_6h": 0.14,
          "percent_change_12h": 0.21,
          "percent_change_24h": -0.1,
          "percent_change_7d": -0.55,
          "percent_change_30d": 3.46,
          "percent_change_1y": -48.29,
          "ath_price": 3.84194,
          "ath_date": "2018-01-04T07:14:00Z",
          "percent_from_price_ath": -94.73
        }
      }
    },
    {
      "id": "bch-bitcoin-cash",
      "name": "Bitcoin Cash",
      "symbol": "BCH",
      "rank": 5,
      "circulating_supply": 18431169,
      "total_supply": 18431169,
      "max_supply": 21000000,
      "beta_value": 1.13964,
      "last_updated": "2020-06-10T14:52:04Z",
      "quotes": {
        "USD": {
          "price": 254.79748055,
          "volume_24h": 1958259122.4402,
          "volume_24h_change_24h": 10.42,
          "market_cap": 4692529190,
          "market_cap_change_24h": 0.43,
          "percent_change_15m": 0.09,
          "percent_change_30m": 0.03,
          "percent_change_1h": -0.03,
          "percent_change_6h": -0.01,
          "percent_change_12h": -0.36,
          "percent_change_24h": 0.42,
          "percent_change_7d": 1.88,
          "percent_change_30d": 9.95,
          "percent_change_1y": -33.52,
          "ath_price": 4355.62,
          "ath_date": "2017-12-20T16:59:00Z",
          "percent_from_price_ath": -94.15
        }
      }
    },
    {
      "id": "xmr-monero",
      "name": "Monero",
      "symbol": "XMR",
      "rank": 16,
      "circulating_supply": 17592111,
      "total_supply": 17592110,
      "max_supply": 0,
      "beta_value": 0.96015,
      "last_updated": "2020-06-10T14:52:05Z",
      "quotes": {
        "USD": {
          "price": 68.79081034,
          "volume_24h": 64812022.993971,
          "volume_24h_change_24h": -4.88,
          "market_cap": 1205249780,
          "market_cap_change_24h": 0.41,
          "percent_change_15m": 0.26,
          "percent_change_30m": 0.17,
          "percent_change_1h": 0.08,
          "percent_change_6h": 0.47,
          "percent_change_12h": 0.9,
          "percent_change_24h": 0.41,
          "percent_change_7d": 1.57,
          "percent_change_30d": 13.77,
          "percent_change_1y": -20.83,
          "ath_price": 495.836,
          "ath_date": "2018-01-07T04:44:00Z",
          "percent_from_price_ath": -86.18
        }
      }
    },
    {
      "id": "dash-dash",
      "name": "Dash",
      "symbol": "DASH",
      "rank": 21,
      "circulating_supply": 9540347,
      "total_supply": 9540347,
      "max_supply": 18900000,
      "beta_value": 1.10696,
      "last_updated": "2020-06-10T14:55:05Z",
      "quotes": {
        "USD": {
          "price": 79.84120101,
          "volume_24h": 389150231.80373,
          "volume_24h_change_24h": 8.02,
          "market_cap": 742632068,
          "market_cap_change_24h": 0.63,
          "percent_change_15m": -0.02,
          "percent_change_30m": 0.06,
          "percent_change_1h": -0.06,
          "percent_change_6h": 0.08,
          "percent_change_12h": 0.62,
          "percent_change_24h": 0.61,
          "percent_change_7d": 0.49,
          "percent_change_30d": 10.08,
          "percent_change_1y": -46.29,
          "ath_price": 1642.22,
          "ath_date": "2017-12-20T14:59:00Z",
          "percent_from_price_ath": -95.26
        }
      }
    },
    {
      "id": "mkr-maker",
      "name": "Maker",
      "symbol": "MKR",
      "rank": 23,
      "circulating_supply": 1005577,
      "total_supply": 1005577,
      "max_supply": 0,
      "beta_value": 1.0673,
      "last_updated": "2020-06-10T14:55:11Z",
      "quotes": {
        "USD": {
          "price": 679.81212492,
          "volume_24h": 57181124.171947,
          "volume_24h_change_24h": 281.5,
          "market_cap": 695670361,
          "market_cap_change_24h": 19.06,
          "percent_change_15m": 0.58,
          "percent_change_30m": 0.65,
          "percent_change_1h": -0.14,
          "percent_change_6h": 0.57,
          "percent_change_12h": 0.6,
          "percent_change_24h": 19.06,
          "percent_change_7d": 60.98,
          "percent_change_30d": 112.27,
          "percent_change_1y": -1.89,
          "ath_price": 1773.92,
          "ath_date": "2018-01-18T16:34:00Z",
          "percent_from_price_ath": -61
        }
      }
    },
    {
      "id": "atom-cosmos",
      "name": "Cosmos",
      "symbol": "ATOM",
      "rank": 25,
      "circulating_supply": 190688439,
      "total_supply": 237928231,
      "max_supply": 0,
      "beta_value": 1.02445,
      "last_updated": "2020-06-10T14:53:53Z",
      "quotes": {
        "USD": {
          "price": 3.07950624,
          "volume_24h": 105827952.23197,
          "volume_24h_change_24h": 0.71,
          "market_cap": 585891418,
          "market_cap_change_24h": -2.49,
          "percent_change_15m": 0.08,
          "percent_change_30m": -0.18,
          "percent_change_1h": -0.55,
          "percent_change_6h": 0.37,
          "percent_change_12h": -0.48,
          "percent_change_24h": -2.49,
          "percent_change_7d": 8.79,
          "percent_change_30d": 26.64,
          "percent_change_1y": -47.57,
          "ath_price": 7.22688225,
          "ath_date": "2019-06-03T16:42:30Z",
          "percent_from_price_ath": -57.49
        }
      }
    },
    {
      "id": "nano-nano",
      "name": "Nano",
      "symbol": "NANO",
      "rank": 48,
      "circulating_supply": 133248297,
      "total_supply": 133248297,
      "max_supply": 133248290,
      "beta_value": 0.958366,
      "last_updated": "2020-06-10T14:53:45Z",
      "quotes": {
        "USD": {
          "price": 1.79484,
          "volume_24h": 18688587.648391,
          "volume_24h_change_24h": 101.51,
          "market_cap": 171202741,
          "market_cap_change_24h": 12.94,
          "percent_change_15m": 0.63,
          "percent_change_30m": 0.95,
          "percent_change_1h": 1.09,
          "percent_change_6h": 4.21,
          "percent_change_12h": 5.76,
          "percent_change_24h": 12.94,
          "percent_change_7d": 44.25,
          "percent_change_30d": 111.83,
          "percent_change_1y": -15.92,
          "ath_price": 37.6212,
          "ath_date": "2018-01-02T06:39:00Z",
          "percent_from_price_ath": -96.58
        }
      }
    },
    {
      "id": "waves-waves",
      "name": "Waves",
      "symbol": "WAVES",
      "rank": 60,
      "circulating_supply": 102164938,
      "total_supply": 102164938,
      "max_supply": 0,
      "beta_value": 0.766401,
      "last_updated": "2020-06-10T14:55:08Z",
      "quotes": {
        "USD": {
          "price": 1.27904588,
          "volume_24h": 32309342.673936,
          "volume_24h_change_24h": 13.15,
          "market_cap": 125361066,
          "market_cap_change_24h": 4.79,
          "percent_change_15m": 0.27,
          "percent_change_30m": 0.76,
          "percent_change_1h": 1.59,
          "percent_change_6h": 3.58,
          "percent_change_12h": 4.53,
          "percent_change_24h": 4.78,
          "percent_change_7d": 10.6,
          "percent_change_30d": 26.17,
          "percent_change_1y": -48.23,
          "ath_price": 18.0734,
          "ath_date": "2017-12-19T09:44:00Z",
          "percent_from_price_ath": -93.21
        }
      }
    },
    {
      "id": "sc-siacoin",
      "name": "Siacoin",
      "symbol": "SC",
      "rank": 67,
      "circulating_supply": 41817047634,
      "total_supply": 41817047634,
      "max_supply": 0,
      "beta_value": 1.03835,
      "last_updated": "2020-06-10T14:55:06Z",
      "quotes": {
        "USD": {
          "price": 0.00279503,
          "volume_24h": 1742702.1598196,
          "volume_24h_change_24h": 10.89,
          "market_cap": 108516493,
          "market_cap_change_24h": -1.15,
          "percent_change_15m": 0.12,
          "percent_change_30m": -0.94,
          "percent_change_1h": -1.05,
          "percent_change_6h": -2.15,
          "percent_change_12h": -3.37,
          "percent_change_24h": -1.15,
          "percent_change_7d": 3.23,
          "percent_change_30d": 33.29,
          "percent_change_1y": -14.93,
          "ath_price": 0.111708,
          "ath_date": "2018-01-06T18:04:00Z",
          "percent_from_price_ath": -97.68
        }
      }
    },
    {
      "id": "ren-republic-protocol",
      "name": "Ren",
      "symbol": "REN",
      "rank": 87,
      "circulating_supply": 864690804,
      "total_supply": 999999633,
      "max_supply": 0,
      "beta_value": 1.05071,
      "last_updated": "2020-06-10T14:53:45Z",
      "quotes": {
        "USD": {
          "price": 0.08796426,
          "volume_24h": 2183007.8708814,
          "volume_24h_change_24h": 5.5,
          "market_cap": 75283664,
          "market_cap_change_24h": 0.79,
          "percent_change_15m": 0.86,
          "percent_change_30m": 0.57,
          "percent_change_1h": 0.78,
          "percent_change_6h": 2.9,
          "percent_change_12h": 3.45,
          "percent_change_24h": 0.79,
          "percent_change_7d": 0,
          "percent_change_30d": 21.79,
          "percent_change_1y": 85.06,
          "ath_price": 0.14816903,
          "ath_date": "2019-08-05T07:56:22Z",
          "percent_from_price_ath": -41.24
        }
      }
    },

  ];


  //delay set to 1 second
  setTimeout(() => {
    console.log('getCoinDataDemo - simulated delay for api call (disabled in demo mode)');
    dispatch(setCoinData(data));
  }, 1000);

};


export const getSettings = () => dispatch => {
  SettingsManager.Load()
  .then((res) => {
    dispatch(setSettings(res));
  });
};