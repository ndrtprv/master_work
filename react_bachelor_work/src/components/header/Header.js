import React from 'react';
import './Header.css';
import brand from '../../resources/brand.png';
import NavigationPanel from './nav_panel/NavigationPanel';
import avatar from '../../resources/people.png';

function Header(props) {

    return (
        <header className="sticky-top">
            <NavigationPanel data_folded={props.data_folded} data={props.data} brand={brand} avatar={avatar} />
        </header>
    );
}

export default Header;