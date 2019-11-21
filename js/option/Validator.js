class Validator {
    constructor(){
        this.contentBox = document.querySelector("#option");

        // 숨겨야 할 목록
        this.viewElem = document.querySelectorAll(".o-item");

        // 패스워드 인증

        this.elem = Style.create(`<div class="o-validator">
                        <div class="form-group mt-4 mb-3">
                            <label for="passconf">비밀번호 확인</label>
                            <input type="password" id="validator">
                        </div>
                        <button class="valid-btn">인증하기</button>
                    </div>`);
        
        this.input = this.elem.querySelector("#validator");
        this.elem.querySelector(".valid-btn").addEventListener("click", () => this.checkPassword());
        this.elem.querySelector("#validator").addEventListener("keydown", e => e.keyCode === 13 && this.checkPassword());
    }

    checkPassword(){
        if(this.input.value.trim() === ""){
            this.error(this.input, "비밀번호를 입력하세요.");
            return;
        }

        const form = new FormData();
        form.append("password", this.input.value);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/validator/password");
        xhr.send(form);

        xhr.onload = () => {
            let result = JSON.parse(xhr.responseText);
            if(result){ // 비밀번호 일치
                this.unlock();
            }   
            else { //비밀번호 불일치
                this.error(this.input, "비밀번호가 일치하지 않습니다!");
            }
        };
    }

    checkValidTime(){
        return new Promise(res => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/validator/time");
            xhr.send();
            xhr.onload = () => res(JSON.parse(xhr.responseText));
        });
    }

    async lock(){
        if(await this.checkValidTime()){
            this.viewElem.forEach((x, i) => {
                x.style.display = "none";
                x.classList.remove("hidden");
                this.contentBox.append(x);
                $(x).fadeIn(500);
            });
        }
        else {
            this.viewElem.forEach(x => {
                x.remove();
                x.classList.remove("hidden");
            });       
    
            this.contentBox.append(this.elem);
        }
    }

    unlock(){
        $(this.elem).fadeOut(500, () => {
            this.elem.remove()
            this.viewElem.forEach((x, i) => {
                x.style.display = "none";
                this.contentBox.append(x);
                $(x).fadeIn(500);
            });
        });
    }

     /* ERROR
     */
    error(formElem, message){
        let parent = formElem.parentElement;

        // 기존 메세지 삭제
        let oldMsg = parent.querySelector(".error-message");
        if(oldMsg) oldMsg.remove();

        // 새로운 메세지 생성
        let error = document.createElement("p");
        error.classList.add("error-message");
        error.innerHTML = message;

        parent.append(error)
    }
}