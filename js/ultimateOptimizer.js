var iteration = 0;

function reset(){
	location.reload();
}

function createTable(){
	
	if($("#numOfVar").val().length == 0 | $("#numOfS").val().length == 0){
		$('#modal1').modal('open');
	} else{

		mytable = $('<table></table>').attr({ id: "tableValues" });
		var variables = parseInt($("#numOfVar").val()) + 1 ;
		var constraints = parseInt($("#numOfS").val()) + 1;
		var tr = [];
		for (var i = 0; i < constraints; i++) {
			var row = $('<tr></tr>').appendTo(mytable);
			for (var j = 0; j < variables; j++) {
				$('<td></td>').text('0').appendTo(row); 
			} 
		}
		mytable.appendTo("#simplexTable");	 

		// sets the table to editable table
		$('#tableValues').editableTableWidget();
		$('#tableValues').editableTableWidget({
			cloneProperties: ['background', 'border', 'outline']
		});    
		$('#tableValues').editableTableWidget().numericInputExample().find('td:first').focus();   
	}
  
}

function getTableValues(){

	var table = document.getElementById('tableValues');
	var count = 0;
	var mat = [];

	for (var i = 0; i < table.rows.length; i++) {
		for (var j = 0; j < table.rows[i].cells.length; j++) {
			mat[count++] = parseFloat(table.rows[i].cells[j].innerHTML);
		}
	}
	return mat;
}

function minimize(){

	var temp = document.getElementById('tableValues'); // check if the table have values

	if($("#numOfVar").val().length == 0 | $("#numOfS").val().length == 0){
		$('#modal1').modal('open');
	} else if(temp === null){
		$('#modal2').modal('open');
	} else{

		var count = 0;
		var row = parseInt($("#numOfS").val()) + 1;
		var col = parseInt($("#numOfVar").val()) + 1;
		var matrix = [];
		var mat = [];
		var temp = getTableValues(); // get the values from the table

		// convert array to 2D array
		for(var i = 0; i<row; i++){
			mat[i] = [];
			for(var j = 0; j<col; j++){
				mat[i][j] = temp[count++];
			}
		}

		// transpose table
	    for(var i = 0; i<col; i++){
	        matrix[i] = [];
	        for(var j = 0; j<row; j++){
	            matrix[i][j] = mat[j][i];
	        }
	    }

	    // negate last row of the table
	    for(var i = 0; i<matrix[0].length; i++){
	        matrix[matrix.length-1][i] = (matrix[matrix.length-1][i] * -1);  
	    }

	    simplex(matrix);
	}
}

function maximize(){

	var temp = document.getElementById('tableValues'); // check if the table have values

	if($("#numOfVar").val().length == 0 | $("#numOfS").val().length == 0){
		$('#modal1').modal('open');
	} else if(temp === null){
		$('#modal2').modal('open');
	} else{
		var row = parseInt($("#numOfS").val()) + 1
		var col = parseInt($("#numOfVar").val()) + 1;
		var count = 0;
		var matrix = [];
		var mat = getTableValues(); // get the values from the table

		for(var i = 0; i<row; i++){
			matrix[i] = [];
			for(var j = 0; j<col; j++){
				matrix[i][j] = mat[count++];
			}
		}

		// negate last row of the matrix
	    for(var i = 0; i<matrix[0].length; i++){
	        matrix[matrix.length-1][i] = (matrix[matrix.length-1][i] * -1);  
	    }

		simplex(matrix);
	}
}

function addSlackVariables(matrix){

	var matrixSlack = [];		

    var row = matrix.length;
    var col = matrix[0].length;
    var slackCounter = col - 1;

    for(var i = 0; i<row; i++){
        matrixSlack[i] = [];
        for(var j = 0 ; j < col; j++){
            matrixSlack[i][j] = matrix[i][j];
        }
        matrixSlack[i][slackCounter++] = 1;
        matrixSlack[i][row+col-2] = matrix[i][col-1];
    }

    // converts all undefined values to 0
    for(var i = 0; i<matrixSlack.length; i++){
        for(var j = 0; j<matrixSlack[0].length; j++){
            if(typeof matrixSlack[i][j] === 'undefined') matrixSlack[i][j] = 0;
        }
    }

    return matrixSlack;
}

function simplex(mat){

	var matrix =  addSlackVariables(mat); // get the values from the table

	var isDone = checkMatrix(matrix);
	while(!isDone){
		var pivotCol = pivotColumn(matrix);
		var pivotElem = pivotElement(matrix, pivotCol);
		var matrix = gaussJordan(matrix, pivotCol, pivotElem);
		isDone = checkMatrix(matrix);
	}
}

function checkMatrix(matrix){

	var isDone = true;
	var lastRow = matrix.length - 1;

	// checks if the values in the last row is not a negative number
	for( var i = 0; i<matrix[lastRow].length; i++ ){
		if(matrix[lastRow][i] < 0){
		  // returns FALSE if there is a negative number found which means the process is not yet done
		  isDone = false;
		}
	}

	return isDone;
}

