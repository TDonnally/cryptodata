import React, {useState, useEffect} from 'react';
import {Line, Chart} from 'react-chartjs-2';
import "chartjs-plugin-lineheight-annotation";

const CryptoChart = (props) =>{
    // this piece of state will hold the data passed to the chart component once it returns from your fetch call.
    const [chartData, setChartData] = useState(null);
	const today = new Date();
	var chartColor = "";
	const lastWeek = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
	
	function convertDateFormat(date){
		const dd = String(date.getDate()).padStart(2, '0');
		const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
		const yyyy = date.getFullYear();
		
		return (yyyy+"-"+mm+"-"+dd);
	}
	
	
    const getChartData = () => fetch("https://api.nomics.com/v1/currencies/sparkline?key=d8f9e3b4142198f5d8902c3bb6c08ec9&ids="+props.dataFromParent.ticker.toUpperCase()+"&start="+convertDateFormat(props.dataFromParent.date)+"T00%3A00%3A00Z&end="+convertDateFormat(today)+"T01%3A00%3A00Z",
    {}).then((res) => res.json())
      .then((result) => {
		let properties = {
			price: result[0].prices[result[0].prices.length-1],
			percentChange: ((result[0].prices[result[0].prices.length-1]-result[0].prices[0])/result[0].prices[0]*100).toFixed(2),
			hoveredDate: "Now"
		}
		
		if (properties.percentChange >=0){
			chartColor = "rgba(140, 244, 156,1)";
		}
		else{
			chartColor = "#F45532"
		}
		props.parentCallback(properties);
        //starting price reiterated over the length of the data.
        const zeroLine = [];
        //stores all the increments of time
        const timeLabels = [];
        //List of all of the prices
        const prices = [];
		const topLine = []
		const topPrice = Math.max( ...result[0].prices );
        for(var i = 0; i <= result[0].prices.length - 1; i++){
            zeroLine.push(result[0].prices[0]);
            timeLabels.push(result[0].timestamps[i]);
            prices.push(result[0].prices[i]);
			topLine.push(topPrice);
            
        }
        const chartData = {
		  type: 'LineWithLine',
          labels: timeLabels,
		  backgroundColor: "#212121",
          datasets: [
            {
              label: 'pricesData',
			  fill: false,
              lineTension: 0,
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: chartColor,
              borderWidth: 2,
              data: prices
            },
            {
              
              label: '0 line',
			  radius: 0,
              fill: false,
              borderDash: [10,5],
              data: zeroLine,
			  backgroundColor: 'rgba(255,255,255,1)',
              borderColor: 'rgba(255, 255, 255,.5)',
          
          
            },
			{
			  label: 'top Line',
			  radius: 0,
              fill: false,
              borderDash: [10,5],
              data: topLine,
			  borderColor: 'rgba(255, 255, 255,0)'
			}
          ]
        }
        setChartData(chartData)
      }).catch((err) =>{
		  alert("Invalid Entry");
		  let properties = {
				price: "INVALID ENTRY",
				percentChange: "0", 
				hoveredDate: "Now"
			}
			props.parentCallback(properties);
	  })

    useEffect(()=>{
		async function fetchData(){
			getChartData();
		}	
		fetchData();
	}
	, [])
	

    return chartData ? (
    <Line
          data={chartData}
          options={{
			lineHeightAnnotation: {
				color: "rgba(255, 255, 255,.5)",
				always: false,
				hover: true,
				noDash: true
				
			  },
			responsive: true,
			tooltips: {
				 custom : function(tooltipModel) 
                 {
                  tooltipModel.opacity = 0;
                 },
				 intersect: false,
				 axis: 'x',
				 filter: function (tooltipItem) {
					return tooltipItem.datasetIndex === 0;
				},	
				 callbacks: {
					label: function(tooltipItem, data) {
						var item = data.datasets[0].data[tooltipItem.index];
						var zeroLine = data.datasets[1].data[tooltipItem.index]
						let properties = {
							price: item,
							percentChange: (((item-zeroLine)/zeroLine)*100).toFixed(2),
							hoveredDate: new Date(tooltipItem.label).toLocaleDateString()
						}
						props.parentCallback(properties);
						return(item)
					}
				}
			  },
			
			scales: {
				xAxes: [{
					gridLines: {
						display:false
					},
					ticks: {
						display: false //this will remove only the label
					}
				}],
				yAxes: [{
					gridLines: {
						display:false
					},
					ticks: {
						display: false //this will remove only the label
					}
				}]
			},
            elements:{
                point: {
                    radius: 0
                }
            },
            title:{		
				display:false,
				fontSize:20,
			  
            },
            legend:{
              display:false,
              position:'right'
            }
          }}
        />
    ) : <Line
          data={{datasets: [
            {
              label: 'pricesData',
			  fill: false,
              lineTension: 0,
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: chartColor,
              borderWidth: 2,
              data: []
		  }]
		  }}
          options={{
			lineHeightAnnotation: {
				color: "rgba(255, 255, 255,.5)",
				always: false,
				hover: true,
				noDash: true
				
			  },
			responsive: true,
			tooltips: {
				 custom : function(tooltipModel) 
                 {
                  tooltipModel.opacity = 0;
                 },
				 intersect: false,
				 axis: 'x',
				 filter: function (tooltipItem) {
					return tooltipItem.datasetIndex === 0;
				},	
				 callbacks: {
					label: function(tooltipItem, data) {
						var item = data.datasets[0].data[tooltipItem.index];
						var zeroLine = data.datasets[1].data[tooltipItem.index]
						let properties = {
							price: item,
							percentChange: (((item-zeroLine)/zeroLine)*100).toFixed(2),
							hoveredDate: new Date(tooltipItem.label).toLocaleDateString()
						}
						props.parentCallback(properties);
						return(item)
					}
				}
			  },
			/*events: ['mousemove'], // this is needed, otherwise onHover is not fired
			onHover: function(evt) {
				var item = getC.getElementAtEvent(evt);
				if (item.length) {
					console.log("onHover",item, evt.type);
				  console.log(">data", item[0]._index, data.datasets[0].data[item[0]._index]);
				}
			  },*/
			scales: {
				xAxes: [{
					gridLines: {
						display:false
					},
					ticks: {
						display: false //this will remove only the label
					}
				}],
				yAxes: [{
					gridLines: {
						display:false
					},
					ticks: {
						display: false //this will remove only the label
					}
				}]
			},
            elements:{
                point: {
                    radius: 0
                }
            },
            title:{		
				display:false,
				fontSize:20,
			  
            },
            legend:{
              display:false,
              position:'right'
            }
          }}
        />
}

export default CryptoChart;

