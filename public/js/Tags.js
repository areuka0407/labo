class Tags {
    constructor(selector){
        this.tagList = [];

        this.elemBox = document.querySelector(selector);
        this.elemInput = this.elemBox.querySelector(".input");
        this.elemOutput = this.elemBox.querySelector(".output");
        

        this.elemInput.addEventListener("keydown", e => {
            let max_w = 400;
            this.elemInput.style.width = this.elemInput.scrollWidth + 10 > max_w ? max_w + 10 + "px" : this.elemInput.scrollWidth + "px";
    
            if(e.key === "#")  e.preventDefault();
            if(this.tagList.length >= 10){
                return this.error("태그는 10개까지만 추가할 수 있어요…");
            }
            if(e.target.value.length + 1 > 20){
                e.target.value = e.target.value.substr(0, 20);
                return this.error("태그는 20자 이내로 작성해 주세요!");
            }            
            if(e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 9){
                e.preventDefault();
                //check 
                if(e.target.value.length < 2 ) return this.error("태그는 2자 이상으로 작성해 주세요!", e.offsetLeft, e.offsetTop);
                if(this.tagList.includes("#" + e.target.value)) return this.error("이미 추가한 태그에요!", e.offsetLeft, e.offsetTop);

                //append
                let newTag = this.createTag(this.elemInput.value);
                this.elemBox.append(newTag);

                //reset
                this.elemInput.value = "";
                this.elemInput.style.width = "100px";

            }
        });
    }


    createTag(value){
        // Create
        let elem = document.createElement("div");
        elem.classList.add("tag");
        elem.innerHTML = `<span>#${value}</span>
                          <button>&times;</button>`;
        elem.querySelector("button").addEventListener("click", e => {
            let value = e.target.previousElementSibling.innerText;
            let idx = this.tagList.findIndex(x => x === value);
            this.tagList.splice(idx, 1);
            this.elemOutput.value = this.tagList.join(" ");
            elem.remove();
        });

        // Save
        this.tagList.push("#"+value);
        this.elemOutput.value = this.tagList.join(" ");
        return elem;
    }

    error(message){
        let err =  document.createElement("div");
        err.classList.add("error");
        err.innerText = message;

        this.elemBox.append(err);
        
        setTimeout(() => {
            err.style.opacity = 0;
            err.style.top = "70%";
        }, 50);
        

        return false;
    }
}