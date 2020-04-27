// app.js
window.onload = function () {
    var state = 0;
    var wrap = `<div id='wrap'></div>`;
    $("body").append(wrap);
    let session;
    let loginA=`<li class="login_b" id="login_nav"><a href="#" id="login_btn">로그인</a></li>
                <li class="login_b" id="join_nav"><a href="/join/agree" id="join_btn">회원가입</a></li>`;
     $(".nav ul").prepend(loginA);
    let loginA2=`<div class="login_b font-card" id="font-card">
                    <p class="main-font">
                        PICK <br>
                        TOGETHER
                    </p>
                    <p class="serv-font">
                        최고의 색감에 대해 논하다
                    </p>
                </div>
                    
                    <div class="login_b">
                        <div class="login-card" onclick="location.assign('/join/agree')">
                            회원가입하여 <br>
                            콘텐츠를 즐겨보세요!
                            <img src="images/logincard.png" alt="login" width="170" height="170">
                        </div>
                        
                        <div class="hidden">
                            <div class="login">
                                <img src="images/Blogo.png" alt="logo" class="login-logo">
                                <p id="error_login"></p>
                                <p class="login-text">아이디</p>
                                <input type="text" class="loginId" name="loginId" placeholder="아이디를 입력해주세요">
                                <p class="pass-text">비밀번호</p>
                                <input type="password" class="loginPw" name="loginPw" placeholder="비밀번호를 입력해주세요">
                                
                                <input type="submit" id="submit" value="로그인">
                                
                                <a href="/join/agree" class="FAccount1">회원가입</a>
                                <span class="line">/</span>
                                <a href="#" class="FAccount2"><img src="images/question-circle.png" alt="question-circle" width="16"
                                                                   height="16">계정에 로그인 할 수 없습니까?</a>
                            </div>
                        </div>
                    </div>`;
    $("#load").append(loginA2);

    let loginDOM = `<a href="/colors/picker" class="login_a" id="play_button">
                        <img src="images/playbutton.png" alt="play" id="play" width="250" height="250">
                    </a>
                    <span class="login_a user-account">
                        <a href="#" id="login_user_name"></a>님 반갑습니다
                    </span>
                    <li class="login_a"><a href="home.php" id="logout">로그아웃</a></li>`;
    $(".nav ul").prepend(loginDOM);
    $(".login_a").css("display","none");
    $(".login_b").css("display","none");
    s();
    $("#wrap").hide();
    $(".login").css("top", "-50%");
    $(".login").css("display", "none");
    $("#login_btn").on("click", function slide_down(e) {
        $(".loginId").val("");
        $(".loginPw").val("");
        state = 1;
        $(".hidden").show();
        $(".login").css({"display":"flex","top":"-50%"});
        $(".login").animate({top: "50%"}, 900);
        $("#wrap").fadeIn();
    });

    $("#wrap").on("click", function slide_up(e) {
        if (state) {
            if (e.target.className !== "login" && e.target.className !== "loginId" && e.target.className !== "loginPw" && e.target.id !== "submit" && e.target.className !== "FAccount1" && e.target.className !== "FAccount2" && e.target.className !== "google" && e.target.className !== "login-text" && e.target.className !== "pass-text") {
                $(".login").animate({top: "-50%"}, 900);
                $("#wrap").fadeOut();
            }
            state = 0;
        }
    });
    // login
    $(".login").on("keydown",function (e){if(e.key == "Enter") $("#submit").click();})
    $("#submit").on("click",function (){
        if($(".loginId").val().trim() == "" || $(".loginPw").val().trim() == "") return Alert.on("로그인 정보를 입력해 주세요!", Alert.error);
        if(session) return Alert.on("이미 로그인 중입니다!", Alert.error);
        $.ajax({
            url:"/users/login",
            type:"POST",
            data:{"ID":$(".loginId").val(),"PW":$(".loginPw").val()},
            datatype:"json",
            success:function(result){
                result=$.parseJSON(result);
                if(result){
                    $("#error_login").text("");
                    $("#wrap").fadeOut(function(){
                        $(".login").fadeOut(function(){
                            $("#loginId").text("");
                            $("#loginPw").text("");
                            if(!session)s();
                        });
                    });
                }else Alert.on("아이디 또는 비밀번호가 일치하지 않습니다…", Alert.error);
                    
            }
            // error:function(request,status,error){
            //     console.log(request);
            //     console.log(status);
            //     console.log(error);
            // }
        });
    });
     
    $("#logout").on("click",function(e){
        if(session){
            e.preventDefault();
            $.ajax({
                url:"/users/logout",
                method:"POST",
                success:function(result){
                    // location.reload();
                    if(session)s();
                }
            });
        }
    });

    function s(){
        $.ajax({
            url:"/users/session",
            method:"POST",
            success:function(result){
                session=$.parseJSON(result);
                if(!session){
                    $(".login_a").fadeOut(function(){$(".login_b").fadeIn(function(){$("#login_user_name").text("");});});   
                }else{
                    $(".login_b").fadeOut(function(){$(".login_a").fadeIn();});
                    $("#login_user_name").text(session.user_name);
                }
            }
        });
    }

    $("#click_start").on("click",function(){
        $(this).css("pointer-events", "none");
        $("#font-card").fadeOut();
        $("#play_button").fadeIn();
    });

    $("#login_nav").css({"position":"absolute","right":"500px"});
}