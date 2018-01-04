D3 basic functions
-------------------

var data = [1222,34,1,23,5,455]

console.log(d3.min(data))
console.log(d3.max(data))
console.log(d3.extent(data))
console.log(d3.min(data))

var obj = [{name: 'a',age: 12},{name: 'b',age: 20}]

console.log(d3.min(obj,function(i){
	return i.age 
}))