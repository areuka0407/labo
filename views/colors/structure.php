<!DOCTYPE html>
<html lang="ko">
<head>
    <!--#common-->
    <link rel="stylesheet" href="/css/colors/general.css">
    <script src="/js/colors/Login.js" type="text/javascript"></script>
    <!--@head-->
</head>
<body>
<div class="wrapper">
    <div class="header">
        <a href="/">
            <img src="/images/Tlogo.png" alt="logo" height="30">
        </a>
        <ul class="nav middle">
            <li><a id="nav-picker" href="/colors/picker">조합기</a></li>
            <li><a id="nav-search" href="/colors/search">검색창</a></li>
            <li><a id="nav-storage" href="/colors/storage">보관함</a></li>
        </ul>
        <ul class="nav right">
            <?php if(!isset($_SESSION['user'])): ?>
                <li class="btn-login"><a href="#" data-tooltip-text="로그인">로그인</a></li>
                <li class="btn-join"><a href="/join/agree" data-tooltip-text="회원가입">회원가입</a></li>
            <?php else: ?>
                <li class="user-name text-accent"><?= $_SESSION['user']->user_name ?></li>
                <li class="btn-logout"><a data-tooltip-text="로그아웃">로그아웃</a></li>
            <?php endif; ?>

            <li><a href="/guide" data-tooltip-text="이용안내">이용안내</a></li>
        </ul>
    </div>
    <!--@contents-->
</div>
</body>
</html>