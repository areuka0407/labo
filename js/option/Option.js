class Option {
    constructor(){
        this.allowed_size = 1024 * 1024 * 2;
        this.allowed_format = ["jpg", "jpeg", "gif", "png"];

        this.image = null;
        this.imageBox = document.querySelector(".o-image");
        this.dropBox = document.querySelector("#dropdown-area");
        this.imagePreview = document.querySelector(".preview")
        this.imageInput = document.querySelector("#upload-image");
        this.form = {
            user_id: document.querySelector("#user_id"),
            user_name: document.querySelector("#user_name"),
            user_pass: document.querySelector("#password"),
            birth_y: document.querySelector("#birthday-Y"),
            birth_m: document.querySelector("#birthday-M"),
            birth_d: document.querySelector("#birthday-D"),
            gender: document.querySelector("#gender")
        };
        this.submit = document.querySelector(".submit-btn");
    }

    eventTrigger(){
        this.imagePreview.addEventListener("drop", e => e.preventDefault());
        this.imagePreview.addEventListener("dragover", e => e.preventDefault());
        this.imageBox.addEventListener("dragover", e => e.preventDefault());

        this.imageBox.addEventListener("drop", e => {
            e.preventDefault();
            e.stopPropagation();

            this.preview(e.dataTransfer.files[0]);
            $(this.dropBox).hide();
        });

        window.addEventListener("dragenter", e => {
            e.preventDefault();
            e.stopPropagation();
            $(this.dropBox).fadeIn();
        });

        window.addEventListener("dragleave", e => {
            e.preventDefault();
            e.stopPropagation();

            let from = e.fromElement;
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

        this.submit.addEventListener("click", () => {
            let form = {
                user_name: this.form.user_name.value,
                password: this.form.user_pass.value,
                y_m_d: `${this.form.birth_y.value}-${this.form.birth_m.value}-${this.form.birth_d.value}`,
                gender: this.form.gender.value,
                image: this.image
            };
            
            let xhr = new XMLHttpRequest();
            xhr.open("PUT", "/users");
            xhr.send(JSON.stringify(form));
            xhr.onload = () => {
                let result = xhr.responseText;
                console.log(result);
            };
            xhr.onerror = () => console.error(xhr.response);
        });
    }

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
}

window.addEventListener("load", () => {
    const option = new Option();
    option.eventTrigger();
});