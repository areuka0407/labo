class Keysearch {
    constructor(target){
        if(typeof target === "string") target = document.querySelector(target);
        
        this.target = target;
        this.offsetX = target.offsetLeft;
        this.offsetY = target.offsetTop + Style.getStyleByInteger(target, "height");

        this.elem = document.createElement("div");
        this.elem.classList.add("keysearch");
        this.elem.style.left = this.offsetX + "px";
        this.elem.style.top = this.offsetY + "px";

        this.timer = null;
        target.addEventListener("keydown", e => {
            if(this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(() => this.loadKeyword(), 500);
        });
    }

    loadKeyword(){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/api/tags?keyword=" + encodeURI(this.target.value));
        xhr.send();
        xhr.onload = () => {
            let result = JSON.parse(xhr.responseText);
            if(result.length > 0){ // 일치하는 검색어가 있는 경우
                this.target.parentElement.append(this.elem);
                this.elem.innerHTML = "";
                result.forEach(x => {
                    let box = document.createElement("div");
                    box.addEventListener("click", e => {
                        this.target.value = e.target.innerText.substr(1);
                        this.elem.innerHTML = "";
                        this.elem.remove();
                    });
                    box.innerText = x;
                    this.elem.append(box);
                });
            }
            else { // 일치하는 검색어가 없는 경우
                this.elem.innerHTML = "";
                this.elem.remove();
            }  
        };
        xhr.onerror = () => console.error(xhr.response);
    }
}