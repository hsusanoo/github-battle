import React from 'react';
import {NavLink} from 'react-router-dom';


const Nav = () =>
    <ul className={'nav'}>
        <li>
            <NavLink exact activeClassName={'active-page'} to={'/'}>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink activeClassName={'active-page'} to={'/battle'}>
                battle
            </NavLink>
        </li>
        <li>
            <NavLink activeClassName={'active-page'} to={'/popular'}>
                Popular
            </NavLink>
        </li>
    </ul>
;

export default Nav;