import React from 'react';


//takes title to display on button, list of items (array of objects, label & value), and function to do on button click
const Dropdown = ({listId, selectedItem, listItems, buttonAction}) => {

  if (listItems.length < 1) return '';

  const foundItem = listItems.find(item => item.value === selectedItem)

  const handleClick = (label, value) => {
    document.getElementById(listId).innerHTML = label;
    buttonAction(listId, value);
  }

  
  return (
    <div className="btn-group">
      <button className="btn btn-secondary dropdown-toggle" 
        type="button" id={listId}
        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {foundItem.label}
      </button>
      <div className="dropdown-menu" aria-labelledby={listId}>
        {
          listItems.map((item) => 
            <button className="dropdown-item" type="button" 
              key={item.label}
              value={item.value}
              onClick={() => handleClick(item.label, item.value)}
            >
              {item.label}
            </button>
          )
        }
      </div>
    </div>
  );
}

export default Dropdown;