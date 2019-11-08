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
            <?php if(isset($_SESSION)){?>
                <button><<?=if(isset($_SESSION['user']))$_SESSION['user']->user_name?></button>
            <?php }?>
            <ul>
                <li><a href="#">이용안내</a></li>
                <li><a href="#">고객센터</a></li>
            </ul>
        </div>
    </div>
</div>
<!--/contents-->
</body>
</html>