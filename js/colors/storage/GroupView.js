class GroupView {
    constructor(){
        this.owner_idx = document.querySelector("meta[name='owner_idx']").content;
        this.owner_id = document.querySelector("meta[name='owner_id']").content;
        this.group_id = document.querySelector("meta[name='group_id']").content;

        this.g_title = document.querySelector("#group-title");
        this.wrap = document.querySelector("#color-contents");
        this.userBox = document.querySelector("#group-profile .user-info");
        
        this.colorList = [];
        this.loading().then(() => {
            this.updateLogin();
            this.eventTrigger();
        });
    }

    eventTrigger(){
        window.addEventListener("login", () => {
            this.updateLogin();
        });

        window.addEventListener("logout", () => {
            this.updateLogin();
        });

        this.userBox.addEventListener("click", () => location.assign("/colors/storage/"+this.owner_id));


        // 그룹명 수정
        document.querySelector("button.group-edit").addEventListener("click", e => {
            let callback = (new_name) => {
                let data  = { name: new_name };

                let xhr = new XMLHttpRequest();
                xhr.open("PUT", "/api/groups/" + this.group_id);
                xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
                xhr.send(JSON.stringify(data));

                xhr.onload = () => {
                    let result = JSON.parse(xhr.responseText);
                    
                    if(result === "name change") {
                        Alert.on("그룹명이 새롭게 바뀌었어요!");
                        this.g_title.innerText = new_name;
                    }
                    else if(result === "name not change") return Alert.on("똑같은 그룹명을 입력하셨어요!", Alert.error);
                    else if(result === "user not match") return Alert.on("이 그룹명을 수정할 권한이 없어요!<br><small>도대체 누구야!</small>", Alert.error);
                    else return Alert.on("알 수 없는 오류로 실패했어요….<br><small>관리자에게 문의해 보세요!</small>", Alert.error);
                };
            };
            Alert.prompt("새로운 그룹명을 입력해 주세요!", callback, "수정 완료!", "더 고민해 볼래!"); 
        });

        // 그룹 삭제
        document.querySelector("button.group-remove").addEventListener("click", e => {
            let callback = () => {
                let xhr = new XMLHttpRequest();
                xhr.open("DELETE", "/api/groups/" + this.group_id);
                xhr.send();
                xhr.onload = () => {
                    let result = JSON.parse(xhr.responseText);

                    if(result === "del group") {
                        Alert.on("그룹이 삭제되었어요!", Alert.info, () => {
                            location.assign("/colors/storage/" + this.owner_id);
                        });
                    }
                    else if(result === "user not match") return Alert.on("이 그룹을 삭제할 권한이 없어요!<br><small>도대체 누구야!</small>");
                    else return Alert.on("알 수 없는 오류로 실패했어요….<br><small>관리자에게 문의해 보세요!</small>", Alert.error);
                };
            };
            Alert.confirm("정말 삭제하시겠습니까?", "그룹에 등록된 모든 색상이 삭제될 거에요!<br>신중하게 선택해 주세요!", callback, "네, 삭제할게요.", "아니 잠깐만요!")
        });

    }
    
    loading(){
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/groups/"+this.group_id+"/colors");
            xhr.send();
            xhr.onload = () => {
                let result = JSON.parse(xhr.responseText);
                this.wrap.innerHTML = "";
                result.forEach(x => {
                    x.tags = x.tag.split(" ");
                    x.tags = x.tags[0] === "" ? [] : x.tags;
                    x.elem = this.template(x);
                    this.colorList.push(x);
                    this.wrap.append(x.elem);
                });
                res();
            };
        });
    }

    template(data){
        let html = `<div class="item">
                        <div class="colors">
                            <div class="line" style="background-color: #${data.hex1}">#${data.hex1}</div>
                            <div class="line" style="background-color: #${data.hex2}">#${data.hex2}</div>
                            <div class="line" style="background-color: #${data.hex3}">#${data.hex3}</div>
                            <div class="line" style="background-color: #${data.hex4}">#${data.hex4}</div>
                            <div class="line" style="background-color: #${data.hex5}">#${data.hex5}</div>
                        </div>
                        <div class="tags">`;
        data.tags.forEach(tag => {
            html += `<span class="tag">${tag}</span>`;
        });
        if(data.tags.length === 0) html += `<p class="text-center">추가된 태그가 없습니다.</p>`;
        html +=        `</div>
                        <div class="info">
                            <span class="date">${this.koreanDate(data.day)}</span>
                            <span class="good">
                                <svg viewBox="0 0 24 24" data-id="${data.id}"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                                <span class="good-count ml-1">${data.good}</span>
                            </span>
                        </div>
                    </div>`;

        let parent = document.createElement("div");
        parent.innerHTML = html;
        let elem = parent.firstChild;

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
        
        return elem;
    }

    // 로그인 확인 + 좋아요 적용
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
                }
                else {
                    this.userdata = null;
                }
    
                this.colorList.forEach( data => {
                    data.elem.querySelector(".good svg").style.fill = this.userdata !== null && this.userdata.good.includes(data.id) ? "red" : "black";
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

window.addEventListener("load", function(){
    const view = new GroupView();
});