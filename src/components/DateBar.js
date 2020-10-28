import React from 'react';
import {Link} from 'react-router-dom';

const DateBar = (props) =>{
	const today = new Date();
	const sendData = (date) => {
        props.parentCallback(date);
    }
	return(
		<nav>
		<div className="nav-wrapper grey darken-4">
			<ul>
				<li className="dateBarItem" key="week">
					<a className = "chartLinks" onClick = {(e) => {sendData(new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000)))}}>W</a>
				</li>
				<li className="dateBarItem" key="month">
					<a className = "chartLinks" onClick = {(e) => {sendData(new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000)))}}>M</a>
				</li>
				<li className="dateBarItem" key="year">
					<a className = "chartLinks" onClick = {(e) => {sendData(new Date(today.getTime() - (365 * 24 * 60 * 60 * 1000)))}}>Y</a>
				</li>
				<li className="dateBarItem" key="all">
					<a className = "chartLinks" onClick = {(e) => {sendData(new Date(today.getTime() - (10000 * 24 * 60 * 60 * 1000)))}}>ALL</a>
				</li>
			</ul>
		</div>
		</nav>
	);
};

export default DateBar
