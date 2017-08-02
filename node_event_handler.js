var node_event_handlers = {

    'handle_node_delete' : function () {
        alert('Delete');
    },

    'handle_node_edit' : function () {
        alert('Edit');
    }
}

function node_edit() {
    console.log('edit btn clicked...');
    $("#myform").show(500);
}

/*
function node_delete_mousedown(event) {
    console.log('node delete called...');
    d3.select('#'+this.parentNode.id).remove();

}
*/