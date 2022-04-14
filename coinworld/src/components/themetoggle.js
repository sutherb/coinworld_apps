import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';


const ThemeToggle = () => {

    const changeTheme = () => {

    }

    return (
        <button id="theme-toggle" className="btn btn-xl" onClick={() => changeTheme()}>
            <FontAwesomeIcon className="moon" icon={faMoon}/><FontAwesomeIcon className="sun" icon={faSun}/>
        </button>
    )
}

export default ThemeToggle;