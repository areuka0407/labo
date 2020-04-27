class Option extends Validator {
    constructor(){
        super();
        this.lock();

        this.allowed_size = 1024 * 1024 * 2;
        this.allowed_format = ["jpg", "jpeg", "gif", "png"];

        this.image = null;
        this.imageBox = document.querySelector(".o-image");
        this.dropBox = document.querySelector("#dropdown-area");
        this.imagePreview = document.querySelector(".preview")
        this.imageInput = document.querySelector("#upload-image");
        this.form = {
            id: document.querySelector("#uid"),
            user_id: document.querySelector("#user_id"),
            user_name: document.querySelector("#user_name"),
            passconf: document.querySelector("#passconf"),
            password: document.querySelector("#password"),
            birth_y: document.querySelector("#birthday-Y"),
            birth_m: document.querySelector("#birthday-M"),
            birth_d: document.querySelector("#birthday-D"),
            gender: document.querySelector("#gender")
        };
        this.submit = document.querySelector(".submit-btn");
    }

    eventTrigger(){
        /* Input
        */

        // name
        
        if(this.form.user_name){
            let nameTimer;
            this.form.user_name.addEventListener("keydown", e => {
                if(nameTimer) clearTimeout(nameTimer); 
                nameTimer = setTimeout(() => {
                    nameValidator(e.target.value);
                }, 500);
            });
        }
        const nameValidator = name => {
            let target = this.form.user_name;
            if(name.trim() == "")
                this.error(target, "닉네임을 입력하세요!");
            else if(name.length > 30)
                this.error(target, "닉네임은 30자 이하여야 해요!");
            else if(target.parentElement.querySelector(".error-message")) 
                target.parentElement.querySelector(".error-message").remove();
        }

        // password
        if(this.form.password){
            let passTimer;
            this.form.password.addEventListener("keydown", e => {
                if(passTimer) clearTimeout(passTimer); 
                passTimer = setTimeout(() => {
                    passValidator(e.target.value);
                }, 500);
            });
        }
        const passValidator = password => {
            let target = this.form.password;
            let regex = /^(?=.*[0-9]+)(?=.*[a-zA-Z]+)([a-zA-Z0-9]{8,})$/
            if(password.length < 8)
                this.error(target, "비밀번호는 8자 이상이여야 해요!");
            else if(password.match(regex) === null)
                this.error(target, "비밀번호는 영문/숫자 조합이여야 해요!");
            else if(target.parentElement.querySelector(".error-message")) 
                target.parentElement.querySelector(".error-message").remove();
        }

        //passconfirm
        if(this.form.passconf){
            let confTimer;
            this.form.passconf.addEventListener("keydown", e => {
                if(confTimer) clearTimeout(confTimer);
                confTimer = setTimeout(() => {
                    confValidator(this.form.password.value, this.form.passconf.value);
                }, 500);
            });
        }
        const confValidator = (password, passconf) => {
            let target = this.form.passconf;
            if(password !== passconf)
                this.error(target, "비밀번호가 일치하지 않아요….");
            else if(target.parentElement.querySelector(".error-message"))
                target.parentElement.querySelector(".error-message").remove();
        };

        // birthday
        if(this.form.birth_y && this.form.birth_m && this.form.birth_d){
            let yearTimer;
            this.form.birth_y.addEventListener("keydown", e => {
                if(yearTimer) clearTimeout(yearTimer); 
                yearTimer = setTimeout(() => {
                    if(this.form.birth_y && this.form.birth_m && this.form.birth_d)
                        dateValidator(`${this.form.birth_y.value}-${this.form.birth_m.value}-${this.form.birth_d.value}`);
                }, 500);
            });

            let monthTimer;
            this.form.birth_m.addEventListener("keydown", e => {
                if(monthTimer) clearTimeout(monthTimer); 
                monthTimer = setTimeout(() => {
                    if(this.form.birth_y && this.form.birth_m && this.form.birth_d)
                        dateValidator(`${this.form.birth_y.value}-${this.form.birth_m.value}-${this.form.birth_d.value}`);
                }, 500);
            });

            let dayTimer;
            this.form.birth_d.addEventListener("keydown", e => {
                if(dayTimer) clearTimeout(dayTimer); 
                dayTimer = setTimeout(() => {
                    if(this.form.birth_y && this.form.birth_m && this.form.birth_d)
                        dateValidator(`${this.form.birth_y.value}-${this.form.birth_m.value}-${this.form.birth_d.value}`);
                }, 500);
            });
        }
        const dateValidator = (ymd, required = false) => {
            let target = this.form.birth_y;
            let date = new Date(ymd);
            let today = new Date();

            
            if(required && (this.form.birth_y.value === "" || this.form.birth_m.value === "" || this.form.birth_d === "")){
                this.error(target.parentElement, "생년월일을 입력해 주세요!");
                return;
            }
            
            if(date == "Invalid Date" ||  this.checkDate(ymd))
                this.error(target.parentElement, "올바른 생년월일을 입력해 주세요!");
            else if(date > today)
                this.error(target.parentElement, "미래에서 오셨군요? ^^");
            else if(target.parentElement.parentElement.querySelector(".error-message")) 
                target.parentElement.parentElement.querySelector(".error-message").remove();
            
        }

        /* Image 
        */

        if(this.imageBox && this.imagePreview && this.dropBox && this.imageInput){
            this.imagePreview.addEventListener("drop", e => e.preventDefault());
            this.imagePreview.addEventListener("dragover", e => e.preventDefault());
            this.imageBox.addEventListener("dragover", e => e.preventDefault());

            this.imageBox.addEventListener("drop", e => {
                e.preventDefault();
                e.stopPropagation();

                this.preview(e.dataTransfer.files[0]);
                $(this.dropBox).fadeOut(150);
            });

            window.addEventListener("dragenter", e => {
                e.preventDefault();
                e.stopPropagation();
                $(this.dropBox).fadeIn(300);
            });

            window.addEventListener("dragleave", e => {
                e.preventDefault();
                e.stopPropagation();

                if(e.fromElement === null)
                    $(this.dropBox).hide();
            });

            this.dropBox.addEventListener("dragover", e => {
                if($(this.dropBox).is(":animated")) return;
                e.preventDefault();
                e.stopPropagation();
            });

            this.imageInput.addEventListener("change", e => {
                this.preview(e.target.files[0]);
            });  
        }


        /* Submit
         */
        if(this.submit){
            this.submit.addEventListener("click", () => {
                document.querySelectorAll(".error-message").forEach(x => x.remove());
    
                this.form.user_name && nameValidator(this.form.user_name.value);
                this.form.password && passValidator(this.form.password.value);
                this.form.birth_y && this.form.birth_m && this.form.birth_d && dateValidator(`${this.form.birth_y.value}-${this.form.birth_m.value}-${this.form.birth_d.value}`, true);
    
                let error = document.querySelector(".error-message");
                if(error) return Alert.on("입력 양식에 맞춰 작성해 주세요!", Alert.error);
    
                let form = {};
    
                if(this.form.user_name) form.user_name = this.form.user_name.value;
                if(this.form.password) form.password = this.form.password.value;
                if(this.form.birth_y && this.form.birth_m && this.form.birth_d) form.y_m_d = `${this.form.birth_y.value}-${this.form.birth_m.value}-${this.form.birth_d.value}`;
                if(this.form.gender) form.gender = this.form.gender.value;
                if(this.imageInput) form.image = this.image;
    
                let xhr = new XMLHttpRequest();
                xhr.open("PUT", "/users/" + this.form.id.value);
                xhr.send(JSON.stringify(form));
                xhr.onload = () => {
                    let result = JSON.parse(xhr.responseText);
    
                    if(result === "user update") location.assign("/colors/storage/" + this.form.user_id.value);
                    else if(result = "not change") Alert.on("변경된 사항이 없어서 수정할 게 없었어요…", Alert.error);
                    else Alert.on("<h3>변경 사항을 적용하는 중에 문제가 발생했어요!</h3><small class='mt-3'>이 문제가 계속될 경우 관리자에게 문의해 보세요!</small>", Alert.error)
                };
                xhr.onerror = () => console.error(xhr.response);
            });
        }
    }

    /* Preview
     */

    preview(file){
        new Promise(res => {
            let ext = file.type.split("/")[1].toLowerCase();

            if(!this.allowed_format.includes(ext)) return Alert.on(".jpg .gif .png 확장자 파일만 업로드할 수 있어요!", Alert.error);
            if(file.size > this.allowed_size) return Alert.on("2MB 이하의 파일만 업로드할 수 있습니다.", Alert.error);

            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => res(reader.result);
        }).then(url => new Promise( res => {
            let image = new Image();
            image.src = url;
            image.onload = () => res(image);
        })).then( img => {
            let canvas = document.createElement("canvas");
            canvas.width = 250;
            canvas.height = 250;

            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, 250, 250);

            let url = canvas.toDataURL("image/jpeg");

            this.imagePreview.style.backgroundImage = `url(${url})`;
            this.image = url;
        });
    }

    /* Date Check
    */

    checkDate(y_m_d){ // Y-m-d 형식의 문자열
        let [, , date] = y_m_d.split("-");
        let dateObj = new Date(y_m_d);
        return dateObj.getDate() != date;
    }
}

window.addEventListener("load", () => {
    const option = new Option();
    option.eventTrigger();
});