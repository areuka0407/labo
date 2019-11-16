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

        target.addEventListener("click")
    }
}