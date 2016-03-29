var numCols = 5, numRows = 5;
var boardGrid = [] , gridX , gridY , stateCol;
var editOn = false , editFlash , togMatrix , step = 0 , solveTimer;

function initializeBoard(){
	
	boardInner = document.getElementById('innerBoard');
	boardInner.innerHTML = '';
	for(var i = 0; i < numRows; i++){
		var rows = [];
		for(var j = 0; j < numCols; j++){
			rows.push(0);
		}
		boardGrid.push(rows);
	}
	printState( boardGrid );

	for(var i = 0; i < numRows; i++){
		for(var j = 0; j < numCols; j++){
			var lightColor = 'lightOn';
			if( boardGrid[i][j] == 0 )
				var lightColor = 'lightOff';
			
			boardInner.innerHTML += '<div class = "lights ' + '" id = "grid' + i + ',' + j + '">' + '</div>';
		}
	}
	
	for( var i = 0; i < numRows; i++ ){
		for( var j = 0; j < numCols; j++ ){
			if( Math.floor(Math.random() * 2) == 1 ){
				updateBoard( j , i );
			}
		}
	}

}

function printState( someGrid ){
	for(var i = 0; i < someGrid.length; i++){			
		console.log( someGrid[i] );
	}
	console.log('');
}
	
function updateBoard( gridXIn , gridYIn ){
	
	if( gridXIn == 0 ){
		
		if( gridYIn == 0 ){							// top left corner
		
			boardGrid[1][0] = (boardGrid[1][0] + 1)&0x1;
			
		}else if( gridYIn == numRows - 1 ){			// leftmost column average case
			boardGrid[numRows-2][0] = (boardGrid[numRows-2][0] + 1)&0x1;					
		
		}else{										// bottom left corner
			boardGrid[gridYIn+1][0] = (boardGrid[gridYIn+1][0] + 1)&0x1;
			boardGrid[gridYIn-1][0] = (boardGrid[gridYIn-1][0] + 1)&0x1;	
			
		}		
		boardGrid[gridYIn][0] = (boardGrid[gridYIn][0] + 1)&0x1;
		boardGrid[gridYIn][1] = (boardGrid[gridYIn][1] + 1)&0x1;
		
	}else if( gridXIn == numCols - 1){
	
		if( gridYIn == 0 ){							// top of rightmost column
		
			boardGrid[1][gridXIn] = (boardGrid[1][gridXIn] + 1)&0x1;
			
		}else if( gridYIn == numRows - 1 ){			// 'middle' of leftmost column
		
			boardGrid[numRows-2][gridXIn] = (boardGrid[numRows-2][gridXIn] + 1)&0x1;			
			
		}else{										// bottom of average column
		
			boardGrid[gridYIn+1][gridXIn] = (boardGrid[gridYIn+1][gridXIn] + 1)&0x1;
			boardGrid[gridYIn-1][gridXIn] = (boardGrid[gridYIn-1][gridXIn] + 1)&0x1;
			
		}		
		boardGrid[gridYIn][gridXIn-1] = (boardGrid[gridYIn][gridXIn-1] + 1)&0x1;
		boardGrid[gridYIn][gridXIn] = (boardGrid[gridYIn][gridXIn] + 1)&0x1;
		
	}else{
		
		if( gridYIn == 0 ){							// top of average column
		
			boardGrid[1][gridXIn] = (boardGrid[1][gridXIn] + 1)&0x1;
			
		}else if( gridYIn == numRows - 1 ){			// 'middle' of column average case

			boardGrid[numRows-2][gridXIn] = (boardGrid[numRows-2][gridXIn] + 1)&0x1;			
			
		}else{										// bottom of average column

			boardGrid[gridYIn+1][gridXIn] = (boardGrid[gridYIn+1][gridXIn] + 1)&0x1;
			boardGrid[gridYIn-1][gridXIn] = (boardGrid[gridYIn-1][gridXIn] + 1)&0x1;
			
		}		
		boardGrid[gridYIn][gridXIn-1] = (boardGrid[gridYIn][gridXIn-1] + 1)&0x1;
		boardGrid[gridYIn][gridXIn] = (boardGrid[gridYIn][gridXIn] + 1)&0x1;
		boardGrid[gridYIn][gridXIn+1] = (boardGrid[gridYIn][gridXIn+1] + 1)&0x1;
		
	}
	printState( boardGrid );
	updateBoardStyles(  );
}

