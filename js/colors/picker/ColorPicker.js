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
        
        this.userdata = null;
        new Promise( res => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/users/session");
            xhr.send();
            xhr.onload = () => res(JSON.parse(xhr.responseText));
            xhr.onerror = () => Alert.on("로그인 정보를 불러오지 못했어요….", Alert.error);
        }).then( data => {
            this.userdata = data;    

            this.optionTab = document.querySelector(options.option);    // 색상 선택 탭
            this.contentsBox = document.querySelector("#main")      // 색상 선택기, 데이터 입력창이 포함된 콘텐츠 상자
            this.colorForm = document.querySelector("#color-form");     // 데이터 입력창        
            this.groupSelect = this.colorForm.querySelector("#myGroups");
            this.saveHelp = this.colorForm.querySelector(".save-help");
            this.guestHelp = document.querySelector(".guest-help");
            
            this.tags = new Tags(this.colorForm.querySelector("#tag-box"));
            this.keysearch = new Keysearch(this.colorForm.querySelector("#tag-box .input"), Keysearch.withoutPrefix); // 연관 검색창

            if(this.userdata){
                this.guestHelp.remove();
                this.contentsBox.append(this.saveHelp);

                this.tags.unlock();
                this.groupSelect.disabled = false;
                this.groupSelect.innerHTML = "";
                this.getColorGroups().then( groups => {
                    groups.forEach(group => {
                        let elem = document.createElement("option");
                        elem.value = group.id;
                        elem.innerText = group.name
                        
                        this.groupSelect.append(elem);
                    });
                });
            }
            else {
                this.saveHelp.remove();
                this.contentsBox.append(this.guestHelp);

                this.tags.lock();
                this.groupSelect.disabled = true;
                this.groupSelect.innerHTML = "";
            }

            this.saveHelp.classList.remove("hidden");
            this.guestHelp.classList.remove("hidden");
            this.eventTrigger();
        });
        


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
    }

    eventTrigger(){
        //Login Events
        window.addEventListener("login", () => {
            this.guestHelp.remove();
            this.contentsBox.append(this.saveHelp);

            this.tags.unlock();
            this.groupSelect.disabled = false;
            this.groupSelect.innerHTML = "";
            this.getColorGroups().then( groups => {
                groups.forEach(group => {
                    let elem = document.createElement("option");
                    elem.value = group.id;
                    elem.innerText = group.name
                    
                    this.groupSelect.append(elem);
                });
            });
        });
        window.addEventListener("logout", () => {
            this.saveHelp.remove();
            this.contentsBox.append(this.guestHelp);

            this.tags.lock();
            this.groupSelect.disabled = true;
            this.groupSelect.innerHTML = "";
        });


        // 로그인하기 버튼을 누르면 로그인 탭 등장
        this.guestHelp.querySelector(".login-span").addEventListener("click", () => {
            window.dispatchEvent(Login.open);
        });


        // 팔레트가 변경되면 그에 맞게 기본값 배치
        this.optionTab.querySelectorAll("input[type='radio']").forEach(x => {
            x.addEventListener("change", () => this.init());
        });

        // 그룹 추가 버튼을 누르면 탭 등장
        document.querySelector("#group-box > button").addEventListener("click", () => {
            let callback = name => {
                let form = new FormData();
                form.append("groupname", name);

                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/api/groups");
                xhr.send(form);
                
                xhr.onload = () => {
                    let result = JSON.parse(xhr.responseText);
                    if(result === "colorgroup not add") return Alert.on("<h3>이미 존재하는 그룹이 있어요!</h3><br>현재 존재하는 그룹과 중복되지 않는 이름으로 정해주세요", Alert.error);
                    else {
                        Alert.on("<h3>새로운 그룹이 추가되었어요!</h3>");

                        let option = document.createElement("option");
                        option.value = result.id;
                        option.innerText = result.name;
                        document.querySelector("#myGroups").append(option);
                    }
                };
            };

            Alert.prompt("새 그룹의 이름을 정해주세요!", callback, "이걸로 할래요!", "조금만 시간을 주세요…!");
        });


        // Window Mouse Events
        this.mouseDown = false;
        this.downTarget = null;
        window.addEventListener("mousedown", e => {
            if(e.which === 1) {
                this.mouseDown = true;
                this.downTarget = e.target;
                if(!this.downTarget.classList.contains("cursor") && !this.downTarget.classList.contains("box") && !this.downTarget.nodeName === "INPUT")
                    document.querySelectorAll(".cursor.active, .box.active").forEach(x => x.classList.remove("active"));
                else if(this.downTarget.parentElement.classList.contains("brightness")){
                    let parent = this.downTarget.parentElement;
                    let target = parent.querySelector(".b_cursor");
                    let x = e.clientX - parent.offsetLeft;
                    x = x < 0 ? 0 : x > Style.getStyleByInteger(parent, "width") ? Style.getStyleByInteger(parent, "width") : x;
                    target.style.left = x - Style.getStyleByInteger(target, "width") / 2 + "px";
                    this.viewerList[target.dataset.id].b_cursor.X = x;
                    this.viewerList[target.dataset.id].setColor();

                    this.downTarget = target;
                }
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
                    if(this.optionTab.querySelector("#p-similar").checked){
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
                    else if(this.optionTab.querySelector("#p-simple").checked) {
                        this.cursorList.filter((x, i) => i != targetId).forEach(x => {
                            x.setAngle(angle);
                        });
                    }
                    else if(this.optionTab.querySelector("#p-complete").checked){
                        if(targetId == 0){
                            this.cursorList[1].setAngle(angle);
                            this.cursorList[2].setAngle(angle - Math.PI);
                            this.cursorList[3].setAngle(angle - Math.PI);
                            this.cursorList[4].setAngle(angle - Math.PI);
                        }
                        else if(targetId == 1){
                            this.cursorList[0].setAngle(angle);
                            this.cursorList[2].setAngle(angle - Math.PI);
                            this.cursorList[3].setAngle(angle - Math.PI);
                            this.cursorList[4].setAngle(angle - Math.PI);
                        }
                        else if(targetId == 2){
                            this.cursorList[0].setAngle(angle - Math.PI);
                            this.cursorList[1].setAngle(angle - Math.PI);
                            this.cursorList[3].setAngle(angle);
                            this.cursorList[4].setAngle(angle);
                        }
                        else if(targetId == 3){
                            this.cursorList[0].setAngle(angle - Math.PI);
                            this.cursorList[1].setAngle(angle - Math.PI);
                            this.cursorList[2].setAngle(angle);
                            this.cursorList[4].setAngle(angle);
                        }
                        else if(targetId == 4){
                            this.cursorList[0].setAngle(angle - Math.PI);
                            this.cursorList[1].setAngle(angle - Math.PI);
                            this.cursorList[2].setAngle(angle);
                            this.cursorList[3].setAngle(angle);
                        }
                    }
                    else if(this.optionTab.querySelector("#p-little").checked){
                        if(targetId == 1 || targetId == 2){
                            this.cursorList.forEach((x, i) => {
                                if( i === 0 ) x.setAngle(angle + Math.PI * 9 / 10);
                                else if ( i === 3 || i === 4 ) x.setAngle(angle + Math.PI * 11 / 10);
                                else x.setAngle(angle);
                            });
                        }
                        else if(targetId == 0){
                            this.cursorList.forEach((x, i) => {
                                if( i != 0 ){
                                    if( i == 3 || i == 4 ) x.setAngle(angle + Math.PI / 5);
                                    else x.setAngle(angle + Math.PI * 11 / 10);
                                }
                            });
                        }
                        else {
                            this.cursorList.forEach((x, i) => {
                                if( i == 3 || i == 4 ) x.setAngle(angle);
                                else if( i == 0 ) x.setAngle(angle + Math.PI * 18 / 10);
                                else x.setAngle(angle + Math.PI * 9 / 10);
                            });
                        }
                    }
                    else if(this.optionTab.querySelector("#p-trio").checked){
                        if(targetId == 1 || targetId == 2){
                            this.cursorList.forEach((x, i) => {
                                if( i === 0 ) x.setAngle(angle + Math.PI * 2 / 3);
                                else if ( i === 3 || i === 4 ) x.setAngle(angle + Math.PI * 4 / 3);
                                else x.setAngle(angle);
                            });
                        }
                        else if(targetId == 0){
                            this.cursorList.forEach((x, i) => {
                                if( i != 0 ){
                                    if( i == 3 || i == 4 ) x.setAngle(angle + Math.PI * 2 / 3);
                                    else x.setAngle(angle + Math.PI * 4 / 3);
                                }
                            });
                        }
                        else {
                            this.cursorList.forEach((x, i) => {
                                if( i == 3 || i == 4 ) x.setAngle(angle);
                                else if( i == 0 ) x.setAngle(angle + Math.PI * 4 / 3);
                                else x.setAngle(angle + Math.PI * 2 / 3);
                            });
                        }
                    }
                }
                else if(this.downTarget.classList.contains("b_cursor")){
                    let parent = this.downTarget.parentElement;

                    let width = {
                        target: Style.getStyleByInteger(this.downTarget, "width"),
                        parent: Style.getStyleByInteger(parent, "width")
                    }
                    

                    let x = e.clientX - parent.offsetLeft - width.target / 2;
                    x = x < 0 ? 0 / 2 : x > width.parent ? width.parent : x;
                    this.downTarget.style.left = x - width.target / 2 + "px";
                    this.viewerList[this.downTarget.dataset.id].b_cursor.X = x;
                    this.viewerList[this.downTarget.dataset.id].setColor();
                }
            }
        });
    }

    init(){
        const half = ColorPicker.width / 2;

        if(this.optionTab.querySelector("#p-simple").checked){
            this.cursorList.forEach((x, i) => {
                x.length = half * (i + 1) / 5;
                x.setAngle(0);
            });
        }
        else if(this.optionTab.querySelector("#p-complete").checked){
            this.cursorList.forEach((x, i) => {
                if(i === 0){
                    x.length = half * 4 / 5;
                    x.setAngle(Math.PI);
                }
                else if(i === 1){
                    x.length = half;
                    x.setAngle(Math.PI);
                }
                else {
                    x.length = half * (i + 1) / 5;
                    x.setAngle(0);
                }
            });
        }
        else if(this.optionTab.querySelector("#p-little").checked){
            this.cursorList[0].length = half;
            this.cursorList[0].setAngle(Math.PI * 9 / 10);
            this.cursorList[1].length = half * 3 / 5;
            this.cursorList[1].setAngle(0);
            this.cursorList[2].length = half;
            this.cursorList[2].setAngle(0);
            this.cursorList[3].length = half * 3 / 5;
            this.cursorList[3].setAngle(Math.PI * 11 / 10);
            this.cursorList[4].length = half;
            this.cursorList[4].setAngle(Math.PI * 11 / 10);
        }
        else if(this.optionTab.querySelector("#p-trio").checked){
            this.cursorList[0].length = half;
            this.cursorList[0].setAngle(Math.PI * 2 / 3);
            this.cursorList[1].length = half * 3 / 5;
            this.cursorList[1].setAngle(0);
            this.cursorList[2].length = half;
            this.cursorList[2].setAngle(0);
            this.cursorList[3].length = half * 3 / 5;
            this.cursorList[3].setAngle(Math.PI * 4 / 3);
            this.cursorList[4].length = half;
            this.cursorList[4].setAngle(Math.PI * 4 / 3);
        }
        else {
            this.cursorList.forEach((x, i) => {
                x.length = ColorPicker.width / 2 + ( i % 2 === 1 ? -50 : 0 );
                x.setAngle(Math.PI / 4 - Math.PI / 180 * 10 * i);
            });
        }
        
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


    getColorGroups(){
        return new Promise( allResolve => {
            new Promise( res =>{
                let xhr = new XMLHttpRequest();
                xhr.open("POST", `/users/session`);
                xhr.send();
                xhr.onload = () => res(JSON.parse(xhr.responseText));
            }).then( data => {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", `/api/users/${data.user_id}/groups`);
                xhr.send();
                xhr.onload = () => allResolve(JSON.parse(xhr.responseText));
            });
        });
    }
}