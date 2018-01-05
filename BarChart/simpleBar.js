var h = 450;
var w = 800;
var data = [102,34,566,89,70,86,34,89,100];
var x = d3.scale.linear()
		.domain([0,d3.max(data)])
		.range([0,w-5])

var y = d3.scale.linear()
 		.domain([0,data.length])
 		.range([0,h])

var svg = d3.select("body").append("svg")
			.attr("id","chart")
			.attr("height",h)
			.attr("width",w);

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

plot.call(svg,{
	data: data
});