function updateBoardStyles(  ){
	for(var i = 0; i < numRows; i++){
		for(var j = 0; j < numCols; j++){
			
			var curGridPos = 'grid' + i + ',' + j;
			var checkLight = '';
			
			if( document.getElementById(curGridPos).classList.length > 1 ){
				checkLight = document.getElementById(curGridPos).classList[1];
		
				if( boardGrid[i][j] == 0 && checkLight == 'lightOn' ){
					document.getElementById(curGridPos).classList.remove('lightOn');
					document.getElementById(curGridPos).classList.add('lightOff');
					
				}else if( boardGrid[i][j] == 1 && checkLight == 'lightOff' ){
					document.getElementById(curGridPos).classList.remove('lightOff');
					document.getElementById(curGridPos).classList.add('lightOn');				
				}
			
			}else{
				if( boardGrid[i][j] == 0){
					document.getElementById(curGridPos).classList.add('lightOff');
					
				}else{
					document.getElementById(curGridPos).classList.add('lightOn');
				}
			}
		}
	}
}

function matrixToggle( gridXIn , gridYIn ){
		
	var newGrid = [] , gridVec = [];
	for(var i = 0; i < numRows; i++){
		var rows = [];
		for(var j = 0; j < numCols; j++){
			//rows.push( boardGrid[i][j] );
			rows.push( 0 );
		}
		newGrid.push( rows );
	}
	
	if( gridXIn == 0 ){
		
		if( gridYIn == 0 ){							// top left corner
		
			newGrid[1][0] = (newGrid[1][0] + 1)&0x1;
			
		}else if( gridYIn == numRows - 1 ){			// leftmost column average case
			newGrid[numRows-2][0] = (newGrid[numRows-2][0] + 1)&0x1;					
		
		}else{										// bottom left corner
			newGrid[gridYIn+1][0] = (newGrid[gridYIn+1][0] + 1)&0x1;
			newGrid[gridYIn-1][0] = (newGrid[gridYIn-1][0] + 1)&0x1;	
			
		}		
		newGrid[gridYIn][0] = (newGrid[gridYIn][0] + 1)&0x1;
		newGrid[gridYIn][1] = (newGrid[gridYIn][1] + 1)&0x1;
		
	}else if( gridXIn == numCols - 1){
	
		if( gridYIn == 0 ){							// top of rightmost column
		
			newGrid[1][gridXIn] = (newGrid[1][gridXIn] + 1)&0x1;
			
		}else if( gridYIn == numRows - 1 ){			// 'middle' of leftmost column
		
			newGrid[numRows-2][gridXIn] = (newGrid[numRows-2][gridXIn] + 1)&0x1;			
			
		}else{										// bottom of average column
		
			newGrid[gridYIn+1][gridXIn] = (newGrid[gridYIn+1][gridXIn] + 1)&0x1;
			newGrid[gridYIn-1][gridXIn] = (newGrid[gridYIn-1][gridXIn] + 1)&0x1;
			
		}		
		newGrid[gridYIn][gridXIn-1] = (newGrid[gridYIn][gridXIn-1] + 1)&0x1;
		newGrid[gridYIn][gridXIn] = (newGrid[gridYIn][gridXIn] + 1)&0x1;
		
	}else{
		
		if( gridYIn == 0 ){							// top of average column
		
			newGrid[1][gridXIn] = (newGrid[1][gridXIn] + 1)&0x1;
			
		}else if( gridYIn == numRows - 1 ){			// 'middle' of column average case

			newGrid[numRows-2][gridXIn] = (newGrid[numRows-2][gridXIn] + 1)&0x1;			
			
		}else{										// bottom of average column

			newGrid[gridYIn+1][gridXIn] = (newGrid[gridYIn+1][gridXIn] + 1)&0x1;
			newGrid[gridYIn-1][gridXIn] = (newGrid[gridYIn-1][gridXIn] + 1)&0x1;
			
		}		
		newGrid[gridYIn][gridXIn-1] = (newGrid[gridYIn][gridXIn-1] + 1)&0x1;
		newGrid[gridYIn][gridXIn] = (newGrid[gridYIn][gridXIn] + 1)&0x1;
		newGrid[gridYIn][gridXIn+1] = (newGrid[gridYIn][gridXIn+1] + 1)&0x1;
		
	}
	
	for(var i = 0; i < numRows; i++){
		for(var j = 0; j < numCols; j++){
			gridVec.push( newGrid[i][j] );
		}
	}
	return gridVec;
}

