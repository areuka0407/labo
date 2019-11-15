class Login {
    constructor(){
        this.userdata = null;
        this.elemNav = document.querySelector(".nav.right");
        this.elemLoginBtn = this.create(`<li class="btn-login"><a href="#" data-tooltip-text="로그인">로그인</a></li>`);
        this.elemJoinBtn = this.create(`<li class="btn-join"><a href="/join/agree" data-tooltip-text="회원가입">회원가입</a></li>`);
        this.elemLogoutBtn = this.create(`<li class="btn-logout"><a data-tooltip-text="로그아웃">로그아웃</a></li>`);
        this.elemUName = this.create(`<li class="user-name text-accent"></li>`);
        this.elemLoginArea = this.create(`<div class="login-wrap" style="display: none;">
                                            <div class="login">
                                                <img src="/images/Blogo.png" alt="logo" class="login-logo">
                                                <p id="error_login"></p>
                                                <p class="login-text">아이디</p>
                                                <input type="text" class="loginId" name="loginId" placeholder="아이디를 입력해주세요">
                                                <p class="pass-text">비밀번호</p>
                                                <input type="password" class="loginPw" name="loginPw" placeholder="비밀번호를 입력해주세요">
                                                
                                                <input type="submit" class="submit" value="로그인">
                                                
                                                <a href="/join/agree" class="FAccount1">회원가입</a>
                                                <span class="line">/</span>
                                                <a href="#" class="FAccount2"><img src="/images/question-circle.png" alt="question-circle" width="16"
                                                                                height="16">계정에 로그인 할 수 없습니까?</a>
                                                <div class="google">
                                                    <img src="/images/google.jpg" alt="google_img" width="50" height="50">
                                                    <p>Sign up with Google</p>
                                                </div>
                                            </div>
                                        </div>`);

            
        this.eventTrigger();
    }

    init(){
        let nowPage = location.pathname.split("/")[2];
        if(nowPage === "picker") document.querySelector("#nav-picker").classList.add("active");
        else if(nowPage === "search") document.querySelector("#nav-search").classList.add("active");
        else if(nowPage === "storage") document.querySelector("#nav-storage").classList.add("active");
        
        new Promise( res => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/users/session");
            xhr.send();
            xhr.onload = () => res(xhr.responseText);
            xhr.onerror = () => console.error("ERROR", xhr.response);
        }).then( data => {
            data = JSON.parse(data);
            this.userdata = data ? data : null;

            this.elemLoginBtn.remove();
            this.elemLogoutBtn.remove();
            this.elemLoginArea.remove();
            this.elemJoinBtn.remove();
            this.elemUName.remove();
            if(this.userdata){
                this.elemUName.innerText = this.userdata.user_name;
                this.elemNav.prepend(this.elemLogoutBtn);
                this.elemNav.prepend(this.elemUName);
            }  
            else {
                this.elemNav.prepend(this.elemJoinBtn);
                this.elemNav.prepend(this.elemLoginBtn);
            }
        });
    }

    create(innerHTML){
        let box = document.createElement("div");
        box.innerHTML = innerHTML;
        return box.firstChild;
    }

    eventTrigger(){
        // Nav의 유저명을 클릭하면 해당 유저의 보관함으로 이동함
        this.elemUName.addEventListener("click", e => {
            e.preventDefault();
            if(this.userdata === null) return false;
            location.assign("/colors/storage/"+this.userdata.user_id);
        });

        
        // Nav의 로그인 버튼을 누르면 로그인 탭이 열림
        this.elemLoginBtn.addEventListener("click", () => { 
            this.elemLoginArea.querySelector(".loginId").value = null;
            this.elemLoginArea.querySelector(".loginPw").value = null;
            document.body.append(this.elemLoginArea);
            $(this.elemLoginArea).fadeIn(500);
        });
        // 로그인 탭의 배경을 누르면 로그인 탭이 닫힘
        this.elemLoginArea.addEventListener("click", function(e){ 
            if(this === e.target) $(this).fadeOut(500, () => this.remove());
        });

        let login = () => {
            let id = this.elemLoginArea.querySelector(".loginId").value;
            let pw = this.elemLoginArea.querySelector(".loginPw").value;

            if(id.trim() === "") return Alert.on("아이디를 입력하세요!", Alert.error);
            if(pw.trim() === "") return Alert.on("비밀번호를 입력하세요!", Alert.error);

            let form = new FormData();
            form.append("ID", id);
            form.append("PW", pw);
            
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/users/login");
            xhr.send(form);
            xhr.onload = () => {
                let res = JSON.parse(xhr.responseText);
                if(res) {
                    $(this.elemLoginArea).fadeOut(500, () => this.elemLoginArea.remove());
                    this.init();
                }
                else Alert.on("해당 회원 정보와 일치하는 회원이 없어요…", Alert.error);
                
            }
        };
        this.elemLoginArea.querySelector(".loginId").addEventListener("keydown", e => e.keyCode === 13 && login());
        this.elemLoginArea.querySelector(".loginPw").addEventListener("keydown", e => e.keyCode === 13 && login());

        //로그인 탭의 로그인 버튼을 누르면 로그인이 됨.
        this.elemLoginArea.querySelector(".submit").addEventListener("click", login);

        // Nav의 로그아웃 버튼을 누를 시 로그아웃이 됨
        this.elemLogoutBtn.addEventListener("click", () => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/users/logout");
            xhr.send();
            xhr.onload = () => this.init();
        });


        // 보관함을 누를 때 로그인이 되어 있지 않다면, 에러메세지 출력
        document.querySelector("#nav-storage").addEventListener("click", e => {
            e.preventDefault();
            if(this.userdata === null){
                Alert.on("로그인 후 이용할 수 있어요….", Alert.error);
                return false;
            }
            else location.assign("/colors/storage/"+this.userdata.user_id);
            
        });
    }
}


window.addEventListener("load", function(){
    const login = new Login();
    login.init();
});
