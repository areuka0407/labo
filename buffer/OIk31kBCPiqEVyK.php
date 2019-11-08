<!--

가져오고자 하는 것은 구조 파일에 @(name) 을 통해 주석으로 저장하고,
뷰 파일에 동일한 (name)을 상하로 주석을 다는 식으로 컴포넌트를 추가할 수 있다.

-->

<!DOCTYPE html>
<html lang="ko">
<head>
    <!-- 공통적으로 들어가는 태그 => common.php 에 저장 -->
    <meta charset="UTF-8">
<title>Rabo</title>
<link rel="stylesheet" href="/css/main_style.css">
<link rel="shortcut icon" type="image⁄x-icon" href="images/profile.jpg">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="/js/app.js"></script>
    
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<link rel="stylesheet" href="/css/main_style.css">
<script src="/js/app.js"></script>
<!--/head-->
</head>
<body>
    
<video autoplay muted loop id="videobg">
    <source src="images/background_vid.mp4" type="video/mp4">
</video>

<div id="labo_home">
    <div id="load">
        <div class="nav">
            <img src="images/logo.png" alt="logo" class="logo">
            <ul>
                <?php var_dump($_SESSION['user']->"user_name") ?>
                <li><a href="#" id="login_btn">로그인</a></li>
                <li><a href="#">이용안내</a></li>
                <li><a href="#">고객센터</a></li>
            </ul>
        </div>

        <div class="font-card">
            <p class="main-font">
                PICK <br>
                TOGETHER
            </p>
            <p class="serv-font">
                최고의 색감에 대해 논하다
            </p>
        </div>

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
    </div>
</div>
<!--/contents-->
</body>
</html>