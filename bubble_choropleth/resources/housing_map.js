var width = 1010,
    height = 750,
    sidebar_width = 200,
    title_bar_height = 50,
    active = d3.select(null);

var projection = d3.geo.albersUsa()
    .scale(900)
    .translate([(width - 150) / 2, height / 2]);

var zoom = d3.behavior.zoom()
    .translate([0, 0])
    .scale(1)
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

var path = d3.geo.path()
    .projection(projection);

var titleFrame = d3.select("#map").append("svg")
    .attr("width", width )
    .attr("height", 50);

titleFrame.append("rect")
    .attr("class", "titlebar")
    .attr("width", width)
    .attr("height", 50);


// background
var svg = d3.select("#map").append("svg")
    .attr("width", (width ))
    .attr("height", (height ))
    .on("click", stopped, true);


var map_box = svg.append('g');
// var title_box = svg.append('g');
var side = svg.append('g');

// title_box.append("rect")
//   .attr("class", "titlebar")
//   .attr("width", width)
//   .attr("height", 50);


map_box.append("rect")
    .attr("class", "background")
    .attr("width", (width - sidebar_width))
    .attr("height", height)
    .attr("transform", "translate(0, 0)")
    .on("click", reset);

// var sidebar = d3.select("#map").append("svg")
//   .attr("width", sidebar_width)
//   .attr("height", height);

side.append("rect")
    .attr("class", "sidebar")
    .attr("width", sidebar_width)
    .attr("height", height);
// .attr("transform", "translate(" + (width - sidebar_width) + ", 0)");



var g = map_box.append("g");


side.attr("transform", "translate(810, 0)");

// for the tooltips
var div = d3.select("#map").append("div").attr("class", "tooltip").style("opacity", 0);


/// for the colors
// see http://gka.github.io/palettes/

color_range = ['#8b0000', '#b11109', '#d1301f', '#ea513d', '#fd7464', '#ff9c96',
    '#ffffff', '#cbfaff', '#90e9ff', '#67cffd', '#369ef4', '#2879dd',
    '#1756ba' ]
var color_domain = [ -0.25, -0.20, -0.15, -0.10, -0.03, 0, 0.03, 0.10, 0.15, 0.20, 0.30, 0.40 ]
var legend_labels = [ "< -25%", "< -20%", "< -15%", "< -10%", "< -3%", "<   0%",
    "<   3%", "<   10%", "<   15%", "<   20%", "<   30%", "<   40%", ">= 40%" ]

var thresh = d3.scale.threshold()
    .domain(color_domain)
    .range(color_range);

var color = d3.scale.threshold()
    .domain(color_domain)
    .range(color_range);

function get_color(year){
    if (isNaN(year)) {return "#ffffff"}
    return color(year);
}

function format_pct(val){
    if (val === undefined){ return "no data" };
    return d3.format("%")(val);
}

function format_money(val){
    if (val === undefined){ return "no data" };
    return d3.format("$,.0f")(val);
}

map_box
    .call(zoom) // delete this line to disable free zooming
    .call(zoom.event);


var currentYear = 2005;



