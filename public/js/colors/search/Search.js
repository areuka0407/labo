class Search {
    constructor(){
        this.origin = [];
        this.tagList = [];
        this.search = {keyword: "", type: "tag"};
        this.filter = {
            tags: "",
            user_name: "",
            main_color: "",
        };
        
        this.sort = (a, b) => a.day - b.day;

        new Promise(res => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/colors");
            xhr.send();
            xhr.onload = () => res(xhr.responseText);
        }).then(data => {
            JSON.parse(data).forEach(x => {
                let cnew = this.templateColor(x);
                cnew.tags.forEach(tag => {     
                    let find = this.tagList.find(x => x.name === tag);
                    if(!find)  this.tagList.push({name: tag, list: [cnew]})
                    else find.list.push(cnew);
                });
                this.origin.push( cnew );
            });

            
            // 태그 기본 세팅
            this.tagBox = document.querySelector("#tag-box");
            this.tagBox.innerHTML = '';
            this.tagList.forEach(tag => {
                tag.elem = this.templateTag(tag);
                this.tagBox.append(tag.elem);
            });
            
            this.keysearch = new Keysearch("#search-bar", Keysearch.multiple, () => this.view.apply(this) );

            this.init();
            this.eventTrigger();
        });
    }

    async view(){
        await this.updateLogin();
        const elemBox = document.querySelector("article");
        elemBox.innerHTML = "";
        
        let viewList = Object.assign(this.origin);


        // search
        viewList = viewList.filter(x => {
            let data = x[this.search.type];
            return this.search.keyword === "" || this.search.keyword.split(" ").reduce((p, c) => p || (c !== "" && new RegExp(`.*(${this.encodeRegex(c)}).*`).test(data)), false);
        });

        //filter
        viewList = viewList.filter(x => {
            let tagFilter = ( this.filter.tags.length === 0 && x.tags.length === 0 ) || x.tags.reduce((p, c) => p || this.filter.tags.includes(c) || this.filter.tags.length === 0, false);
            let colorFilter = this.filter.main_color === "" || this.filter.main_color === Color.getMainColor(x.hex3);
            return tagFilter && colorFilter;
        });

        // sort
        viewList = viewList.sort(this.sort);
        
        
        viewList.forEach(x => {
            elemBox.append(x.elem);
        });
    }

    // 로그인 확인
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
    
                this.origin.forEach( data => {
                    data.elem.querySelector(".good svg").style.fill = this.userdata !== null && this.userdata.good.includes(data.id) ? "red" : "black";
                });
                allResolve();
            });
        });
    }

    eventTrigger(){
        // 로그인 이벤트
        window.addEventListener("login", e => this.view());
        window.addEventListener("logout", e => this.view());

        document.querySelector("#filter-order").addEventListener("click", e => {
            let target = e.target;
            while(target.id !== "filter-order") target = target.parentElement;

            this.tagBox.innerHTML = "";
            if(target.classList.contains("DESC")){
                target.classList.remove("DESC");
                target.classList.add("ASC");
                this.tagList.sort((a, b) => a.list.length - b.list.length).forEach(x => {
                    this.tagBox.append(x.elem);
                });
            }
            else if(target.classList.contains("ASC")) {
                target.classList.remove("ASC");
                target.classList.add("DESC");
                this.tagList.sort((a, b) => b.list.length - a.list.length).forEach(x => {
                    this.tagBox.append(x.elem);
                });
            }
        });


        // 정렬 <select> 태그를 사용하면 내용물이 정렬되어 보여진다.
        document.querySelector("#orderBy").addEventListener("change", e => {
            let order = e.target.value.split("-");
            this.sort = (a, b) => {
                let comA = a[order[0]];
                let comB = b[order[0]];

                if(order[1] === "ASC") return comA - comB;
                else return comB - comA;
            };
            this.init();
        });


        // 검색창 내에 키워드를 입력할 때마다 검색 내용이 적용되어 보여진다.
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

        document.querySelector("#search-btn").addEventListener("click", () => this.searchBar());


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
                                <svg viewBox="0 0 24 24" style="fill:'black'"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                                <span class="count" id="count${data.id}">${data.good}</span>
                            </div>
                        </div>`;
        data.elem = document.createElement("div");
        data.elem.classList.add("item");
        data.elem.innerHTML = template;

        data.elem.querySelector(".good").addEventListener("click", e => {
            if(!this.userdata) return false;
            let target = e.target;
            while(!target.classList.contains("good")) target = target.parentElement;
            const elemCnt = target.querySelector(".count");
            const elemSvg = target.querySelector("svg");
            
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
        
        let elem = document.createElement("div");
        let innerHTML = `<div class="name">${data.name}</div>
                         <span class="count ${this.getTagBrightness(main_color)}" style="background-color: #${main_color}">300+</span>`;
        elem.classList.add("item");
        elem.innerHTML = innerHTML;
        return elem;
    }

    searchBar(){
        let bar = document.querySelector("#search-bar");
        let type = bar.dataset.type;
        let keyword = bar.value;
        this.search = {"keyword": keyword, "type": type};
        this.init();
    }

    getTagBrightness(hex){
        let color = [
            parseInt(hex.substr(0, 2), 16),
            parseInt(hex.substr(2, 2), 16),
            parseInt(hex.substr(4, 2), 16)
        ];
        return color.reduce(p => p > 255 / 2) ? "dark" : "light";
    }

    encodeRegex(str){
        return str.replace(/([\.\\\/^$+\(\)\[\]\-]+)/g, "\\$1");
    }

    koreanDate(dateObj){
        dateObj = typeof dateObj === "object" ? dateObj : new Date(dateObj);
        return dateObj.getMonth() + "월 " + dateObj.getDate() + "일";
    }
};
//good event
function addgood(id){
    console.log(id);
    $.ajax({
        url:"/api/good/"+id,
        type:"GET",
        success:function(result){
            result = $.parseJSON(result);
            if(result == "add"){
                $("#good"+id).css("fill","red");
                let count = Number($("#count"+id).text());
                $("#count"+id).text(count+1);
            }else{
                $("#good"+id).css("fill","black");
                let count = Number($("#count"+id).text());
                $("#count"+id).text(count-1);
            }
        }
    })
}

window.addEventListener("load", () => new Search());
