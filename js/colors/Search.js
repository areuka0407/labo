class Search {
    constructor(){
        this.origin = [];
        this.tagList = [];
        this.search = {keyword: "", type: "tag"};
        this.filter = {
            tags: [],
            main_color: "",
        };
        this.sort = (a, b) => a.day - b.day;
        this.userdata = null;
        
        new Promise( res => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/users/session");
            xhr.send();
            xhr.onload = () => res(xhr.responseText);
        }).then( userdata => {
            this.userdata = JSON.parse(userdata);
            this.userdata.good = this.userdata.good.split(",");
            console.log(this.userdata);
        });


        new Promise(res => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/colors");
            xhr.send();
            xhr.onload = () => res(xhr.responseText);
        }).then(data => {
            JSON.parse(data).forEach(x => {
                let cnew = this.templateColor(x);

                // 태그 추가하기
                cnew.tags.forEach(tag => {     
                    let find = this.tagList.find(x => x.name === tag);
                    if(!find)  this.tagList.push({name: tag, list: [cnew]})
                    else find.list.push(cnew);
                });

                this.origin.push(cnew);
            });

            
            // 태그 기본 세팅
            const tagBox = document.querySelector("#tag-box");
            tagBox.innerHTML = '';
            this.tagList.forEach(tag => tagBox.append(this.templateTag(tag)));

            this.view();
            this.eventTrigger();
        });
    }

    view(){
        const elemBox = document.querySelector("article");
        elemBox.innerHTML = "";
        
        let viewList = Object.assign(this.origin);

        // search
        viewList = viewList.filter(x => {
            let data = x[this.search.type];
            return data.match(new RegExp(this.search.keyword)) !== null;
        });

        //filter
        viewList = viewList.filter(x => {
            let tagFilter = x.tags.reduce((p, c) => p || this.filter.tags.includes(c) || this.filter.tags.length === 0, false);
            let colorFilter = this.filter.main_color === "" || this.filter.main_color === Color.getMainColor(x.hex3);
            return tagFilter && colorFilter;
        });

        // sort
        viewList = viewList.sort(this.sort);
        
        
        viewList.forEach(x => {
            elemBox.append(x.elem);
        });
    }

    eventTrigger(){
        // 정렬 <select> 태그를 사용하면 내용물이 정렬되어 보여진다.
        document.querySelector("#orderBy").addEventListener("change", e => {
            let order = e.target.value.split("-");
            this.sort = (a, b) => {
                let comA = a[order[0]];
                let comB = b[order[0]];

                if(order[1] === "ASC") return comA - comB;
                else return comB - comA;
            };
            this.view();
        });


        // 검색어를 클릭하면 키보드를 누를 때마다 검색 내용이 적용되어 보여진다.
        const searchBar = document.querySelector("#search-bar");
        let keyTimer;
        searchBar.addEventListener("keydown", e => {
            if(e.keyCode === 13) this.searchBar();
            if(keyTimer) clearTimeout(keyTimer)
            keyTimer = setTimeout(() => this.searchBar(), 500);
        });


        // 검색 옵션이 바뀌면 input 태그에 적용시킨다.
        document.querySelector("#s-option-tags").addEventListener("change", e => {
            searchBar.dataset.type = "tag";
            this.searchBar();
        });
        document.querySelector("#s-option-username").addEventListener("change", e => {
            searchBar.dataset.type ="user_name";
            this.searchBar();
        });

        document.querySelector("#search-btn").addEventListener("click", this.searchBar);


        // 태그버튼을 누르면 태그가 바뀌어서 필터링된다.
        document.querySelectorAll("#tag-box > .item").forEach(x => x.addEventListener("click", e => {
            let tagName = e.target.querySelector(".name").innerText;

            // 기존 필터 태그가 있다면
            if(this.filter.tags.includes(tagName)){
                let idx = this.filter.tags.indexOf(tagName);
                this.filter.tags.splice(idx, 1);
                e.target.classList.remove("active");
            }
            // 기존 필터 태그가 없다면
            else {
                this.filter.tags.push(tagName);
                e.target.classList.add("active");
            }

            this.view();
        }));


        // 색상버튼을 누르면 값에 따라 필터링된다.
        document.querySelectorAll("#color-box > .item").forEach(x => x.addEventListener("click", e => {
            let color = e.target.dataset.color;
            document.querySelectorAll("#color-box > .item.active").forEach(y => y.classList.remove("active"));

            if(color === this.filter.main_color) this.filter.main_color = "";
            else {
                e.target.classList.add("active");
                this.filter.main_color = color;
            }

            this.view();
        }));
    }

    templateColor(data){
        data.tags = data.tag.split(" ");
        if(data.tags.length === 1 && data.tags[0] === "") data.tags = [];
        data.day = new Date(data.day);
        data.good = parseInt(data.good);

        let template = `<div class="colors">
                            <div class="line" style="background-color: #${data.hex1}">
                                <span>#${data.hex1}</span>
                            </div>
                            <div class="line" style="background-color: #${data.hex2}">
                                <span>#${data.hex2}</span>
                            </div>
                            <div class="line" style="background-color: #${data.hex3}">
                                <span>#${data.hex3}</span>
                            </div>
                            <div class="line" style="background-color: #${data.hex4}">
                                <span>#${data.hex4}</span>
                            </div>
                            <div class="line" style="background-color: #${data.hex5}">
                                <span>#${data.hex5}</span>
                            </div>
                        </div>
                        <div class="tags">`
        
        data.tags.forEach(x => {
            template += `<span>${x}</span>`;
        });

        if(data.tags.length === 0) template += "<p>등록된 태그가 없습니다.</p>";

        template +=    `</div>
                        <div class="other">
                            <span class="date">${this.koreanDate(data.day)}</span>
                            <span class="owner">${data.user_name}</span>
                            <div class="good">
                                <svg viewBox="0 0 24 24"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                                <span class="count">${data.good}</span>
                            </div>
                        </div>`;
        data.elem = document.createElement("div");
        data.elem.classList.add("item");
        data.elem.innerHTML = template;

        data.elem.querySelector(".good").addEventListener("click", function(){
            const elemCnt = this.querySelector(".count");
            const elemSvg = this.querySelector("svg");
            
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/good/" + data.id);
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

        return data;
    }

    templateTag(data){
        let main_color = data.list.sort((a, b) => b.good - a.good)[0].hex3;
        let length = data.list.length > 3 ? data.list.length.substr(0, 3) + "+" : data.list.length;

        let elem = document.createElement("div");
        let innerHTML = `<div class="name">${data.name}</div>
                         <span class="count" style="background-color: #${main_color}">${length}</span>`;
        elem.classList.add("item");
        elem.innerHTML = innerHTML;
        return elem;
    }

    searchBar(){
        let bar = document.querySelector("#search-bar");
        let type = bar.dataset.type;
        let keyword = bar.value;
        if(type === "tag") keyword = `.*(${this.encodeRegex(keyword)}).*`;
        this.search = {"keyword": keyword, "type": type};
        this.view();
    }

    encodeRegex(str){
        return str.replace(/([\.\\\/^$+\(\)\[\]\-]+)/g, "\\$1");
    }

    koreanDate(dateObj){
        dateObj = typeof dateObj === "object" ? dateObj : new Date(dateObj);
        return dateObj.getMonth() + "월 " + dateObj.getDate() + "일";
    }
};

window.addEventListener("load", () => new Search());
