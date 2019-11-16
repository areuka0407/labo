class Keysearch {
    constructor(target){
        if(typeof target === "string") target = document.querySelector(target);
        
        this.target = target;
        this.offsetX = target.offsetX;
        this.offsetY = target.offsetY;

        this.elem = document.createElement("div");
        this.elem.classList.add("keysearch");
        this.elem.style.left = this.offsetX + "px";
        this.elem.style.top = this.offsetY + "px";
        target.parentElement.append(this.elem);

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
            console.log(result);
            result.forEach(x => {
                this.elem.append("<div>"+x+"</div>")
            });
        };
        xhr.onerror = () => console.error(xhr.response);
    }
}