d3.json("resources/us-10m_mod.json", function(error, us) {
    if (error) throw error;

    // we want to start with percentage changed mapped
    var attr = "p";

    g.selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "feature")
        .style("fill", function(d) { return get_color(d.properties[("p" + currentYear.toString())])})

        .on("click", clicked)

        .on("mouseover", function(d) {
            d3.select(this).transition().duration(300)
                .style("opacity", 1)
                .style("stroke-width", "0.3px")
                .style("stroke", "#ff00ff");

            div.transition().duration(300).style("opacity", 1);


            // this might be the uglist code i've ever written
            div.html("<b>" +  d.properties.CountyName + ", " + d.properties.StateName + "</b><br>"
                + "<table> <tr> <th> Year</th> <th>Average Value </th> <th>Change</th> </tr>"
                + "<tr><td>1997</td><td>" + format_money(d.properties.r1997) + "</td><td>" + format_pct(d.properties.p1997) + "</td></tr>"
                + "<tr><td>1998</td><td>" + format_money(d.properties.r1998) + "</td><td>" + format_pct(d.properties.p1998) + "</td></tr>"
                + "<tr><td>1999</td><td>" + format_money(d.properties.r1999) + "</td><td>" + format_pct(d.properties.p1999) + "</td></tr>"
                + "<tr><td>2000</td><td>" + format_money(d.properties.r2000) + "</td><td>" + format_pct(d.properties.p2000) + "</td></tr>"
                + "<tr><td>2001</td><td>" + format_money(d.properties.r2001) + "</td><td>" + format_pct(d.properties.p2001) + "</td></tr>"
                + "<tr><td>2002</td><td>" + format_money(d.properties.r2002) + "</td><td>" + format_pct(d.properties.p2002) + "</td></tr>"
                + "<tr><td>2003</td><td>" + format_money(d.properties.r2003) + "</td><td>" + format_pct(d.properties.p2003) + "</td></tr>"
                + "<tr><td>2004</td><td>" + format_money(d.properties.r2004) + "</td><td>" + format_pct(d.properties.p2004) + "</td></tr>"
                + "<tr><td>2005</td><td>" + format_money(d.properties.r2005) + "</td><td>" + format_pct(d.properties.p2005) + "</td></tr>"
                + "<tr><td>2006</td><td>" + format_money(d.properties.r2006) + "</td><td>" + format_pct(d.properties.p2006) + "</td></tr>"
                + "<tr><td>2007</td><td>" + format_money(d.properties.r2007) + "</td><td>" + format_pct(d.properties.p2007) + "</td></tr>"
                + "<tr><td>2008</td><td>" + format_money(d.properties.r2008) + "</td><td>" + format_pct(d.properties.p2008) + "</td></tr>"
                + "<tr><td>2009</td><td>" + format_money(d.properties.r2009) + "</td><td>" + format_pct(d.properties.p2009) + "</td></tr>"
                + "<tr><td>2010</td><td>" + format_money(d.properties.r2010) + "</td><td>" + format_pct(d.properties.p2010) + "</td></tr>"
                + "<tr><td>2011</td><td>" + format_money(d.properties.r2011) + "</td><td>" + format_pct(d.properties.p2011) + "</td></tr>"
                + "<tr><td>2012</td><td>" + format_money(d.properties.r2012) + "</td><td>" + format_pct(d.properties.p2012) + "</td></tr>"
                + "<tr><td>2013</td><td>" + format_money(d.properties.r2013) + "</td><td>" + format_pct(d.properties.p2013) + "</td></tr>"
                + "<tr><td>2014</td><td>" + format_money(d.properties.r2014) + "</td><td>" + format_pct(d.properties.p2014) + "</td></tr>"
                + "<tr><td>2015</td><td>" + format_money(d.properties.r2015) + "</td><td>" + format_pct(d.properties.p2015) + "</td></tr>"
                + "<tr><td>2016</td><td>" + format_money(d.properties.r2016) + "</td><td>" + format_pct(d.properties.p2016) + "</td></tr>"
                + "</table>"
            )
            // .style("left", "1015px")
            // .style("top",  "610px")
                .attr('tooltip');
        })

        .on("mouseout", function() {
            d3.select(this)
                .transition().duration(100)
                .style("stroke-width", "0.1px")
                .style("stroke", "#404040");

            // keep the tooltips table visible
            // div.transition().duration(300).style("opacity", 0);
        });


    g.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "state")
        .attr("d", path);

    g.append("path")
        .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b; }))
        .attr("class", "mesh")
        .attr("d", path);

    g.selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "feature" );


    // selecting the year based on the damn svg slider
    // mousemove might not be the best?
    d3.selectAll(".handle").on("mousemove", function change() {
        // d3 magic
        d3.selectAll("path.feature").transition(140).style("fill", function(d) {
            var field = "p" + currentYear.toString();

            // county without properties defined
            if (d.properties === undefined) {return "#ffffff"}

            // checking if the year is null or if the county has any data at all
            if (field in d.properties){
                if (isNaN(d.properties[field])) { return "#ffffff"}
                else {return color(d.properties[field]) }
            }
            else { return "#ffffff" }
        });

    });

    d3.selectAll(".handle").on("mouseup", function change() {
        // d3 magic
        d3.selectAll("path.feature").transition(140).style("fill", function(d) {
            var field = "p" + currentYear.toString();

            // county without properties defined
            if (d.properties === undefined) {return "#333333"}

            // checking if the year is null or if the county has any data at all
            if (field in d.properties){
                if (isNaN(d.properties[field])) { return "#333333"}
                else {return color(d.properties[field]) }
            }
            else { return "#333333" }
        });

    });


}); // end of d3.json


