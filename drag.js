function node_delete() {
    console.log('inside node_delete...');
    d3.select(this.parentNode).on('mousedown.drag', null);
    d3.select(this.parentNode).remove();
    delete node_list[d3.select(this.parentNode).attr('id')];
}


function check_which_rect() {
    var elem = d3.select(this); // get the svg the main container of all svg elements nodes, lines etc
    which_rect = elem.attr('class');
    if(which_rect.indexOf('content') != -1)
        which_rect = 'content';
    else if(which_rect.indexOf('move') != -1)
        which_rect = 'header';
    console.log("inside check_which_rect function: " + which_rect);
}

var in_editor_drag = d3.behavior.drag()

    .origin(function() {
        console.log("inside on drag.." + which_rect);
        var g = this;
        return {x: d3.transform(g.getAttribute("transform")).translate[0],
        y: d3.transform(g.getAttribute("transform")).translate[1]};
    })
    .on("drag", function(d,i) {
        console.log("inside on drag.." + which_rect);
        if(which_rect != 'content' && which_rect != 'on_connector' && which_rect == 'header') {
            g = this;

            translate = d3.transform(g.getAttribute("transform")).translate;
            d.x = d3.event.dx + translate[0];
            d.y = d3.event.dy + translate[1];

            var node = node_list[d3.select(this).attr('id')];
            var line_len = node.connected_lines.length;

            if(line_len > 0) {
                for(i=0;i<line_len;i++) {
                    var connector_offset_x;
                    var connector_offset_y;

                    var connector_pos = node.connected_lines[i].connector;

                    if(connector_pos == 'top') {
                        connector_offset_x = top_connector_offset_x;
                        connector_offset_y = top_connector_offset_y;
                    } else if(connector_pos == 'bottom') {
                        connector_offset_x = bottom_connector_offset_x;
                        connector_offset_y = bottom_connector_offset_y;
                    }
                    d3.select('#'+node.connected_lines[i].id).attr(node_list[d3.select(this).attr('id')].connected_lines[i].connected_end.x, parseInt(d.x + connector_offset_x) );
                    d3.select('#'+node.connected_lines[i].id).attr(node_list[d3.select(this).attr('id')].connected_lines[i].connected_end.y, parseInt(d.y + connector_offset_y));
                }
            }

            d3.select(g).attr("transform", "translate(" + d.x + "," + d.y + ")");
        }
    })
    .on("dragend", function(d) {
        console.log('inside dragend..');
        if(which_rect != 'content' && which_rect != 'on_connector' && which_rect == 'header') {
            node_list[d3.select(this).attr('id')].co_ordinate = {'x': d.x, 'y': d.y};
            which_rect = null;
        }
    });

// TODO
/*
function on_zoomed() {
    container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
*/

// TODO
// zoom behavior for whole canvas with its elements - nodes, links etc
/*var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", on_zoomed);
*/