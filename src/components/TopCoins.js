import React, {useState, useEffect} from 'react';

const TopCoins = (props) =>{
	const sendData = (ticker) => {
        props.parentCallback(ticker);
    }
	const [recentSearchList, setRecentSearchList] = useState([]);
	const getListData = () => fetch("https://api.nomics.com/v1/currencies/ticker?key=d8f9e3b4142198f5d8902c3bb6c08ec9&sort=rank&per-page=5",
    {}).then((res) => res.json())
      .then((result) => {
		let tempArray = []
		console.log(result);
		for(var i = 0; i<result.length; i++){
			
			tempArray.push(result[i]);
		}
		setRecentSearchList(tempArray);
		
		
      }).catch((err) =>{
		  console.log(err)
	  })
	
	useEffect(()=>{
		async function fetchData(){
			getListData();
		}	
		fetchData();
	}
	, [])
	return(
		<div className = "col s6">
		<h5><i className="material-icons prefix">grade</i>Most Popular:</h5>
		<ul>
			  {(recentSearchList || []).map(item => (
				
				<li>
					<a 
					className="waves-effect  grey darken-3 btn-small" 
					href='#!'  key={item.currency} 
					style = {{"width": "100%"}} 
					onMouseOut = {(e) => {e.target.style.color = "white"}} 
					onMouseOver = {(e) => {e.target.style.color = "rgba(140, 244, 156,1)"}} 
					onClick = {(e) => {sendData(item.currency)}}>
						<img className = "col s3" style = {{height: "100%"}} src = {item.logo_url}/>{item.currency}
					</a>
				</li>
				
			  ))}
		</ul>
		</div>
	)
}
export default TopCoins;