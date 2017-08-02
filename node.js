var line;
// create node function creates a node
function createNode(classname, node_pos_x, node_pos_y, node_width, node_height, redraw=false)
{
    var node_count = d3.selectAll('g.node').size();
    if(redraw) console.log('redraw=true');

    // adds a g svg element to the canvas (svg with id charts) with its (x, y) cocordinate and draggable behavior
    var container = d3.select("#charts")
        .append("g")
        .data([ {"x":node_pos_x, "y":node_pos_y} ])
        .attr("width", node_width)
        .attr("height", node_height)
        .attr("class", classname)
        .attr("id", "node"+node_count)
        .attr("transform", "translate(" + node_pos_x + "," + node_pos_y + ")")
        .call(in_editor_drag);

    // adds node id in node_list dict
    node_list["node"+node_count] = {'in_ctx': [],'out_ctx': "node"+node_count,'co_ordinate': {'x': node_pos_x, 'y': node_pos_y}, 'parent_nodes': [], 'child_nodes': [],'connected_lines': []};

    var node_header = container.append("svg:rect")
        .attr("class", "node-header")
        .attr("stroke", "#616161")
        .style("fill", "#E6E2E1")
        .attr("stroke-width", 1)
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .attr("width", node_width)
        .attr("height", 20);

    var node_move_btn = container.append("svg:image")
        .attr("xlink:href", "img/node_move.png")
        .attr('class', 'node-move-btn')
        .attr("width", 12)
        .attr("height", 12)
        .attr("x", 5)
        .attr("y",3)
        .on('mousedown', check_which_rect);

    var node_edit_btn = container.append("svg:image")
        .attr("xlink:href", "img/node_edit.png")
        .attr('class', 'node-edit-btn')
        .attr("width", 12)
        .attr("height", 12)
        .attr("x", 60)
        .attr("y",3)
        .on('mousedown', node_edit);

    var node_delete_btn = container.append("svg:image")
        .attr("xlink:href", "img/node_delete.png")
        .attr('class', 'node-cross-btn')
        .attr("width", 12)
        .attr("height", 12)
        .attr("x", 80)
        .attr("y",3)
        .on('mousedown', node_delete);



    var node_content = container.append("svg:rect")
        .attr("class", "node-content")
        .attr("stroke", "#616161")
        .attr("stroke-width", 1)
        .style("fill", "#E6E2E1")
        .attr("transform", "translate(" + 0 + "," + 20 + ")")
        .attr("width", node_width)
        .on('mousedown', check_which_rect)
        .attr("height", node_height - 20);


    /*
        var cross_btn = container.append('path')
        .attr("d", d3.svg.symbol().type("cross").size(cross_size))
        .attr("transform", "translate(" + parseInt(right_connector_offset_x - 10) + "," + 10 + ") rotate("+45+")")
        .style("fill", "steelblue")
        //.on('mousedown', function() {clearNodes(node_count);})
        .attr("class", "node-delete");
    */


    var top_connector = container.append('path')
        .attr("d", d3.svg.symbol().type("circle").size(connector_size))
        .attr("transform", "translate(" + top_connector_offset_x + "," + top_connector_offset_y + ")")
        .style("fill", "steelblue") //#E6E2E1
        .attr("class", "node-connector-top node-connector")
        .on('mousedown', mousedown)
        .on('mouseenter', mouseenter)
        ;

    var bottom_connector = container.append('path')
        .attr("d", d3.svg.symbol().type("circle").size(connector_size))
        .attr("transform", "translate(" + bottom_connector_offset_x + "," + bottom_connector_offset_y + ")")
        .style("fill", "steelblue") //#E6E2E1
        .attr("class", "node-connector-bottom node-connector")
        .on('mousedown', mousedown)
        .on('mouseenter', mouseenter)
        ;

    var node_txt = container.append("svg:text")
        .attr('x', 30)
        .attr('y', 50)
        .attr("dy", ".35em")
        .style("fill", "black")
        .attr("id", "node_txt")
        .text("node "+node_count);

   /* var html = node_header.append('svg:foreignObject')
        .attr('width', node_width)
        .attr('height', 20)
        .style("font", "8px 'Helvetica Neue'")
        .style("text-align", "center")
        .html("<div style='background-color:gray;' class='node_prop_container'><div class='edit'><a href='#'><i class='fa fa-pencil fa-lg'></i></a></div><input type='button' class='node_edit' value='Edit' onclick='node_event_handlers.handle_node_edit();'><input type='button' class='node_delete' value='Delete' onclick='node_event_handlers.handle_node_delete();'></div>");
*/
    //.html("<div class='node-header node_prop_container' style='background-color:gray;'><h1>Node Name</h1><div class='edit'><a href='#'><i class='fa fa-pencil fa-lg'></i></a></div><input type='button' class='node_edit' value='Edit' onclick='node_event_handlers.handle_node_edit();'><input type='button' class='node_delete' value='Delete' onclick='node_event_handlers.handle_node_delete();'></div>");

    start_connector_x = null;
    start_connector_y = null;
}

// function to remove nodes from drawing canvas
function clearNodes(node_id=null) {
    console.log("node_id inside clear"+ node_id);
    for(var i=0;i<Object.keys(node_list).length;i++) {
        var selector = 'g#node'+i;
        console.log("selector: "+selector);
        d3.select(selector).remove();
    }
}

// function to redraw flowchart from the saved nodes, lines list
function redrawNodes() {
    for(var i=0;i<Object.keys(node_list).length;i++) {
        var node = node_list[Object.keys(node_list)[i]];
        createNode('node', node.co_ordinate.x, node.co_ordinate.y, node_width, node_height, redraw=true);
        console.log("inside redraw...");
    }
}

// addNode function called for onclick event
function addNode() {
    createNode("node", top_left_x, top_left_y, node_width, node_height);
}