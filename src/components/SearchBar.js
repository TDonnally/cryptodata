import React from 'react';

const SearchBar = (props) =>{
	const sendData = (event) => {
		event.preventDefault();
        props.parentCallback(localStorage.getItem("ticker").toUpperCase());
    }
	return(
	<div className="row">
		<form onSubmit = {sendData} className="col s12">
		  <div className="row">
			<div className="input-field col s12">
			  <i className="material-icons prefix">search</i>
			  <input placeholder = "search ticker" id="textarea1" onChange={(e)=>{localStorage.setItem("ticker",e.target.value);}}className="materialize-textarea"/>
			  <label htmlFor="textarea1"></label>
			</div>
		  </div>
		</form>
	</div>
	)
}

export default SearchBar;