class ColorPicker {
    static width = 0;
    static height = 0;
    static REQUIRE_LIST = ["picker", "viewerBox", "viewColor", "viewHex", "viewR", "viewG", "viewB", "brightness", "option"];
    static FREE = 0;
    static HARMONY = 1;
    static origin;
    static canvas;

    /**
     * 생성자 함수, ColorPicker를 만들기 위한 필수 요소들을 설정한다.
     * @param {Object} options 각각의 CSS Selector를 설정해논 객체(picker, viewerBox, viewColor, viewHex, viewR, viewG, viewB, brightness)
     */
    constructor(options){
        this.checkRequireOption(options);


        this.optionTab = document.querySelector(options.option);    // 색상 선택 탭
        this.contentsBox = document.querySelector(".contents")      // 색상 선택기, 데이터 입력창이 포함된 콘텐츠 상자
        this.keyseach = new Keysearch("#tag-box .input");           // 연관 검색창
        this.colorForm = document.querySelector("#color-form");     // 데이터 입력창


        // 색상 선택기
        ColorPicker.origin = document.querySelector(options.picker);
        ColorPicker.origin.style.zIndex = 1000;

        this.output = document.createElement("input");
        this.output.hidden = true;
        this.output.type = "color";
        this.output.value = "#ffffff";
        ColorPicker.origin.append(this.output);

        ColorPicker.width = Style.getStyleByInteger(ColorPicker.origin, "width");
        ColorPicker.height = Style.getStyleByInteger(ColorPicker.origin, "height");

        ColorPicker.canvas = new Canvas(ColorPicker.origin);
        ColorPicker.canvas.init().then(() => {
            this.cursorList = [];
            this.viewerList = [];
            document.querySelectorAll(options.viewerBox).forEach((x, i) => {
                let viewer = new Viewer(i, x, options);
                let cursor = new Cursor(viewer, Math.PI / 4 - Math.PI / 180 * 10 * i, ColorPicker.width / 2 + ( i % 2 === 1 ? -50 : 0 ));
                this.viewerList.push(viewer);
                this.cursorList.push(cursor);
                ColorPicker.origin.append(cursor.elem);
                ColorPicker.origin.append(cursor.lineElem);
            }); 

            this.active = 0;
            this.viewerList[this.active].elemBox.classList.add("active");
            this.cursorList[this.active].elem.classList.add("active");
        });

        this.eventTrigger();
    }

