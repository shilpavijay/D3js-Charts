var h = 450;
var w = 800;
var data = [102,34,566,89,70,86,34,89,100];

var margin = {
	top: 20,
	bottom: 20,
	left: 20,
	right: 20
}

var height = h - margin.top - margin.bottom;
var width = w - margin.left - margin.right;

var x = d3.scale.linear()
		.domain([0,d3.max(data)])
		.range([0,width])

var y = d3.scale.linear()
 		.domain([0,data.length])
 		.range([0,height])

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
				return y(i);
			})
			.attr("x",0)
			.attr("width",function(d,i){
				return x(d);
			})
			.attr("height",function(d,i){
				return y(1)-1;
			});

	this.selectAll(".bar-label")
		.data(param.data)
		.enter()
			.append("text")
			.classed("bar-label",true)
			.attr("x",function(d,i){
				return x(d);
			})
			.attr("dx",-2)
			.attr("y", function(d,i){
				return y(i);
			})
			.attr("dy",y(1)/2)
			.text(function(d,i){
				return d;
			})	
}

plot.call(chart,{
	data: data
});
