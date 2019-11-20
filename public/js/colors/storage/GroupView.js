class GroupView {
    constructor(){
        this.group_id = document.querySelector("meta[name='group_id']").content;
        
        this.wrap = document.querySelector(".contents");
        this.colorList = [];
        this.loading().then(() => {

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
                                <span class="good-count ml-1">0</span>
                            </span>
                        </div>
                    </div>`;

        let parent = document.createElement("div");
        parent.innerHTML = html;
        let elem = parent.firstChild;
        
        return elem;
    }
    
    koreanDate(dateObj){
        dateObj = typeof dateObj === "object" ? dateObj : new Date(dateObj);
        return dateObj.getMonth() + "월 " + dateObj.getDate() + "일";
    } 
}

window.addEventListener("load", function(){
    const view = new GroupView();
});