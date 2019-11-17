// making all tables sortable
$(document).ready(function() {
	var tables = $("table");
	makeAllTablesSortable(tables);
});

// make the tables sortable by clicking on the table head
function makeAllTablesSortable(tables) {
	for(var i = 0; i < tables.length; i ++) {
		var table_heads = $(tables[i]).find("th");
		if (table_heads.length == 0) {
			table_heads = tables[i].rows[0];
		}
		for(var j = 0; j < table_heads.length; j++) {
			$(table_heads[j]).attr("id", j);
		}
		for(var j = 0; j < table_heads.length; j++) {
			$(table_heads[j]).click(function() {
				sort(this.parentNode.parentNode.parentNode, this);
			});
		}
	}
}
function sort(table, head) {
	var to_sort = [];
	head_id = head.id; row_len = table.rows.length;
	Sequence = $(head).attr("class");// get the Sequence if whether the table colum is already sorted or not
	for(var i = 1; i < row_len; i++) {to_sort[i - 1] = table.rows[i];}// get each row for sorting	
	to_sort.sort(compare(Sequence));// sort it
	for(var i = 0; i < row_len-1; i++) {to_sort[i] = $(to_sort[i]).html();}// prevent reference error
	for(var i = 0; i < row_len-1; i++) {$(table.rows[i+1]).html(to_sort[i]);}// change the rows	
	for (var i = 0; i < table.rows[0].cells.length; i++) {$(table.rows[0].cells[i]).attr("class", "");}// set other soeted colum to be none
	if(Sequence != "Ascending") $(head).attr("class", "Ascending");// set the Sequnce
	else $(head).attr("class", "Descending");
}
function compare(Sequence) {
	return function(row1,row2) {
		var value1 = $(row1.cells[head_id]).html();
		var value2 = $(row2.cells[head_id]).html();
		if (value1 < value2) {return  (Sequence == "Ascending" ? 1 : -1);} 
		else if (value1 > value2) {return  (Sequence == "Ascending" ? -1 : 1);} 
		else  {return 0;}
	}
}
