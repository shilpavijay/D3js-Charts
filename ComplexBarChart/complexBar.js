var h = 450;
var w = 800;
// var data = [102,34,566,89,70,86,34,89,100];

var data = [
	{key: "Glazed",		value: 132},
	{key: "Jelly",		value: 71},
	{key: "Holes",		value: 337},
	{key: "Sprinkles",	value: 93},
	{key: "Crumb",		value: 78},
	{key: "Chocolate",	value: 43},
	{key: "Coconut", 	value: 20},
	{key: "Cream",		value: 16},
	{key: "Cruller", 	value: 30},
	{key: "Éclair", 	value: 8},
	{key: "Fritter", 	value: 17},
	{key: "Bearclaw", 	value: 21}
];

var margin = {
	top: 40,
	bottom: 40,
	left: 60,
	right: 20
}

var height = h - margin.top - margin.bottom;
var width = w - margin.left - margin.right;

// Horizontal chart
// var x = d3.scale.linear()
// 		.domain([0,d3.max(data,function(d){
// 			return d.value
// 		})])
// 		.range([0,width])

// var y = d3.scale.ordinal()
//  		.domain(data.map(function(entry){
//  			return entry.key
//  		}))
//  		.rangeBands([0,height])

//Vertical chart
var x = d3.scale.ordinal()
		.domain(data.map(function(entry){
			return entry.key
		}))
		.rangeBands([0,width])

var y = d3.scale.linear()
		.domain([0,d3.max(data,function(d){
			return d.value
		})])
		.range([height,0])

var linearColorScale = d3.scale.linear()
						.domain([0,data.length])
						.range(['#FF0000','#FFFF00'])

var ordinalColorScale = d3.scale.category10();	

var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")

var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")							

var svg = d3.select("body").append("svg")
			.attr("id","chart")
			.attr("height",h)
			.attr("width",w);

var chart = svg.append("g")
			.classed("plotBar",true)
			.attr("transform","translate(" + margin.left + "," + margin.top + ")");			

function plot(param) {
 	this.selectAll(".bar")
		.data(param.data)
		.enter()
			.append("rect")	
			.classed("bar",true)
			.attr("y",function(d,i){
				return y(d.value);
			})
			.attr("x",function(d,i){
				return x(d.key);
			})
			.attr("dy",-8)
			.attr("width",function(d,i){
				// return x(d.value);
				return x.rangeBand();
			})
			.attr("height",function(d,i){
				// return y.rangeBand()-1;
				return height - y(d.value);
			})
			.style("fill", function(d,i){
				return ordinalColorScale(i)
				// return linearColorScale(i);
			});

	this.selectAll(".bar-label")
		.data(param.data)
		.enter()
			.append("text")
			.classed("bar-label",true)
			.attr("x",function(d,i){
				return x(d.key);
			})
			.attr("dx", x.rangeBand()/2)
			.attr("y", function(d,i){
				return y(d.value);
			})
			.attr("dy",-6)
			.text(function(d,i){
				return d.value;
			})
	this.append("g")	
		.classed("x axis", true)
		.attr("transform","translate(" + 0 + "," + height + ")")
		.call(xAxis);

	this.append("g")
		.classed("y axis", true)
		.attr("transform","translate(0,0)")
		.call(yAxis);
}

plot.call(chart,{
	data: data
});
