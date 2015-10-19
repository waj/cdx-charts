var data = {"tests":[{"test.name":"GenoType MTBDRplus VER 2.0","count":16},{"test.name":"Other","count":2},{"test.name":"Something","count":8},{"test.name":"Foo","count":8}],"total_count":22}

var width = 600,
  height = 250,
  radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
  .range(["#9D1CB2", "#F6B500", "#47B04B", "#009788", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
  .outerRadius(radius - 10)
  .innerRadius(radius - 35);

var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) { return d.count; });

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + radius + "," + height / 2 + ")");

var text = svg.append("text")
  .attr("text-anchor", "middle")
  .text(data["total_count"])
  .attr("fill", "#555555")
  .attr("font-size", "3.5em")
  .attr("dy", ".35em")
  .attr("font-weight", "bold");

var g = svg.selectAll(".arc")
  .data(pie(data.tests))
  .enter().append("g")
  .attr("class", "arc");

g.append("path")
  .attr("d", arc)
  .style("fill", function(d) { return color(d.data["test.name"]); });


var legendPos = d3.scale.ordinal()
  .domain(_.map(data.tests, function(x, i) { return i; }))
  .rangePoints([-25 * (data.tests.length - 1) / 2, 25 * (data.tests.length - 1) / 2]);

var legend = svg.selectAll(".legend")
  .data(data.tests)
  .enter().append("g")
  .attr("transform", function(d, i) { return "translate(" + (radius + 20) + "," + legendPos(i) + ")"; });

legend.append("circle")
  .attr("r", 8)
  .style("fill", function(d) { return color(d["test.name"]); });

legend.append("text")
  .attr("dy", ".35em")
  .attr("dx", 15)
  .attr("fill", "#555555")
  .text(function(d) { return d["test.name"]; });

