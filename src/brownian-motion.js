
console.log("hello world")

function BrownianMotion(count) {
	this.moleculars = new Array(count);
	for (var i = 0; i < count; i++) {
		this.moleculars[i] = new Molecular(0, 0);
	}

	this.update = function() {
		function clamp(v, min, max) {
			if (v < min) {
				return min;
			} else if (v > max) {
				return max;
			} else {
				return v;
			}
		}

		function random() {
			return (Math.random() - 0.5) * 2;
		}
		this.moleculars.forEach(element => {
			element.x += random();
			element.y += random();

			// var size = 100;
			// element.x = clamp(element.x, -size, size);
			// element.y = clamp(element.y, -size, size);
		});
	}

	this.render = function(imageData, dx, dy) {
		this.moleculars.forEach(element => {
			var x = Math.ceil(element.x + dx);
			var y = Math.ceil(element.y + dy);
			var i = 4 * (y * width + x);
			imageData.data[i+0] = 0xff;
			imageData.data[i+1] = 0xff;
			imageData.data[i+2] = 0xff;
			imageData.data[i+3] = 0xff;
		});
	}

	function Molecular(x, y) {
		this.x = x;
		this.y = y;
	}
}

var canvas = document.getElementById('canvas');
var width = canvas.width, height = canvas.height;
var context = canvas.getContext('2d');
var imageData = context.createImageData(width, height);
var brownianMotion = new BrownianMotion(1000);

function clear(imageData) {
	for (var i = 0; i < imageData.data.length; i += 4) {
		imageData.data[i+0] = 0;
		imageData.data[i+1] = 0;
		imageData.data[i+2] = 0;
		imageData.data[i+3] = 0xff;
	}
}

function update() {
	clear(imageData);
	brownianMotion.update();
	brownianMotion.render(imageData, width/2, height/2);
	context.putImageData(imageData, 0, 0);

	window.requestAnimationFrame(update);
}


update();
