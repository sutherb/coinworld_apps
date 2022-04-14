export function delayedAction(doAction) {
  setTimeout(() => { doAction(); }, 1);
}

export function findObjectByKey(array, key, value) {
  console.log(array)
  console.log(key)
  console.log(value)
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) return array[i];
  }
}

export function tidyRound(value, separator) {
  if (!value || value === 0) return value;
  
  let int = value.toString().split(".")[0];
  let dec = value.toString().split(".")[1];
  let numb = 0;

  if (int.length > 2 || !dec || dec === 0) {
    numb = Number(value).toFixed(0).toString();
    
    if (separator) numb = numb.replace(/\B(?=(\d{3})+(?!\d))/g, separator);;
  } else if (int.length === 2 || value > 0.05) {
    numb = Number(value).toFixed(2);
  } else {
    numb = Number(value).toFixed(5);
  }
  return numb;
}

export function toggleDisable(ele) {
  if (document.getElementById(ele).disabled) {
    document.getElementById(ele).disabled = false;
  } else {
    document.getElementById(ele).disabled = true;
  }
}

export function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

export function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}


export function getDate(time) {

  function correctedMonth(month) {
    return (month < 10) ? `0${month+1}` : `${month+1}`;
  }
  function correctedDate(date) {
    return (date < 10) ? `0${date}` : `${date}`;
  }

  const today = new Date();
  
  let dayAgo = new Date();
  dayAgo.setDate(today.getDate()-1);
  
  let weekAgo = new Date();
  weekAgo.setDate(today.getDate()-7);

  let monthAgo = new Date();
  monthAgo.setDate(today.getDate()-30);
  
  let yearAgo = new Date();
  yearAgo.setDate(today.getDate()-365);

  switch (time) {
    case 'today'  : return `${today.getFullYear()}-${correctedMonth(today.getMonth())}-${correctedDate(today.getDate())}`;
    case 'day'    : return `${dayAgo.getFullYear()}-${correctedMonth(dayAgo.getMonth())}-${correctedDate(dayAgo.getDate())}`;
    case 'week'   : return `${weekAgo.getFullYear()}-${correctedMonth(weekAgo.getMonth())}-${correctedDate(weekAgo.getDate())}`;
    case 'month'  : return `${monthAgo.getFullYear()}-${correctedMonth(monthAgo.getMonth())}-${correctedDate(monthAgo.getDate())}`;
    case 'year'   : return `${yearAgo.getFullYear()}-${correctedMonth(yearAgo.getMonth())}-${correctedDate(yearAgo.getDate())}`;
    case 'ytd'    : return `${today.getFullYear()}-01-01`;
    default       : return "2013-01-01";
    
  }
  
}

export function formatLinuxData(linuxTime) {
  function leadingZeroMonth(month) {
    return (month < 10) ? `0${month+1}` : `${month+1}`;
  }
  function leadingZero(date) {
    return (date < 10) ? `0${date}` : `${date}`;
  }

  const linuxDate = new Date(linuxTime);
  let formattedDate = linuxDate;
  formattedDate = Date.parse(`${linuxDate.getFullYear()}-${leadingZeroMonth(linuxDate.getMonth())}-${leadingZero(linuxDate.getDate())} ${leadingZero(linuxDate.getHours())}:${leadingZero(linuxDate.getMinutes())}`)/1000;
  console.log(formattedDate)
  return formattedDate;
}