    eventTrigger(){
        //Login Events
        window.addEventListener("login", () => this.contentsBox.append(this.colorForm));
        window.addEventListener("logout", () => this.colorForm.remove())


        // Window Mouse Events
        this.mouseDown = false;
        this.downTarget = null;
        window.addEventListener("mousedown", e => {
            if(e.which === 1) {
                this.mouseDown = true;
                this.downTarget = e.target;
                if(!this.downTarget.classList.contains("cursor") && !this.downTarget.classList.contains("box") && !this.downTarget.nodeName === "INPUT")
                    document.querySelectorAll(".cursor.active, .box.active").forEach(x => x.classList.remove("active"));
            }
        });
        window.addEventListener("mouseup", e => {
            if(e.which === 1) {
                this.mouseDown = false;
                this.downTarget = null;
            }
        });
        window.addEventListener("mousemove", e => {
            if(e.which !== 1){
                this.mouseDown = false;
                this.downTarget = null;
            }

            // 마우스 좌클릭 상태로 움직일 때
            if(this.mouseDown){
                let targetId = this.downTarget.dataset.id;
                if(this.downTarget.classList.contains("cursor") && targetId){
                    let center = this.cursorList[parseInt(this.cursorList.length / 2)];
                    const centerLength = center.length; 
                    const centerAngle = center.angle;
                    const selectCursor = this.cursorList[targetId];
                    const half = ColorPicker.width / 2;
                    
                    this.active = parseInt(targetId);
                    document.querySelectorAll(".box.active, .cursor.active").forEach(x => x.classList.remove("active"));
                    this.viewerList[this.active].elemBox.classList.add("active");
                    this.cursorList[this.active].elem.classList.add("active");

                    /* 선택한 커서의 위치를 바꿈 */
                    let x = e.clientX - ColorPicker.origin.offsetLeft - half;
                    let y = ColorPicker.origin.offsetTop + half - e.clientY;
                    let angle = Cursor.getAngle(x, y);
                    if(angle < 0) angle += Math.PI * 2;
                    let length = Math.sqrt(x * x + y * y);
                    selectCursor.length = length >= half ? half : length;      
                    selectCursor.setAngle(angle);


                    /* 선택한 커서에 따라 다른 커서들이 어떻게 위치할 것인지를 결정 */
                    // 0 < > 4  |  1  < >  3  끼리 마주보게 될 것임.
                    if(this.optionTab.querySelector("[value='1']").checked){
                        let totalAngle = ((angle - centerAngle > Math.PI || centerAngle - angle > Math.PI ? angle + Math.PI * 2 : angle) - centerAngle);

                        if(targetId == 0){
                            this.cursorList[4].setAngle(centerAngle + centerAngle - angle);
                            this.cursorList[1].setAngle(centerAngle + totalAngle / 2);
                            this.cursorList[3].setAngle(centerAngle - totalAngle / 2);
                        }
                        else if(targetId == 1){
                            this.cursorList[3].setAngle(centerAngle + centerAngle - angle);
                            this.cursorList[0].setAngle(centerAngle + totalAngle * 2);
                            this.cursorList[4].setAngle(centerAngle - totalAngle * 2);
                        }
                        else if(targetId == 2){
                            let unit = selectCursor.length - centerLength;

                            this.cursorList[0].length += this.cursorList[0].length + unit >= half || this.cursorList[0].length + unit <= 0 ? 0 : unit;
                            this.cursorList[1].length += this.cursorList[1].length + unit >= half || this.cursorList[1].length + unit <= 0 ? 0 : unit;
                            this.cursorList[3].length += this.cursorList[3].length + unit >= half || this.cursorList[3].length + unit <= 0 ? 0 : unit;
                            this.cursorList[4].length += this.cursorList[4].length + unit >= half || this.cursorList[4].length + unit <= 0 ? 0 : unit;

                            this.cursorList[0].setAngle(this.cursorList[0].angle + angle - centerAngle);
                            this.cursorList[1].setAngle(this.cursorList[1].angle + angle - centerAngle);
                            this.cursorList[3].setAngle(this.cursorList[3].angle + angle - centerAngle);
                            this.cursorList[4].setAngle(this.cursorList[4].angle + angle - centerAngle);

                        }
                        else if(targetId == 3){
                            this.cursorList[1].setAngle(centerAngle + centerAngle - angle);
                            this.cursorList[0].setAngle(centerAngle - totalAngle * 2);
                            this.cursorList[4].setAngle(centerAngle + totalAngle * 2);
                        }
                        else if(targetId == 4){
                            this.cursorList[0].setAngle(centerAngle + centerAngle - angle);
                            this.cursorList[1].setAngle(centerAngle - totalAngle / 2);
                            this.cursorList[3].setAngle(centerAngle + totalAngle / 2);
                        }
                    }
                }
                else if(this.downTarget.classList.contains("b_cursor")){
                    let parent = this.downTarget.parentElement;
                    let x = e.clientX - parent.offsetLeft;
                    x = x < 0 ? 0 : x > Style.getStyleByInteger(parent, "width") - Style.getStyleByInteger(this.downTarget, "width") ? Style.getStyleByInteger(parent, "width") - Style.getStyleByInteger(this.downTarget, "width") : x;
                    this.downTarget.style.left = x + "px";
                    this.viewerList[this.downTarget.dataset.id].b_cursor.X = x;
                    this.viewerList[this.downTarget.dataset.id].setColor();
                }
            }
        });
    }

    /**
     * 객체의 필수 요소가 빠져 있지 않은지 검사한다
     * @param {Object} options 객체의 CSS Selector 옵션
     */
    checkRequireOption(options){
        let keyList = Object.keys(options);
        let checkRequire = ColorPicker.REQUIRE_LIST.reduce((p, c) => p && (keyList.indexOf(c) >= 0), true);
        if(!checkRequire) throw Error(`필수 설정 항목이 포함되어 있지 않습니다.\n필수 지정 항목: ${ColorPicker.REQUIRE_LIST.join(", ")}`);
    }
}