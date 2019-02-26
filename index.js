var ctx = c.getContext("2d"), pTime = 0, mTime = 0, x = 0;
ctx.font = "20px sans-serif";

// update canvas with some information and animation
var fps = new FpsCtrl(12, function(e) {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillText("FPS: " + fps.frameRate() + 
                 " Frame: " + e.frame + 
                 " Time: " + (e.time - pTime).toFixed(1), 4, 30);
	pTime = e.time;
	var x = (pTime - mTime) * 0.1;
	if (x > c.width) mTime = pTime;
	ctx.fillRect(x, 50, 10, 10)
})

// start the loop
fps.start();

// UI
bState.onclick = function() {
	fps.isPlaying ? fps.pause() : fps.start();
};

sFPS.onchange = function() {
	fps.frameRate(+this.value)
};

function FpsCtrl(fps, callback) {

	var	delay = 1000 / fps,
		time = null,
		frame = -1,
		tref;

	function loop(timestamp) {
		if (time === null) time = timestamp;
		var seg = Math.floor((timestamp - time) / delay);
		if (seg > frame) {
			frame = seg;
			callback({
				time: timestamp,
				frame: frame
			})
		}
		tref = requestAnimationFrame(loop)
	}

	this.isPlaying = false;
	
	this.frameRate = function(newfps) {
		if (!arguments.length) return fps;
		fps = newfps;
		delay = 1000 / fps;
		frame = -1;
		time = null;
	};
	
	this.start = function() {
		if (!this.isPlaying) {
			this.isPlaying = true;
			tref = requestAnimationFrame(loop);
		}
	};
	
	this.pause = function() {
		if (this.isPlaying) {
			cancelAnimationFrame(tref);
			this.isPlaying = false;
			time = null;
			frame = -1;
		}
	};
}
