class Alert {
    static info = "#31E773";
    static error = "#EE4949";

    static create(message){
        let elem = document.createElement("div");
        elem.classList.add("alert-message")
        elem.innerText = message;
        
        let style = {
            position: "fixed",
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            // backgroundColor: "#EE4949",
            color: "#ffffff",
            borderRadius: "10px",
            display: "inline",
            padding: "10px 20px",
            textAlign: "center",
            transition: "top 5s, opacity 1s",
            fontWeight: "bold",
            fontSize: "1.2em",
            zIndex: "100000"
        };
        Style.setStyle(elem, style);
        return elem;
    }

    static on(message, type = Alert.info, callBack = null){
        if(document.querySelector(".alert-message")) return;
        
        let elem = Alert.create(message);
        elem.style.backgroundColor = type;
        
        document.body.append(elem);
        setTimeout(() => {
            elem.style.top = "80px";
            elem.style.opacity = "0";
            setTimeout(() => {
                elem.remove();
                callBack && callBack();
            }, 1000);
        }, 500);
    }

    static confirm(message, callBack = null, applyText = "예", cancelText = "아니오"){
        if(document.querySelector(".alert-message")) return;

        let elem = Alert.create();
        elem.classList.add("confirm");
        Style.setStyle(elem, "backgroundColor", Alert.error);

        elem.innerHTML =`<div class="w-100 pt-3 pl-3 pr-3">
                            <p>${message}</p>
                        </div>
                        <div class="w-100 mt-2 flex">
                            <button class="btn-apply">${applyText}</button>
                            <button class="btn-cancel">${cancelText}</button>
                        </div>`;
        elem.querySelector(".btn-apply").addEventListener("click", function(){
            callBack && callBack();
            this.parentElement.parentElement.remove();
        });

        elem.querySelector(".btn-cancel").addEventListener("click", function(){
            this.parentElement.parentElement.remove();
        });

        document.body.append(elem);
        
    }

    static prompt(message, callBack = null, applyText = "확인", canelText = "취소"){
        
    }
}