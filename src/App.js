import React, {Component}from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import DateBar from './components/DateBar'
import CryptoChart from './components/CryptoChart';
import SearchBar from './components/SearchBar';
import RecentSearches from './components/RecentSearches'
import TopCoins from './components/TopCoins'

//Change this to a class component because functional components are stateless
class App extends Component {
  today = new Date();
  state = {
	  ticker: "BTC",
	  price: "",
	  percentChange: "",
	  date: new Date(this.today.getTime() - (7 * 24 * 60 * 60 * 1000)),
	  hoveredDate: "Now",
	  recentSearches: ["BTC"]
	  };
	changeTicker = (childData) => {
		this.setState({
			ticker: childData
		})
	}
  getTicker = (childData) =>{
	  let tempArr = [childData];
	  for(var i = 0;i<this.state.recentSearches.length;i++){
		if (i<4){
			tempArr.push(this.state.recentSearches[i])
		}
		
	  }
	  this.setState({
		  ticker: childData,
		  recentSearches: tempArr
		  
		})
  }
  getData = (childData) => {
	  this.setState({
		  price: childData.price,
		  percentChange: childData.percentChange,
		  hoveredDate: childData.hoveredDate
		})
  }
  setDate = (childData) => {
	  this.setState({
		date: childData
	  })
  }
  render(){
	  return (
	  <BrowserRouter>
		<div style = {{maxWidth: "500px"}} className="container">
		<SearchBar parentCallback = {this.getTicker}/>
		
		<p>{this.state.hoveredDate}</p>
		<h5>{this.state.ticker.toUpperCase()}</h5>
		<h5>${this.state.price}</h5>
		<h6 style={{ color: this.state.percentChange >= 0? 'rgba(140, 244, 156,1)': '#F45532'}}>{this.state.percentChange}%</h6>
		<CryptoChart key = {this.state.ticker + this.state.date} dataFromParent = {this.state} parentCallback = {this.getData}/>
		<DateBar parentCallback = {this.setDate}/>
		</div>
		<div style = {{maxWidth: "500px"}} className="container">
		<div className = "row">
			<RecentSearches className = "col s6" parentCallback = {this.changeTicker} key = {this.state.ticker} dataFromParent = {this.state.recentSearches}/>
			<TopCoins className = "col s6" parentCallback = {this.changeTicker}/>
		</div>
		
		</div>
	  </BrowserRouter>
	  );
  }
}

export default App;