// zooming; lifted straight from mbostock's block
function clicked(d) {
    if (active.node() === this) return reset();
    active.classed("active", false);
    active = d3.select(this).classed("active", true);

    var bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / (width - sidebar_width), dy / height))),
        translate = [(width - sidebar_width) / 2 - scale * x, height / 2 - scale * y];

    g.transition()
        .duration(750)
        .call(zoom.translate(translate).scale(scale).event);
}

function reset() {
    active.classed("active", false);
    active = d3.select(null);

    g.transition()
        .duration(750)
        .call(zoom.translate([0, 0]).scale(1).event);
}

function zoomed() {
    g.style("stroke-width", 1.5 / d3.event.scale + "px");
    g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

// If the drag behavior prevents the default click,
// also stop propagation so we don’t click-to-zoom.
function stopped() {
    if (d3.event.defaultPrevented) d3.event.stopPropagation();
}



titleFrame.append("text")
    .attr("x", ((width ) / 2))
    .attr("y", (5))
    .attr("id", "mapTitle")
    .attr("transform", "translate(0, 15)")
    .style("text-anchor", "middle")
    .text('Median Home Price Change in Percentage');

titleFrame.append("text")
    .attr("x", ((width ) / 2))
    .attr("y", (30))
    .attr("id", "mapText")
    .attr("transform", "translate(0, 15)")
    .style("text-anchor", "middle")
    .text('');


// title_box.append("text")
//         .attr("x", ((width ) / 2))
//         .attr("y", (10))
//         .attr("id", "mapTitle")
//         .attr("value", "2001")
//         .attr("transform", "translate(0, 15)")
//         .style("text-anchor", "middle")
//         .text('');

function updateTitle(year){
    d3.selectAll("#mapText").text("Current years: " + (year - 1) + " to " + year );
}


// legend stuff
side.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(50,20)");

var legendLinear = d3.legend.color()
    .shapeWidth(40)
    .cells(12)
    .orient('vertical')
    .ascending(true)
    .shapePadding(0.3)
    .labels(legend_labels)
    .labelFormat(d3.format("%"))
    .title("percent changed")
    .scale(thresh);


side.select(".legend").call(legendLinear);


// zillow branding
// svg.append("svg:image")
//     .attr('x', (0))
//     .attr('y', (height - 40))
//     .attr('width', 150)
//     .attr('height', 40)
//     .attr("xlink:href","http://www.zillow.com/widgets/GetVersionedResource.htm?path=/static/logos/Zillowlogo_150x40.gif");


var slider_height = 685;

// damn svg slider

var x = d3.scale.linear()
    .domain([1997, 2016])
    .rangeRound([ 25, (sidebar_width - 25)])
    .clamp(true);

var brush = d3.svg.brush()
    .x(x)
    .extent([2001])
    .on("brush", brushed);


// the axis for our d3 slider.
side.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + slider_height + ")")
    .call(d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(function(d) { return d + ""; })
        .tickSize(2)
    )
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("x", "-15")
    .attr("y", "5")
    .attr("transform", function(d) { return "rotate(-65)" })

    .select(".domain")
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "halo");

var slider = side.append("g")
    .attr("class", "slider")
    .call(brush);

slider.selectAll(".extent,.resize")
    .remove();


var handle = slider.append("circle")
    .attr("class", "handle")
    .attr("transform", "translate(0, " + slider_height + ")")
    .attr("r", 14);


handle.append('text')
    .text("2016")
    .attr("transform", "translate(" + (-18) + " ," + (height / 2 - 25) + ")");


slider
    .call(brush.event)
    .call(brush.extent([2005, 2005]))
    .call(brush.event);

// needed to update the intial drawing
var e = document.createEvent('UIEvents');
e.initUIEvent('mousemove', true, true);
d3.select(".handle").node().dispatchEvent(e);

function brushed() {
    var value = brush.extent()[0];

    if (d3.event.sourceEvent) { // not a programmatic event
        value = x.invert(d3.mouse(this)[0]);
        brush.extent([value, value]);
    }

    handle.attr("cx", x(value));
    handle.select('text').text(value);
    currentYear = toInt(value);

    // console.log("Value: " + value);
    // console.log("currentYear: " + currentYear);

    updateTitle(currentYear);
    d3.selectAll("input").attr("value", currentYear);

}


function toInt(n){ return Math.round(Number(n)); };

