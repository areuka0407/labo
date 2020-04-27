class Cursor {

	static width = 35;
	static height= 35;

	/**
	 *
	 * @param {Object} viewer 해당 커서와 연결된 Viewer 객체
	 */ 
    constructor(viewer, angle, length){
		this.viewer = viewer;
		this.length = length;

		this.elem = document.createElement("div");
		this.elem.classList.add("cursor");
		this.id = this.elem.dataset.id = viewer.id;
				
		this.elem.addEventListener("dragenter", e => e.preventDefault());
		this.elem.addEventListener("dragstart", e => e.preventDefault());

		let styles;
        styles = {
        	width: Cursor.width + "px",
        	height: Cursor.height + "px",
        	position: "absolute",
        	top: `calc(50% - ${Cursor.height/2}px)`,
        	left: `calc(50% - ${Cursor.width/2}px)`,
			border: "2px solid #fff",
			borderRadius: "50%",
			boxSizing: "border-box",
			boxShadow: "-1px 2px 5px 1px rgba(0, 0, 0, 0.1)",
			cursor: "pointer",
			zIndex: "10000"
		};
		Style.setStyle(this.elem, styles);
		
		this.lineElem = document.createElement("div");
		this.lineElem.classList.add("line");
		this.lineElem.dataset.id = this.id;
		
		styles = {
			width: "0",
			height: "2px",
			position: "absolute",
			top: `50%`,
			left: "50%",
			backgroundColor: "#fff",
			pointEvents: "none"
		};
		Style.setStyle(this.lineElem, styles);

		this.setAngle(angle);
	}

	
	/**
	 * 해당 좌표에 커서를 옮기는 메소드
	 * @param {Number} x 현재 마우스의 X좌표
	 * @param {Number} y 현재 마우스의 Y좌표
	 */

	setCoord(x, y){
		this.elem.style.top = y - Cursor.height / 2 + "px";
		this.elem.style.left = x - Cursor.width / 2 + "px";
	}

	/**
	 * 해당 좌표까지의 선을 잇는 메소드
	 * @param {Number} angle 선을 이을 좌표와 중심축이 이루는 각도
	 * @param {Number} x 선을 이을 좌표의 X
	 * @param {Number} y 선을 이을 좌표의 Y
	 */
	setLineCoord(angle, x, y){
		const half = ColorPicker.width / 2;

		// 커서의 (지름 / 4) 값을 제외하기 위한 X,Y좌표
		let hx = Math.cos(angle + Math.PI) * half / 32;
		let hy = Math.sin(angle + Math.PI) * half / 32;

		let cx = x - half;
		let cy = y - half;
		angle *= -1;

		let width = Math.sqrt(cx * cx + cy * cy);
		width = width < 0 ? 0 : width;

		let styles = {
			top: y - cy / 2 - hy + "px",
			left: x - cx / 2 - width / 2 + hx + "px",
			width: width + "px",
			transform: "rotate("+ angle +"rad)",
		};
		
		Style.setStyle(this.lineElem, styles);
	}

	
    /**
     * 
     * @param {Number} x 각도를 구할 삼각형의 밑변의 길이
     * @param {Number} y 각도를 구할 삼각형의 대변의 길이
     */
    static getAngle(x, y){
        let angle = Math.atan2(y, x);
        return angle;
	}


	/**
	 * 
	 * @param {Number} angle 일반각을 구할 각도
	 */
	static parseGeneral(angle){
		while(angle <= 0) angle += Math.PI * 2;
		return angle % (Math.PI * 2);
	}

	/**
	 * 두 각 사이의 각도를 구한다.
	 * @param {Number} a 첫번째 각도
	 * @param {Number} b 두번째 각도
	 */
	static getTotalAngle(a, b){
		let totalAngle = Math.abs(a - b);
		if(totalAngle >= Math.PI) totalAngle = Math.PI * 2 - totalAngle;
		return totalAngle;
	}

	/**
	 * 라디안을 디그리로 바꾼다.
	 * @param {Number} n 디그리 값으로 바꿀 라디안 값
	 */
	static rad2deg(n){
		return n * 180 / Math.PI;
	}
	
	/**
	 * 해당 각도에 인스턴스 변수인 'length'만큼 떨어진 곳에 커서를 위치 시킨다.
	 * @param {Number} angle 커서를 놓을 각도(단위: Radian)
	 */
	setAngle(angle){
		this.angle = angle;
		const half = ColorPicker.width / 2;
		
		let x = Math.cos(angle) * this.length;
		let y = Math.sin(angle) * this.length;

		x += half;
		y = (-y + half);

		let mx = half * Math.cos(angle) + half;
		let my = Math.abs(half * Math.sin(angle) + half - ColorPicker.height);

		// 각 사분면에 따라서 검사
		if(x > half && y < half) {
			x = mx < x ? mx : x;
			y = my > y ? my : y;
		}
		else if(x < half && y < half){
			x = mx > x ? mx : x;
			y = my > y ? my : y;
		}
		else if(x < half && y > half){
			x = mx > x ? mx : x;
			y = my < y ? my : y;
		}
		else if(x > half && y > half){
			x = mx < x ? mx : x;
			y = my < y ? my : y;
		}

	
		x = x == ColorPicker.width ? ColorPicker.width - 1 : x;
		y = y == ColorPicker.width ? ColorPicker.width - 1 : y;

		let color = ColorPicker.canvas.getColorByCoord(x, y);
		this.setLineCoord(angle, x, y);
		this.setCoord(x, y);
		this.elem.style.backgroundColor = `rgb(${color.red},${color.green},${color.blue})`;
		this.viewer.setBackground(color.red, color.green, color.blue);
		this.viewer.setColor();
	}
}