function pivotColumn(matrix){
	
	var row = matrix.length - 1;
	var col = matrix[row].length;
	var pivotCol = 0;
	var max = 0;

	// traverses the last row to check for the negative number with the highest magnitude
	for(var i = 0; i<col; i++ ){
		if( matrix[row][i] < 0 ){
			if( Math.abs(matrix[row][i]) > max ){
				max = Math.abs(matrix[row][i]);
				pivotCol = i;
			} 
		}
	}
	
	// returns the column number for the pivot column
	return pivotCol;
}

function pivotElement(matrix, pivotCol){

	var row = matrix.length;
	var col = matrix[row-1].length - 1;
	var pivotElem = 0;
	var min = 0;
	var testRatio = []; // array for storing the TEST RATIO

	// computes for the test ratio by dividing the solution col and the pivot col
	for(var i = 0; i<row; i++){
		testRatio[i] = ( matrix[i][col] / matrix[i][pivotCol] );
	}

	// finds the lowest value in the test ratio (0 and negative number is not included)
	for(var i = 0; i<testRatio.length; i++){
		if(testRatio[i] > 0){
			if(min == 0){ 
				min = testRatio[i]; 
				pivotElem = i;
			}
			else if(testRatio[i] < min){
				min = testRatio[i];
				pivotElem = i;
			}
		}  
	}

	// returns the row number for the pivot element
	return pivotElem;
}

function gaussJordan(matrix, pivotCol, pivotElem){

	var row = matrix.length;
	var col = matrix[row-1].length;
	var pivotValue = matrix[pivotElem][pivotCol];

	// performs the Gauss-Jordan elimination to normalize the pivot column by using the pivot element row
	for(var i = 0; i<matrix[pivotElem].length; i++){
		matrix[pivotElem][i] = matrix[pivotElem][i] / pivotValue;
	}

	for(var i = 0; i<row; i++){
		if(pivotElem != i){
			var multiplier = matrix[i][pivotCol];
			for(var j = 0; j<col; j++){
				matrix[i][j] = matrix[i][j] - (matrix[pivotElem][j] * multiplier);
			}
		}
	}

	iteration++;
	printMatrix(matrix);
	return matrix;
}

function basicSolution(matrix){

	var row = matrix.length;
	var col = matrix[0].length - 1;
	var count = 0;
	var value = 0;
	var i = 0;
	basicSol = [];
	console.log("ROW:" + row);
	console.log("COL:" + col);

	basicSol[0] = [];
	// traverses the whole matrix and checks if each column is active or not
	for( i = 0; i<col; i++){
		count = 0;
		var inactive = false;
		for(var j = 0; j<row; j++){
			if (matrix[j][i] == 1){ 
				count++; // counts the number of 1's found per the column
				value = matrix[j][col];
			} else if( matrix[j][i] != 0  ){ // if the value is not zero then it is inactive = 0
				inactive = true;
				break;
			}
		}

		console.log(value);
		if( count > 1 || inactive ) basicSol[0][i] = 0;  // if there are more than one 1's and inactive=TRUE then the value is 0
		else basicSol[0][i] = value;  // the column is active so it will copy the corresponding TOTAL in the matrix

	}
	basicSol[0][i] = matrix[row-1][col];;

	return basicSol;
}

/****************************************/
function printMatrix(matrix){

	var	basicSol = basicSolution(matrix);
	var slackNum = parseInt($("#numOfS").val());
	var xNum = parseInt($("#numOfVar").val());

	$("#output").append("<h6 class='black-text'><b> ITERATION " + iteration + "</b></h6>");
	output = $('<table></table>').attr({ class: "bordered centered black-text" });
	var rows = $('<tr></tr>').appendTo(output);
		for( var i = 0 ; i<xNum; i++ ){
		   $('<td></td>').text("X"+(i+1)).appendTo(rows);
		}
		for( var i = 0 ; i<slackNum; i++ ){
		   $('<td></td>').text("S"+(i+1)).appendTo(rows);
		}
        $('<td></td>').text("SOLUTION").appendTo(rows);

	var row = matrix.length;
	var col = matrix[row-1].length;
	for (var i = 0; i < row; i++) {
		var rows = $('<tr></tr>').appendTo(output);
		for (var j = 0; j < col; j++) {
			$('<td></td>').text(matrix[i][j].toFixed(2)).appendTo(rows); 
		} 
	}
	output.appendTo("#output");
	$("#output").append("<br/>");

	$("#output").append("<h6 class='black-text'><b> BASIC SOLUTION " + iteration + "</b></h6>");
	output = $('<table></table>').attr({ class: "bordered centered black-text" });
	var rows = $('<tr></tr>').appendTo(output);
		for( var i = 0 ; i<xNum; i++ ){
		   $('<td></td>').text("X"+(i+1)).appendTo(rows);
		}
		for( var i = 0 ; i<slackNum; i++ ){
		   $('<td></td>').text("S"+(i+1)).appendTo(rows);
		}
        $('<td></td>').text("Z").appendTo(rows);

	var row = basicSol.length;
	var col = basicSol[row-1].length;
	for (var i = 0; i < row; i++) {
		var rows = $('<tr></tr>').appendTo(output);
		for (var j = 0; j < col; j++) {
			$('<td></td>').text(basicSol[i][j].toFixed(2)).appendTo(rows); 
		} 
	}
	output.appendTo("#output");
	$("#output").append("<br/>");

}
/****************************************/