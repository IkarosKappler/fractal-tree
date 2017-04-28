/**
 * A fractal tree drawing tool.
 *
 * Inspired by https://rosettacode.org/wiki/Fractal_tree
 *
 * @author  Ikaros Kappler
 * @date    2017-04-28
 * @version 1.0.0
 **/

function draw() {
    var elem = document.getElementById('canvas');
    var context = elem.getContext('2d');

    context.fillStyle = 'black';
    context.fillRect(0,0,800,800);

    function rgb(c) { return 'rgb('+c[0]+','+c[1]+','+c[2]+')'; }
  
    var startColor = [255,64,0];
    var endColor   = [0,128,255];
    
    context.strokeStyle = rgb(startColor); 
    context.lineWidth = 1;
    context.lineCap = 'round';

    var deg_to_rad = Math.PI / 180.0;
    var treeDepth = parseInt($('input#depth').val());          // 9
    var startAngle = parseFloat($('input#start_angle').val()); // -90;
    var leftBranchAngle = parseFloat($('input#left_branch_angle').val());   // 20;
    var rightBranchAngle = parseFloat($('input#right_branch_angle').val()); // 20;
    var leftLengthFactor = parseFloat($('input#left_length_factor').val()); // 1.0;
    var rightLengthFactor = parseFloat($('input#right_length_factor').val()); // 1.0;

    function drawLine(x1, y1, x2, y2, brightness) {
	context.beginPath();
	context.strokeStyle = rgb( [ startColor[0] + Math.round( (endColor[0]-startColor[0])*brightness ),
				     startColor[1] + Math.round( (endColor[1]-startColor[1])*brightness ),
				     startColor[2] + Math.round( (endColor[2]-startColor[2])*brightness ),
				   ] );
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.closePath();
	context.lineWidth = Math.round( (1.0-brightness)*(treeDepth) ); 
	//context.lineCap = 'round';
	context.stroke();
    }

    function drawTree(x1, y1, angle, lengthFactor, depth){
	if( depth > 0 ) {
	    var x2 = x1 + (Math.cos(angle * deg_to_rad) * 10.0 * Math.log((depth+1)*(depth+1))*0.9*lengthFactor );
	    var y2 = y1 + (Math.sin(angle * deg_to_rad) * 10.0 * Math.log((depth+1)*(depth+1))*0.9*lengthFactor );
	    drawLine(x1, y1, x2, y2, 1.0-(depth-1)/treeDepth);
	    drawTree(x2, y2, angle - leftBranchAngle,  lengthFactor*leftLengthFactor, depth-1);
	    drawTree(x2, y2, angle + rightBranchAngle, lengthFactor*rightLengthFactor, depth-1);
	}
    }

    console.log( 'startAngle=' + startAngle + ', treeDepth=' + treeDepth );
    drawTree(400, 450, startAngle, 1.0, treeDepth);


}

$( document ).ready( function() {
    $( 'input' ).change( draw );
    draw();
} );
