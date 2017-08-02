var source_node;
var dest_node;
var source_connector;
var dest_connector;
// line drawing event handlers
function mousedown() {
    node_id = d3.select(this.parentNode).attr('id');
    source_node = node_id;
    dest_node = null;
    console.log("inside mousedown..");

    var elem = d3.select('svg');
    var m = d3.mouse(elem.node());

    var elem = d3.select(this.parentNode); // get the g element

    if(elem.attr("class").indexOf("node-connector") != -1) check_which_rect = 'on_connector';

    line_svg = d3.select('#charts'); // this is the same svg
    connection_list_size = Object.keys(connection_list).length;

    d3.select(this).style("fill", "#2B78BD");

    // initially set the starting point as the line start(x1, y1) and end point(x2, y2)
    line = line_svg.append("line")
        .attr("x1", m[0])
        .attr("y1", m[1])
        .attr("x2", m[0])
        .attr("y2", m[1])
        .on('mouseover', line_mouseover)
        //.append("svg:path")
	    //.attr("d", d3.svg.symbol().type("circle")(m[0], m[1]))
	    //.attr("d", d3.svg.symbol().type("circle").size(connector_size)(m[0], m[1]))
        .attr("class", "connector_line")
        .attr("id", "line"+connection_list_size);


/*

var crs = line.append("defs")
        .append('pattern')
        .attr('id', 'locked2')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 4)
        .attr('height', 4)
        .append("image")
        .attr("xlink:href", "img/node_delete.png")
        .attr('width', 4)
        .attr('height', 4);

    var line_delete_btn = line.append("svg:image")
        .attr("xlink:href", "img/node_delete.png")
        .attr('class', 'node-cross-btn')
        .attr("width", 12)
        .attr("height", 12)
        .attr("x", 80)
        .attr("y",3);
*/

    start_connector_x = m[0];
    start_connector_y = m[1];
    //console.log("start_connector_x: " + start_connector_x);
    //console.log("start_connector_y: " + start_connector_y);


    var which_connector;
    if(d3.select(this).attr('class').indexOf('top') != -1) which_connector = 'top';
    else if(d3.select(this).attr('class').indexOf('bottom') != -1) which_connector = 'bottom';
    //else if(d3.select(this).attr('class').indexOf('left') != -1) which_connector = 'left';
    //else if(d3.select(this).attr('class').indexOf('right') != -1) which_connector = 'right';

    source_connector = which_connector;
    //this.parentNode.insertBefore(this, this.parentNode);

    node_list[d3.select(this.parentNode).attr('id')].connected_lines.push({'id': "line"+connection_list_size, 'connected_end': {'x': 'x1', 'y': 'y1'}, 'connector': which_connector});

    // call the mouse move event handler to continuous drawing of the line
    line_svg.on("mousemove", mousemove);
}

function mousemove() {
    // get the end(x2, y2) point from mouse co-ordinate with respect to svg
    var elem = d3.select('svg');
    var m = d3.mouse(elem.node());

    // set the line end(x2, y2) co-ordinate
    line.attr("x2", m[0])
        .attr("y2", m[1]);

    // then call the mouse up event when reach the connection end point or the second node connection point
    line_svg.on("mouseup", mousmove_null);



}

function mousmove_null() {
    line_svg.on("mousemove", null);
    line_svg.on("mouseup", null);
}

function mouseenter() {
    console.log("inside mouse enter..");
    dest_node = d3.select(this.parentNode).attr('id');
    console.log("source_node: "+ source_node);
    console.log("dest_node: "+ dest_node);

    if(source_node != null && source_node != dest_node) // start_connector_x !== null && start_connector_y !== null
    {
        var elem = d3.select('svg'); // get the svg the main container of all svg elements nodes, lines etc
        var m = d3.mouse(elem.node());

        console.log("inside mouse enter if: ");
        console.log("source node: "+ source_node);
        console.log("dest node: "+ dest_node);

        connection_list_size = Object.keys(connection_list).length;

        console.log("connection_list_size: "+ connection_list_size);

        var which_connector;
        if(d3.select(this).attr('class').indexOf('top') > 0) which_connector = 'top';
        else if(d3.select(this).attr('class').indexOf('bottom') > 0) which_connector = 'bottom';
        //else if(d3.select(this).attr('class').indexOf('left') > 0) which_connector = 'left';
        //else if(d3.select(this).attr('class').indexOf('right') > 0) which_connector = 'right';

        dest_connector = which_connector;
        //this.parentNode.insertBefore(this, this.parentNode);



        node_list[d3.select(this.parentNode).attr('id')].connected_lines.push({'id': "line"+connection_list_size, 'connected_end': {'x': 'x2', 'y': 'y2'}, 'connector': which_connector});
        connection_list['line'+connection_list_size] = line; // add the newly created line object to connection_list list
        d3.select(this).style("fill", "steelblue");

        if(source_connector == 'bottom') {
            node_list[dest_node].in_ctx.push(source_node);
        } else if(source_connector == 'top') {
            node_list[source_node].in_ctx.push(dest_node);
        }
    }
    start_connector_x = null;
    start_connector_y = null;

    source_node = null;
    dest_node = null;
    source_connector = null;
    dest_connector = null;
    //connector.transform("scale", 0.5);
}

function line_mouseover() {
    console.log('line id: '+ d3.select(this).attr('id'));
    var mid_x = parseInt(d3.select(this).attr('x1')) + parseInt(d3.select(this).attr('x2'));
    var mid_y = parseInt(d3.select(this).attr('y1')) + parseInt(d3.select(this).attr('y2'));
    console.log("mid_x: "+ mid_x+" "+"mid_y: "+ mid_y);
    var line_cross = d3.select("#"+d3.select(this).attr('id'))
        .append("circle")
        .attr("cx", parseInt(mid_x/2))
        .attr("cy", parseInt(mid_y/2))
        .attr("r", 5)
        .style("fill", "none")
        .style("stroke", "steelblue");
        /*
        .append("path")
    .attr("d", d3.svg.symbol().type("circle").size(connector_size)(mid_x / 2, mid_y / 2));
        */
}
/*
return this.each(function() {
        this.parentNode.appendChild(this);
        });
*/

/*
d3.selection.prototype.moveToBack = function() {
        return this.each(function() {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) {
                this.parentNode.insertBefore(this, firstChild);
            }
        });
    };
*/