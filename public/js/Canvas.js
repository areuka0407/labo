class Canvas {
    static width = 0;
    static height = 0;

    /**
     * 생성자 함수, Canvas를 생성하여 기본 값을 설정한다.
     * @param {Object} origin 기본 베이스가 될 문서 객체 태그
     */
    constructor(origin){
        this.elem = document.createElement("canvas");
        this.ctx = this.elem.getContext('2d'); 
        this.elem.width = ColorPicker.width;
        this.elem.height = ColorPicker.height;

        origin.append(this.elem);
    }

    /**
     * 초기화
     */
    init(){
        return new Promise(res => {
            let backgroundImage = new Image();
            backgroundImage.setAttribute("crossOrigin", "use-credentialS");
            backgroundImage.src = "./images/colorPickerBGI.png";
            backgroundImage.onload = () => {
                this.ctx.drawImage(backgroundImage, 0, 0, ColorPicker.width, ColorPicker.height);
                res();
            };
        });
    }

    getColorByCoord(x, y){
        let data = this.ctx.getImageData(x, y, 1, 1).data;
        return {red: data[0], green: data[1], blue: data[2], alpha: data[3]};
    }
}