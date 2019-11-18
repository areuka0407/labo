class Tags {
    constructor(selector){
        this.tagList = [];

        this.elemBox = typeof selector === "string" ? document.querySelector(selector) : selector;
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


        document.querySelector("#submit").addEventListener("click", () => {
            new Promise(res => {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/users/session");
                xhr.send();
                
                xhr.onload = () => res(xhr.responseText);
                xhr.onerror = () => Alert.on("서버가 응답하지 않습니다. 잠시 후 다시 시도해 주세요.", Alert.error);
            }).then( data => new Promise(res => {
                data = JSON.parse(data);
                if(!data) return Alert.on("로그인 후 이용할 수 있습니다.", Alert.error);
    
                let form = new FormData();
                document.querySelectorAll(".box").forEach((x, i) => {
                    let r = x.querySelector(".R > input").value;
                    let g = x.querySelector(".G > input").value;
                    let b = x.querySelector(".B > input").value;
                    let hex = x.querySelector(".HEX > input").value;
    
                    form.append("rgb" + (i+1), `rgb(${r},${g},${b})`);
                    form.append("hex" + (i+1), hex); 
                });
    
                form.append("group_id", document.querySelector("#myGroups").value);
                form.append("user_id", data.id);
                form.append("tag", document.querySelector("#tag-box .output").value);
    
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/api/colors");
                xhr.send(form);
                xhr.onload = res(xhr.responseText);
            })).then(data => {
                Alert.on("성공적으로 저장되었습니다.");
                this.tagList = [];
                this.elemOutput.value = "";
                this.elemBox.querySelectorAll(".tag").forEach(x => x.remove());
            });
        }); 
    }


    lock(){
        this.elemInput.style.pointerEvents = "none";
        this.elemBox.classList.add("disabled");
    }
    unlock(){
        this.elemInput.style.pointerEvents = "all";
        this.elemBox.classList.remove("disabled");
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