import React from 'react';
import SongList from './SongList';
import { Link } from 'react-router';
import logo from '../images/favicon.png';

export default () => {
    return (
        <div className="container app-container">
            <div className="logo-box">
                <img src={logo} alt="Logo"/>
            </div>
            
            <Link
                to="/create"
                className="button"
            >
                + ADD
            </Link>
            <br />
            <br />
            <SongList />
        </div>
    );
};