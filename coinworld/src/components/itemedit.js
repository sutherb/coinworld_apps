import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { 
  toggleDisable,
  findObjectByKey,
  tidyRound,
} from '../functions/functions';

//updateAction
const ItemEdit = ({itemkey, name, symbol, price, units, changes, setChanges}) => {


  const handleBlur = (id) => {
    let inputValue = document.getElementById(id+'-unit-input').value;
    if (!inputValue || inputValue <= 0) {
      document.getElementById(id+'-unit-input').value = 0;
      //document.getElementById(id+'-value-input').value = 0;
      document.getElementById(id+'-value-display').innerHTML = 0;
      this.removeItem(id);
    } else {
      updateChanges(id, inputValue);
    }
  }

  const handleChange = (inputType, id) => {
    let inputValue = document.getElementById(id + '-' + inputType).value || 0;
    document.getElementById(id + '-value-display').innerHTML = tidyRound(inputValue * price);

    /*
    if (inputType === 'value-input') {
      document.getElementById(id + '-unit-input').value = tidyRound(inputValue / price);
    } else {
      document.getElementById(id + '-value-input').value = tidyRound(inputValue * price);
    }
    */
  }

  const removeItem = (id) => {
    let units = document.getElementById(id+'-unit-input').value;
    if (units > 0 && document.getElementById(id+'-unit-input').disabled) {
      updateChanges(id, units);
    } else {
      updateChanges(id, 0);
    }
    
    document.getElementById('trash-'+id).classList.toggle('show');
    document.getElementById('notrash-'+id).classList.toggle('show');
    toggleDisable(id+'-unit-input');
    //toggleDisable(id+'-value-input');
  }


  const updateChanges = (coinId, units) => {
    let currentChanges = changes;
    let changeCoin = findObjectByKey(currentChanges, 'id', coinId);
    
    if (changeCoin) {
      currentChanges.splice(currentChanges.findIndex(coin => coin.id === coinId), 1, {'id': coinId, 'units' : units});
    } else {
      currentChanges.push({'id': coinId, 'units' : units});
    }
    
    setChanges(currentChanges);
  }


  return (
    <Fragment key={itemkey}>
      <tr> 
        <td className="coin-name">{name}</td>
        <td className="coin-symbol">{symbol}</td>
        <td className="coin-price"><span className="sign">{tidyRound(price)}</span></td>
        <td className="coin-units">
          <input className="form-control" type="text" maxLength="10" placeholder="units.." 
            id={itemkey + '-unit-input'} 
            onBlur={() => handleBlur(itemkey, '-unit-input')}
            onChange={() => handleChange('unit-input', itemkey)}
            defaultValue={units || ''} 
          />
        </td>
        <td className="coin-value" align="left"><span className="sign" id={itemkey + '-value-display'} >{tidyRound((price * units),',')}</span></td>
        <td>
          <button className="btn btn-danger" 
            onClick={() => removeItem(itemkey)}
          >
          <FontAwesomeIcon icon={faTrash} id={'trash-'+itemkey} className='show'/>
          <FontAwesomeIcon icon={faMinusCircle} id={'notrash-'+itemkey}/>
        </button></td>
      </tr>
    </Fragment>
  );
  /*
          <td className="coin-value" align="left">
          <input className="form-control-sm" type="text" maxLength="10" placeholder="value.." 
            id={itemkey + '-value-input'} 
            onBlur={() => handleBlur(itemkey, '-value-input')}
            onChange={() => handleChange('value-input', itemkey)}
            defaultValue={Number(units*price).toFixed(2) || ''} 
          />
        </td>
  */
}

export default ItemEdit;