class Viewer {
    constructor(id, elem, options){
		this.id = id;
        this.elemBox = elem;
       	this.elemColor = this.elemBox.querySelector(options.viewColor);
       	this.elemHex = this.elemBox.querySelector(options.viewHex);
       	this.elemR = this.elemBox.querySelector(options.viewR);
       	this.elemG = this.elemBox.querySelector(options.viewG);
		this.elemB = this.elemBox.querySelector(options.viewB);
		this.brightness = this.elemBox.querySelector(options.brightness);  

		this.b_canvas = this.brightness.querySelector("canvas");
		this.b_canvas.width = Style.getStyleByInteger(this.brightness, "width");
		this.b_canvas.height = Style.getStyleByInteger(this.brightness, "height");
		this.b_ctx = this.b_canvas.getContext("2d");

		this.b_cursor = this.brightness.querySelector("div");
		this.b_cursor.classList.add("b_cursor");
		this.b_cursor.dataset.id = id;
		this.b_cursor.X = 0;
		this.b_cursor.addEventListener("dragstart", e => e.preventDefault());
		
		this.elemBox.addEventListener("mousedown", e => {
			if(e.target.nodeName === "INPUT") return;
			document.querySelectorAll(".cursor.active, .box.active").forEach(x => x.classList.remove("active"));
			this.elemBox.classList.add("active");
			document.querySelector(`.cursor[data-id='${this.id}']`).classList.add("active");
		});
	}
	
	setBackground(r, g, b){
		// Brightness
		this.b_ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
		this.b_ctx.clearRect(0, 0, this.b_canvas.width, this.b_canvas.height);
		this.b_ctx.fillRect(0, 0, this.b_canvas.width, this.b_canvas.height);

		let bright = this.b_ctx.createLinearGradient(0, 0, this.b_canvas.width, 0);
		bright.addColorStop(0, "rgba(0, 0, 0, 0)");
		bright.addColorStop(1, "rgba(0, 0, 0, 1)");

		this.b_ctx.fillStyle = bright;
		this.b_ctx.fillRect(0, 0, this.b_canvas.width, this.b_canvas.height);
	}

	setColor(){
		let color = this.b_ctx.getImageData(this.b_cursor.X, this.b_canvas.height / 2, 1, 1).data;

		this.elemR.value = color[0];
		this.elemG.value = color[1];
		this.elemB.value = color[2];
		this.elemHex.value = this.rgb2hex(color[0], color[1], color[2]);
		this.elemColor.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
	}

	rgb2hex(r, g, b){
		r = r.toString(16);
		g = g.toString(16);
		b = b.toString(16);

		if(r.length === 1) r = "0" + r;
		if(g.length === 1) g = "0" + g;
		if(b.length === 1) b = "0" + b;

		return (r+g+b).toUpperCase();
	}

}