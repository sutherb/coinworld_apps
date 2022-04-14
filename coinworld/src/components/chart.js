import React, {useEffect, useState, } from 'react';

import * as ChartConfig from '../init/initchart';
import { createChart } from 'lightweight-charts';

import { 
  useSelector,
  useDispatch,
} from 'react-redux';

import {
  setSettings,
  settingsSelector,
} from '../redux/apiCallsSlice';

import Dropdown from './dropdown';

import {
  formatLinuxData,
  getWidth,
  //getHeight,
  //findObjectByKey,
} from '../functions/functions';

import SettingsManager from '../functions/settingsmanager';




//takes unique name of chart div, line data, and options for arguments
const Chart = ({chartId, lineData, options, chartRefresh}) => {
  
  const selectSettings = useSelector(settingsSelector);
  
  const dispatch = useDispatch();

  const mediaThresholds = {
    "tiny": 320,
    "small" : 480,
    "medium": 768,
    "large": 992,
  }
  
  const defaultDim = {
    "tiny": 280,
    "small": 320,
    "medium": 500,
    "large": 780,
    "max": 1050,
  }

  const [width, setWidth] = useState(defaultDim.small);
  //const [height, setHeight] = useState(getHeight());
  const [height] = useState("300");
  //const [height, setHeight] = useState("300");

  
  const updateDimensions = () => {
    const currentWidth = getWidth();
//console.log(getWidth())
    if (currentWidth > mediaThresholds.large) {
      setWidth(defaultDim.max);
    } else if (currentWidth <= mediaThresholds.large && currentWidth > mediaThresholds.medium) {
      setWidth(defaultDim.large);
    } else if (currentWidth <= mediaThresholds.medium && currentWidth > mediaThresholds.small) {
      setWidth(defaultDim.medium);
    } else if (currentWidth <= mediaThresholds.small && currentWidth > mediaThresholds.tiny) {
      setWidth(defaultDim.small);
    } else {
      setWidth(defaultDim.tiny);
    }

  }

  /*

      data: {
        id: 'btc-bitcoin',
        coinDetails: 
        [
          {
            close: 3956.32949101
            high: 3960.40537725
            low: 3910.2321017
            market_cap: 68994609219
            open: 3922.65852966
            time_close: "2019-03-15T23:59:59Z"
            time_open: "2019-03-15T00:00:00Z"
            volume: 6889111860
          },
          {}...
        ]
      }
      lineData: [
        { time: '2019-04-01', value: 80.01 },
        {}...
      ]
  */

  //takes data from api and formats for displaying linechart on analytics page
  const dataSetFormatter = (data) => {
    let formattedData =[];
    for (let detail of data[0]) {
      formattedData.push({time: formatLinuxData(detail[0]), value: detail[1]});
    }
    console.log(formattedData)
    return formattedData;
  }


  //coinpaprika version of dataSetFormatter
/*
  const dataSetFormatter = (data) => {
    
    const tmpData = data.coinDetails.slice();
    let formattedData =[];
    for (let detail of tmpData) {
      formattedData.push({time: detail.time_close, value: detail.close})
    }

    return formattedData;
  }
*/


  //constructs chart, takes div id for chart, line data, & any options to use (default is to use initchart.json)
  const buildChart = (customOptions) => {

    const initOptions = ChartConfig.default;
    const chartOptions = customOptions.settings ? {...initOptions.defaultChartOptions, ...customOptions.settings} : initOptions.defaultLineOptions;

    const chartDim = customOptions.dim ? customOptions.dim : initOptions.defaultLineOptions;

    let chartDOM = document.getElementById(chartId);

    //erase any existing charts
    if (chartDOM.childElementCount > 0) {
      chartDOM.innerHTML = '';
    }

    let chart = createChart(chartDOM, chartDim);
    
    chart.applyOptions(chartOptions);

    let lineOptions = {
      priceScaleId: 'left',
      title: options.chartLabel,
      scaleMargins: {
          top: 0.1,
          bottom: 0.3,
      },
    }

    let lineSeries = chart.addLineSeries(lineOptions);

    chart.timeScale().fitContent();

    lineSeries.applyOptions(chartOptions);
    lineSeries.setData(dataSetFormatter(lineData));
    

  }


  useEffect(() => {

    window.addEventListener("resize", () => updateDimensions());

    const chartOptions = {
      settings : {
        watermark: {
          text: lineData[0].id
        },
      },
      dim: {
        width: width - 10 - width*0.1,
        height: height
      }
    }

    updateDimensions();

    buildChart(chartOptions);
      
  });

  const settingsActions = (settingProp, val) => {
    
    chartRefresh(settingProp, val);

    const updatedSettings = SettingsManager.FormatSettingsObject(selectSettings, chartId, settingProp, val);

    dispatch(setSettings(updatedSettings));
    
    SettingsManager.Save(updatedSettings);
    
  }


  const buildDropdown = () => {
    let dropdowns = [];
    for (let dd of options.dropdownData) {
      let selectedItem = dd.defaultItem;
      if (selectSettings[chartId] !== undefined) {
        if (selectSettings[chartId][dd.settingName]) {
          selectedItem = selectSettings[chartId][dd.settingName];
        }
      }
      
      dropdowns.push(
        <Dropdown 
          key={dd.settingName}
          listId={dd.settingName}
          selectedItem={selectedItem}
          listItems={dd.itemList}
          buttonAction={settingsActions}
        />
      );

    }

    return dropdowns;
  }

  //chart will be placed inside chartId div
  
  return (
    <div className="chart">

      <div id={chartId}></div>

      <div className="chart-controls">
        {buildDropdown()}
      </div>

    </div>
  );
}

export default Chart;
