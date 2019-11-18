class Keysearch {
    static default = 1;
    static multiple = 2;
    static withoutPrefix = 3;

    constructor(target, type = Keysearch.default, callback = null){
        if(typeof target === "string") target = document.querySelector(target);
        
        this.type = type;
        this.callback = callback;

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

    getValue(){
        if(Keysearch.multiple === this.type) return this.target.value.split(" ").pop();
        else return this.target.value;
    }

    setValue(result){
        if(Keysearch.default === this.type) this.target.value = result;
        else if(Keysearch.multiple === this.type) this.target.value = this.target.value.split(" ").slice(0, -1).join(" ") + " " + result;
        else if(Keysearch.withoutPrefix === this.type) this.target.value = result.substr(1);
    }

    loadKeyword(){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/api/tags?keyword=" + encodeURI(this.getValue()));
        xhr.send();
        xhr.onload = () => {
            let result = JSON.parse(xhr.responseText);
            result = !result ? [] : result.filter(x => !this.target.value.split(" ").includes(x));
            if(result.length > 0){ // 일치하는 검색어가 있는 경우
                this.target.parentElement.append(this.elem);
                this.elem.innerHTML = "";
                result.forEach(x => {
                    let box = document.createElement("div");
                    box.addEventListener("click", e => {
                        this.setValue(e.target.innerText);
                        this.elem.innerHTML = "";
                        this.elem.remove();
                        this.target.focus();
                        this.callback && this.callback();
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