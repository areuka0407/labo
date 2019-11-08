// app.js
window.onload = function () {
    var state = 0;
    var wrap = `<div id='wrap'></div>`;
    $("body").append(wrap);
    let session;
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
    $("#submit").on("click",function (){
        if($(".loginId").val()!==""&&$(".loginPw").val()!==""&&!session){
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
                    }else $("#error_login").text($.parseJSON(result));
                        
                }
                // error:function(request,status,error){
                //     console.log(request);
                //     console.log(status);
                //     console.log(error);
                // }
            });
        }
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
                let loginA=`<li class="login_b"><a href="#" id="login_btn">로그인</a></li>`;
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
                                            <img src="images/logo-black.png" alt="logo" class="login-logo">
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
                                            
                                            <div class="google">
                                                <img src="images/google.jpg" alt="google_img" width="50" height="50">
                                                <p>Sign up with Google</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                $("#load").append(loginA2);

                let loginDOM = `<a href="#" class="login_a" id="play_button">
                                    <img src="images/playbutton.png" alt="play" id="play" width="250" height="250">
                                </a>
                                <span class="login_a user-account">
                                    <a href="#" id="login_user_name"></a>님 반갑습니다
                                </span>
                                <li class="login_a"><a href="home.php" id="logout">로그아웃</a></li>`;
                $(".nav ul").prepend(loginDOM);
                if(!session){
                    $(".login_a").fadeOut(function(){$(".login_b").fadeIn(function(){
                        $("#login_user_name").text("");
                        $(".login_a").remove();
                    });});   
                }else{
                    $(".login_b").fadeOut(function(){
                        $(".login_a").fadeIn();
                        $(".login_b").remove()
                    });
                    $("#login_user_name").text(session);
                }
            }
        });
    }

    $("#click_start").on("click",function(){
        $("#font-card").fadeOut();
        $("#play_button").fadeIn();
    });
    // $("#good").css("z-index",100);
    // $("#good").on("click",function(){
    //     $.ajax({
    //         //나중에 해야됨
    //         url:"/users/good/5",
    //         method:"GET",
    //         success:function(result){
    //             console.log(result);
    //             if(result == "good insert") $("#good").css("color","red");
    //             else $("#good").css("color","black");
    //         }
    //     });
    // });
}