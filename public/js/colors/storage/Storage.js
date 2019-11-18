class Storage {
    constructor(){
        this.colorList = [];
        this.user_id = location.pathname.split("/").pop();
        this.wrap = document.querySelector("#wrap");
    
        
        this.loading().then(() => { // 색상 그룹, 색상 모두 불러오기 완료
            this.colorList.forEach(group => {
                group.elem = this.template(group);
                this.wrap.append(group.elem);
            });
        });
    }

    async loading(){
        this.colorList = await this.loadGroupData();
        await this.loadColorData();
    }

    loadGroupData(){
        return new Promise( res => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/users/"+ this.user_id +"/groups");
            xhr.send();
            xhr.onload = () => res(JSON.parse(xhr.responseText));
        })
    }

    loadColorData(){
        return new Promise( res => {
            this.colorList.forEach((group, idx) => {
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
                    if(idx === this.colorList.length - 1) res();
                }
            });
        });
    }

    createElement(html){
        let parent = document.createElement("div");
        parent.innerHTML = html;
        return parent.firstChild;
    }

    template(group){
        /* 템플릿에 맞추어서 그룹 요소를 생성한다 */
        let template = `<section>
                            <div class="section-head">
                                <h3>${group.name}</h3>
                                <div class="button-group">
                                    <button class="group-edit ml-2">
                                        <svg class="gUZ B9u U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M13.386 6.018l4.596 4.596L7.097 21.499 1 22.999l1.501-6.096L13.386 6.018zm8.662-4.066a3.248 3.248 0 0 1 0 4.596L19.75 8.848 15.154 4.25l2.298-2.299a3.248 3.248 0 0 1 4.596 0z"></path></svg>
                                    </button>
                                    <button class="group-remove ml-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eraser" class="svg-inline--fa fa-eraser fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"/></svg>
                                    </button>
                                </div>
                            </div>
                            <article>`
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
                                <span class="date">2019년 11월</span>
                                <span class="good">
                                    <svg viewBox="0 0 24 24"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                                    <span class="good-count ml-1">0</span>
                                </span>
                            </div>
                        </div>`;
        }); 
        if(group.data.length >= 5)
            template += `<div class="hidden-bar">
                            <svg class="gUZ B9u U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M22 10h-8V2a2 2 0 0 0-4 0v8H2a2 2 0 0 0 0 4h8v8a2 2 0 0 0 4 0v-8h8a2 2 0 0 0 0-4"></path></svg>
                        </div>`;
        template += `</article>
                </section>`;
        let elem = this.createElement(template);;
        

        /* 생성된 요소에 이벤트를 건다 */

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
                        elem.querySelector(".section-head > h3").innerText = new_name;
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
            let callback = function(){
                alert("와! 삭제됐다!");
            };
            Alert.confirm("정말 삭제하시겠습니까?", "그룹에 등록된 모든 색상이 삭제될 거에요!<br>신중하게 선택해 주세요!", callback, "네, 삭제할게요.", "아니 잠깐만요!")
        });


        return elem;
    }

    
}

window.addEventListener("load", () => {
    let storage = new Storage();
    storage.init();
});