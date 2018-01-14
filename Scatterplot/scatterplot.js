var w = 800;
var h = 450;
var margin = {
	top: 60,
	bottom: 80,
	left: 80,
	right: 80
};
var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
			.attr("id", "chart")
			.attr("width", w)
			.attr("height", h);

var chart = svg.append("g")
			.classed("display", true)
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scale.linear()
		.domain(d3.extent(data,function(d){
			return d.age
		}))
		.range([0,width]);

var y = d3.scale.linear()
		.domain([1,5])
		.range([height,0]);	

var responseScale = d3.scale.linear()
					.domain(d3.extent(data,function(d){
						return d.responses
					}))
					.range([2,15])		

var tickValue = [18,25,32,39,45,52,60,68,74];

var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")	
			.tickValues(tickValue);

var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")	
			.ticks(5)	
			.tickSize(20)
			.tickFormat(function(d){
				return d.toFixed(1)
			});

var xGridline = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickSize(height,height)
				.tickFormat("")
				.tickValues(tickValue)

var yGridline = d3.svg.axis()
				.scale(y)
				.orient("left")
				.tickSize(-width,0,0)	
				.tickFormat("")											

function drawAxis(params){
	if(params.initialize){

		this.append("g")
			.classed("x gridlines", true)
			.attr("transform", "translate(0,0)")
			.call(params.axis.gridlines.x)

		this.append("g")
			.classed("y gridlines", true)
			.attr("transform", "translate(0,0)")
			.call(params.axis.gridlines.y)

		this.append("g")
			.classed("x axis",true)
			.attr("transform","translate(0," + height + ")")
			.call(params.axis.x)

		this.append("g")
			.classed("y axis", true)
			.attr("transform", "translate(0,0)")
			.call(params.axis.y)
	}
	
}


function plot(params){

	drawAxis.call(this,params);

	var self = this;
	var donuts = d3.keys(params.data[0]).filter(function(k){
		return k !== 'age' && k !== 'responses'
	});

	this.selectAll(".donut")
		.data(donuts)
		.enter()
			.append("g")
			.attr("class",function(d){
				return d;
			})
			.classed("donut",true);

	donuts.forEach(function(donut){
		var g = self.selectAll("g."+donut);
		var arr = params.data.map(function(d){
				return {
					key: donut,
					value:d[donut],
					age: d.age,
					responses: d.responses
				};
		});

		//enter()
	g.selectAll(".responses")
		.data(arr)
		.enter()
			.append("circle")
			.classed("responses",true);

	//update()
	g.selectAll(".responses")
	  	.attr("r",function(d){
	  		return responseScale(d.responses)
	  	})
	  	.attr("cx", function(d){
	  		return x(d.age)
	  	})
	  	.attr("cy", function(d){
	  		return y(d.value)
	  	});

	//exit()
	g.selectAll(".responses")
		.data(arr)
		.exit()
		.remove();
	});
	
	
}	

plot.call(chart,{
	data: data,
	axis: {
		x: xAxis,
		y: yAxis,
		gridlines: {
			x: xGridline,
			y: yGridline
		}
	},
	initialize: true
})	