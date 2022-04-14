/**
 * SETTINGS MANAGER
 * 
 * Functions for managing settings data.  Loads from localstorage in browser, & check for changes before saving
 * 
 * 
*/


const Load = async () => {
  const storedSettings = localStorage.getItem('settings');
  //console.log(storedSettings)
  if (storedSettings === 'undefined' || storedSettings === null) {
    return [];
  } else {
    return JSON.parse(storedSettings);
  } 
}

const Save = (settings) => {

  const dataString = JSON.stringify(settings);

  //URLSearchParams(window.location.search).set('portfoliodata', dataString);
  localStorage.setItem('settings', dataString);
}




const FormatSettingsObject = (oldSettings, settingsName, settingsProp, settingsVal) => {

  let newSettings = {};

  if (Object.keys(oldSettings).length > 0) newSettings = Object.assign({}, oldSettings);
  
  
  if (oldSettings[settingsName]) {

    if (oldSettings[settingsName][settingsProp]) {
      let props = Object.assign({}, newSettings[settingsName])
      props[settingsProp] = settingsVal;
      newSettings[settingsName] = props;
    } else {
      let props = newSettings[settingsName];
      props = {...props, ...{[settingsProp] : settingsVal}};
      newSettings[settingsName] = props;
    }

  } else {
    newSettings = {
      [settingsName] : {
        [settingsProp] : settingsVal
      }
    };    
  }
 
  return newSettings;
  
} 

export default {Load, Save, FormatSettingsObject };