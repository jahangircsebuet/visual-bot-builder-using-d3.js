function drawCanvas(width, height) {

    // set the svg id to 'charts', set height, width and append a svg:g element
    svg = d3.select("body").append("svg").attr("id", "charts")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("class", "first-g")
        .attr("transform", "translate(" + margin.left + "," + margin.right + ")");
        // TODO
        //.call(zoom);

    // append another svg:g element as a container
    var container = svg.append("g").attr("class", "container");

    // draw the horizontal lines on the svg:g as a canvas
    container.append("g")
        .attr("class", "x axis")
        .selectAll("line")
        .data(d3.range(0, width, 10))
        .enter().append("line").attr('class', 'canvas_line')
        .attr("x1", function(d) { return d; })
        .attr("y1", 0)
        .attr("x2", function(d) { return d; })
        .attr("y2", height);

    // draw the vertical lines on the svg:g as a canvas
    container.append("g")
        .attr("class", "y axis")
        .selectAll("line")
        .data(d3.range(0, height, 10))
        .enter().append("line").attr('class', 'canvas_line')
        .attr("x1", 0)
        .attr("y1", function(d) { return d; })
        .attr("x2", width)
        .attr("y2", function(d) { return d; });
}