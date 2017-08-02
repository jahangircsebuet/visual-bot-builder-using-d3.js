// node top, top-left co-ord, height, width variables
var top_left_offset_x = 10;
var top_left_offset_y = 10;
var top_left_x = 0 + top_left_offset_x;
var top_left_y = 0 + top_left_offset_y;
var node_width = 100;
var node_height = 100;

var top_connector_offset_x = (node_width) / 2;
var top_connector_offset_y = 0;

var bottom_connector_offset_x = (node_width) / 2;
var bottom_connector_offset_y = 100;

/*
var left_connector_offset_x = 0;
var left_connector_offset_y = (node_height) / 2;

var right_connector_offset_x = 100;
var right_connector_offset_y = (node_height) / 2;
*/

var connector_size = 200;
var cross_size = 100;
var which_rect;
var connection_list = [];

