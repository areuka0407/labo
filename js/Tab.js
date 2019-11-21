class Tab {
    constructor(target, list = []){
        this.target = target;
        this.list = list.map(x => {
            return {name: x.name, callback: x.callback};
        });

        this.elem = document.createElement("div");
        this.elem.classList.add("tab-container");

        if(!document.querySelector("link[href='/css/tab.css']")){
            let style = document.createElement("link");
            style.name = "tab";
            style.href = "/css/tab.css";
            style.rel = "stylesheet";
            document.head.append(style);
        }

        target.addEventListener("click", () => {
            if(this.elem !== document.querySelector(".tab-container"))
                this.open();
            else this.elem.remove();
        });
        this.init();
    }

    init(){
        this.elem.innerHTML = "";
        this.list.forEach(x => {
            let item = document.createElement("div");
            item.classList.add("item");

            item.innerText = x.name;
            item.onclick = x.callback;

            this.elem.append(item);
        });
    }

    open(){
        document.querySelectorAll(".tab-container").forEach(x => x.remove());

        let height = parseInt($(this.target).css("height"));
        Style.setStyle(this.elem, {
            display: "none",
            left: this.target.offsetLeft - 80 + "px",
            top: this.target.offsetTop + height + 10 + "px",
        });

        this.target.parentElement.append(this.elem);
        $(this.elem).slideDown(300);
    }
}