function rowOperations( someGrid ){
	var h = someGrid.length;
	var w = someGrid[0].length;
	var k = 0;
	
	for( var i = 0; i < h; i++ ){
		var ii;
		if( someGrid[i][k] != 1 ){
			// interchange
			
			for( ii = i; ii < h; ii++){
				if( someGrid[ii][k] == 1 )
					break;
			}
			
			if( ii != h ){
				var temp = someGrid[i];
				someGrid[i] = someGrid[ii];
				someGrid[ii] = temp;
			}
			//console.log('rows exchanged');
			//printState( someGrid );
		}
		for( ii = 0; ii < h; ii++){
			if( someGrid[ii][k] == 1 && ii != i ){		    // add to row with same leads
				for( var j = 0; j < w; j++ ){				
					someGrid[ii][j] = ( someGrid[ii][j] ^ someGrid[i][j]  );
				}
			}
		}
		
		//printState( someGrid );
		k++;
		//console.log('k Now:' + k );
	}
}

function rref( someGrid ){					// GF 2
	var h = someGrid.length;
	var w = someGrid[0].length;
	/*var iden = [] , cntSame = 0;
	for( var i = 0; i < h; i++ ){
		var rows = [];
		for( var j = 0; j < h; j++ ){
			if( i != j )
				rows.push( 0 );
			else
				rows.push(1);
		}
		iden.push(rows);
	}*/
	rowOperations( someGrid );
}

$( document ).ready(function() {
	initializeBoard();
	updateBoardStyles();
	$( ".lights" ).click(function(e){
		
		if( e.pageX != 0 || e.pageY != 0){
			var mouseX = e.pageX - $('#lightsOutBoard').offset().left - 10;
			var mouseY = e.pageY - $('#lightsOutBoard').offset().top - 10;
			
			gridX = Math.floor( mouseX / 80 );
			gridY = Math.floor( mouseY / 80 );
		}
		
		if( editOn ){				
			boardGrid[gridY][gridX] = (boardGrid[gridY][gridX] + 1)&0x1;
			updateBoardStyles();			
		}else{
			updateBoard( gridX , gridY );
		}
		
	});
	
	$( "#editLightsOut" ).click(function() {
		editOn = !editOn;
		var togOn = false;
		console.log(editOn);
		
		if( editOn ){
			editFlash = setInterval(function(){ 
				if( togOn ){
					$('.lights').css('transform','scale(.88)');
				}else{
					$('.lights').css('transform','scale(1)');
				}
				togOn = !togOn;
				
			}, 800);
		}else{
			$('.lights').css('transform','scale(1)');
			clearInterval( editFlash );
		}
	});
	
	$( "#solveLightsOut" ).click(function() {
		var stateCol = [];
		togMatrix = [];
		var rowIdx = 0 , columnIdx = 0;
		
		for(var i = 0; i < numRows*numCols; i++){
			var rows = [];
			for(var j = 0; j < numCols*numRows + 1; j++){
				rows.push(0);
			}
			togMatrix.push( rows );
		}
		
		for(var i = 0; i < numRows; i++){
			for(var j = 0; j < numCols; j++){
				stateCol.push( boardGrid[i][j] );
				var togState = matrixToggle( j , i );
				
				for( var k = 0; k < numRows*numCols; k++){
					togMatrix[rowIdx][columnIdx] = togState[ k ];
					rowIdx++;
				}
				if( rowIdx == numCols*numRows ){
					columnIdx++;
					rowIdx = 0;
				}
			}
		}
		for( var k = 0; k < numRows*numCols; k++){
			togMatrix[rowIdx][columnIdx] = stateCol[ k ];
			rowIdx++;
		}
		printState( togMatrix );
		rref( togMatrix );
		printState( togMatrix );
		step = 0;
		
		solveTimer = setInterval(function(){ 
			
			stepSolve();
			
		}, 800); 

	});
	
});

function stepSolve(){
	if(step == numCols*numRows){
				
		//$('#innerBoard').css('display','none');	
		//$('#lightsOutBoard').css('background','rgb(249, 249, 48)');
		$('#winScreen').css('display','block');
		
		clearInterval(solveTimer);
	
	}else{
		if( togMatrix[step][25] == 1){
			var i = Math.floor( step / 5 );
			var j = step % 5;
			
			gridY = i;
			gridX = j;
			document.getElementById('grid'+i+','+j).click();
			step++;
		
		}else{
			step++;
			stepSolve();
		}
	}
}

