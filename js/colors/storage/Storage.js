class Storage {
    constructor(){
        this.colorList = [];
        this.owner_id = location.pathname.split("/").pop();
        this.wrap = document.querySelector("#wrap");
        this.userdata = null;

        this.profileInfo = document.querySelector("#user-profile .info");
        this.toolBox = document.querySelector("#user-profile .tool-info");
    
        
        this.loading();
        this.eventTrigger();
    }

    eventTrigger(){
        const addGroupBtn = document.querySelector("#user-profile .group-add");
        addGroupBtn.addEventListener("click", () => {
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

                        let group = result;
                        group.elem = this.template(group);
                        group.elemBtns = group.elem.querySelector(".button-group");
                        group.elemHead = group.elem.querySelector(".section-head");

                        this.colorList.push(group);
                        this.wrap.append(group.elem);
                    }
                };
            };

            Alert.prompt("새 그룹의 이름을 정해주세요!", callback, "이걸로 할래요!", "조금만 시간을 주세요…!");
        });

        const optionBtn = document.querySelector("#user-profile .option-btn");
        optionBtn.addEventListener("click", () => location.assign("/option"));


        window.addEventListener("login", () => {
            this.updateLogin();
        });

        window.addEventListener("logout", () => {
            this.updateLogin();
        });
    }

    async loading(){
        this.colorList = await this.loadGroupData();
        for(let group of this.colorList){
            await this.loadColorData(group);
            group.elem = this.template(group);
            group.elemBtns = group.elem.querySelector(".button-group");
            group.elemIdxs = group.elem.querySelector(".index-group");
            group.elemHead = group.elem.querySelector(".section-head");
            group.elemNoItem = group.elem.querySelector(".no-item");
            this.wrap.append(group.elem);
        }
        this.updateLogin();
    }
    loadGroupData(){
        return new Promise( res => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/users/"+ this.owner_id +"/groups");
            xhr.send();
            xhr.onload = () => res(JSON.parse(xhr.responseText));
        })
    }
    loadColorData(group){
        return new Promise(res => {
            if(!group) return res();

            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/groups/"+group.id+"/colors");
            xhr.send();
            xhr.onload = () => {
                let colors = JSON.parse(xhr.responseText);;
                colors = colors.map(data => {
                    data.tags = data.tag !== "" ? data.tag.split(" ") : [];
                    return data;
                });
                group.data = colors;
                res();
            }
        });
    }

    createElement(html){
        let parent = document.createElement("div");
        parent.innerHTML = html;
        return parent.firstChild;
    }

    template(group){
        group.data = !group.data ? [] : group.data;
        /* 템플릿에 맞추어서 그룹 요소를 생성한다 */
        let template = `<section>
                            <div class="section-head">
                                <a href="/colors/storage/${this.owner_id}/groups/${group.id}" class="name">${group.name}</a>
                                <div class="button-group hidden">
                                    <button class="group-edit ml-2">
                                        <svg class="gUZ B9u U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M13.386 6.018l4.596 4.596L7.097 21.499 1 22.999l1.501-6.096L13.386 6.018zm8.662-4.066a3.248 3.248 0 0 1 0 4.596L19.75 8.848 15.154 4.25l2.298-2.299a3.248 3.248 0 0 1 4.596 0z"></path></svg>
                                    </button>
                                    <button class="group-remove ml-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eraser" class="svg-inline--fa fa-eraser fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"/></svg>
                                    </button>
                                </div>
                                <div class="index-group hidden">
                                    <button class="index-up mr-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-down" class="svg-inline--fa fa-sort-down fa-w-10" role="img" viewBox="0 0 320 512"><path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"/></svg>
                                    </button>
                                    <button class="index-down mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-down" class="svg-inline--fa fa-sort-down fa-w-10" role="img" viewBox="0 0 320 512"><path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"/></svg>
                                    </button>
                                </div>
                            </div>
                            <article>`;
        group.data.slice(0, 5).forEach(color => {
            template += `<div class="item">
                            <div class="colors">
                                <div class="line" style="background-color: #${color.hex1}">#${color.hex1}</div>
                                <div class="line" style="background-color: #${color.hex2}">#${color.hex2}</div>
                                <div class="line" style="background-color: #${color.hex3}">#${color.hex3}</div>
                                <div class="line" style="background-color: #${color.hex4}">#${color.hex4}</div>
                                <div class="line" style="background-color: #${color.hex5}">#${color.hex5}</div>
                            </div>
                            <div class="tags">`;
            color.tags.forEach(tag => {
                template += `<span class="tag">${tag}</span>`;
            });
            if(color.tags.length === 0) 
                template += `<p class="text-center">추가된 태그가 없습니다.</p>`
            
            template += `</div>
                            <div class="info">
                                <span class="date">${this.koreanDate(color.day)}</span>
                                <span class="good">
                                    <svg viewBox="0 0 24 24" data-id="${color.id}"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                                    <span class="good-count ml-1">${color.good}</span>
                                </span>
                            </div>
                        </div>`;
        }); 
        if(group.data.length >= 5)
            template += `<div class="hidden-bar">
                            <svg class="gUZ B9u U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M22 10h-8V2a2 2 0 0 0-4 0v8H2a2 2 0 0 0 0 4h8v8a2 2 0 0 0 4 0v-8h8a2 2 0 0 0 0-4"></path></svg>
                        </div>`;

        else if(group.data.length === 0)
            template += `<div class="no-item">
                            <p>
                                이런! 그룹에 등록된 색상이 없네요….<br>
                                <a href="/colors/picker">당장 등록하러 가볼까요?</a>
                            </p>
                        </div>`;
        template += `</article>
                </section>`;
        let elem = this.createElement(template);;
        

        /* 생성된 요소에 이벤트를 건다 */


        // 위치 바꾸기
        elem.querySelector(".index-up").addEventListener("click", e => {
            let current = this.colorList.findIndex(x => x === group);
            let target = current - 1;
            if(target < 0) return;

            let xhr = new XMLHttpRequest();
            xhr.open("PUT", `/api/groups/${group.id}/up`);
            xhr.send();
            xhr.onload = () => {
                this.swap(target, current);
            }
        });

        elem.querySelector(".index-down").addEventListener("click", e => {
            let current = this.colorList.findIndex(x => x === group);
            let target = current + 1;
            if(target >= this.colorList.length) return;

            let xhr = new XMLHttpRequest();
            xhr.open("PUT", `/api/groups/${group.id}/down`);
            xhr.send();
            xhr.onload = () => {
                this.swap(current, target);
            }
        });


        // 좋아요 누르기
        elem.querySelectorAll(".good").forEach(x => {
            x.addEventListener("click", e => {
                if(!this.userdata) return false;
                let target = e.target;
                while(!target.classList.contains("good")) target = target.parentElement;
                const elemCnt = target.querySelector(".good-count");
                const elemSvg = target.querySelector("svg");
                
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "/api/good/" + elemSvg.dataset.id);
                xhr.send();
                xhr.onload = () => {
                    let result = JSON.parse(xhr.responseText);
                    if(result == "add"){
                        elemSvg.style.fill = "red";
                        elemCnt.innerText = parseInt(elemCnt.innerText) + 1;
                    }else{
                        elemSvg.style.fill = "black";
                        elemCnt.innerText = parseInt(elemCnt.innerText) - 1;
                    }
                }
            });
        }); 

        // 그룹명 수정
        elem.querySelector("button.group-edit").addEventListener("click", e => {
            let callback = function(new_name){
                let data  = { name: new_name };

                let xhr = new XMLHttpRequest();
                xhr.open("PUT", "/api/groups/" + group.id);
                xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
                xhr.send(JSON.stringify(data));

                xhr.onload = () => {
                    let result = JSON.parse(xhr.responseText);
                    
                    if(result === "name change") {
                        Alert.on("그룹명이 새롭게 바뀌었어요!");
                        elem.querySelector(".section-head > .name").innerText = new_name;
                    }
                    else if(result === "name not change") return Alert.on("똑같은 그룹명을 입력하셨어요!", Alert.error);
                    else if(result === "user not match") return Alert.on("이 그룹명을 수정할 권한이 없어요!<br><small>도대체 누구야!</small>", Alert.error);
                    else return Alert.on("알 수 없는 오류로 실패했어요….<br><small>관리자에게 문의해 보세요!</small>", Alert.error);
                };
            };
            Alert.prompt("새로운 그룹명을 입력해 주세요!", callback, "수정 완료!", "더 고민해 볼래!"); 
        });

        // 그룹 삭제
        elem.querySelector("button.group-remove").addEventListener("click", e => {
            let callback = () => {
                let xhr = new XMLHttpRequest();
                xhr.open("DELETE", "/api/groups/" + group.id);
                xhr.send();
                xhr.onload = () => {
                    let result = JSON.parse(xhr.responseText);

                    if(result === "del group") {
                        Alert.on("그룹이 삭제되었어요!");
                        group.elem.remove();
                        let idx = this.colorList.findIndex(x => x === group);
                        this.colorList.splice(idx, 1);
                    }
                    else if(result === "user not match") return Alert.on("이 그룹을 삭제할 권한이 없어요!<br><small>도대체 누구야!</small>");
                    else return Alert.on("알 수 없는 오류로 실패했어요….<br><small>관리자에게 문의해 보세요!</small>", Alert.error);
                };
            };
            Alert.confirm("정말 삭제하시겠습니까?", "그룹에 등록된 모든 색상이 삭제될 거에요!<br>신중하게 선택해 주세요!", callback, "네, 삭제할게요.", "아니 잠깐만요!")
        });


        // 그룹 페이지로 이동
        let hidden = elem.querySelector(".hidden-bar");
        if(hidden)
            hidden.addEventListener("click", () => {
                location.assign("/colors/storage/"+this.owner_id+"/groups/"+group.id);
            });

        return elem;
    }

    // 그룹의 위치를 교환
    swap(up, down){
        let upItem = this.colorList[up];
        let downItem = this.colorList[down];

        downItem.elem.remove();
        this.wrap.insertBefore(downItem.elem, upItem.elem);

        this.colorList.splice(up, 1, downItem);
        this.colorList.splice(down, 1, upItem);
    }

    // 로그인 확인 + 로그인 시 해야할 정보 적용
    updateLogin(){
        return new Promise( allResolve => {
            new Promise( res => { 
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/users/session");
                xhr.send();
                xhr.onload = () => res(JSON.parse(xhr.responseText));
            }).then( userdata => {
                if(userdata !== false) {
                    this.userdata = userdata;
                    this.userdata.good = this.userdata.good.split(",");

                    this.toolBox.classList.remove("hidden");
                    this.profileInfo.append(this.toolBox);
                }
                else {
                    this.userdata = null;

                    this.toolBox.classList.add("hidden");
                    this.toolBox.remove();
                }
    
                this.colorList.forEach( data => {
                    if(this.userdata !== null) {
                        data.elemBtns.classList.remove("hidden")
                        data.elemHead.append(data.elemBtns);

                        data.elemIdxs.classList.remove("hidden")
                        data.elemHead.append(data.elemIdxs);
                    }
                    else {
                        data.elemIdxs.classList.add("hidden")
                        data.elemIdxs.remove();
                    }

                    if(data.elemNoItem){
                        if(this.userdata !== null && this.owner_id === this.userdata.user_id) 
                            data.elemNoItem.innerHTML = `<p>
                                                            이런! 그룹에 등록된 색상이 없네요….<br>
                                                            <a href="/colors/picker">당장 등록하러 가볼까요?</a>
                                                        </p>`;
                        else    data.elemNoItem.innerHTML = `<p>이 그룹에는 아직 등록된 색상이 없네요….</p>`;
                    }

                    data.elem.querySelectorAll(".good svg").forEach(heart => {
                        heart.style.fill = this.userdata !== null && this.userdata.good.includes(heart.dataset.id) ? "red" : "black";
                    });
                });
                allResolve();
            });
        });
    }

    koreanDate(dateObj){
        dateObj = typeof dateObj === "object" ? dateObj : new Date(dateObj);
        return dateObj.getMonth() + "월 " + dateObj.getDate() + "일";
    } 
}

window.addEventListener("load", () => {
    let storage = new Storage();
    storage.init();
});