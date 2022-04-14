import React, { Fragment } from 'react';
import { tidyRound } from '../functions/functions';


const ItemDisplay = ({itemkey, name, symbol, price, units}) => {
  return (<Fragment key={itemkey}>
    <tr> 
      <td className="coin-name">{name}</td>
      <td className="coin-symbol">{symbol}</td>
      <td className="coin-price"><span className="sign">{tidyRound(price, ',')}</span></td>
      <td className="coin-units"><span>{tidyRound(units, ',')}</span></td>
      <td className="coin-value"><span className="sign">{tidyRound((price * units),',')}</span></td>
    </tr>
  </Fragment>);
}

export default ItemDisplay;