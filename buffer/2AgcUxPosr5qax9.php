<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
<title>Rabo</title>
<link rel="shortcut icon" type="image⁄x-icon" href="/images/Clogo.png">
<link rel="stylesheet" href="/css/alert.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="/js/Alert.js" type="text/javascript"></script>
<script src="/js/Style.js" type="text/javascript"></script>
    <link rel="stylesheet" href="/css/colors/general.css">
    <script src="/js/colors/Login.js" type="text/javascript"></script>
    
<link rel="stylesheet" href="/css/option/home.css">
<script type="text/javascript" src="/js/option/Option.js"></script>
<!--/head-->
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
    
    <div id="option">
        <div class="o-header">
            <h2>사용자 설정</h2>
        </div>
        <hr class="mb-2">
        <div class="o-image">
            <input type="file" id="upload-image" hidden>
            <div class="profile-image">
                <label for="upload-image" class="preview" style="background-image: url(<?=user()->image ? "/images/users/".user()->image : "/images/default-userprofile.png"?>)"></label>
                <div class="icon-area">
                    <label for="upload-image" class="edit">
                        <svg class="gUZ B9u U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M13.386 6.018l4.596 4.596L7.097 21.499 1 22.999l1.501-6.096L13.386 6.018zm8.662-4.066a3.248 3.248 0 0 1 0 4.596L19.75 8.848 15.154 4.25l2.298-2.299a3.248 3.248 0 0 1 4.596 0z"></path></svg>
                    </label>
                </div>
            </div>
            
            <div id="dropdown-area">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="far" data-icon="images" class="svg-inline--fa fa-images fa-w-18" role="img" viewBox="0 0 576 512"><path fill="currentColor" d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"/></svg>
                </div>
                <p>업로드할 이미지를 끌어 놓으세요!</p>
            </div>
        </div>
        <div class="o-info">
            <div class="form-group">
                <label>아이디</label>
                <input type="text" id="user_id" value="<?=user()->user_id?>" readonly>
            </div>
            <div class="form-group">
                <label for="user_name">이름</label>
                <input type="text" id="user_name" value="<?=user()->user_name?>">
            </div>
            <div class="form-group">
                <label for="password">비밀번호</label>
                <input type="password" id="password">
            </div>
            <div class="form-group">
                <label for="birthday-Y">생년월일</label>
                <div class="y-m-d">
                    <?php dd(user()->y_m_d);?>
                    <input type="text" id="birthday-Y" value="<?=date("Y", strtotime(user()->y_m_d))?>">
                    <span>년</span>
                    <input type="text" id="birthday-M" value="<?=date("m", strtotime(user()->y_m_d))?>">
                    <span>월</span>
                    <input type="text" id="birthday-D" value="<?=date("d", strtotime(user()->y_m_d))?>">
                    <span>일</span>
                </div>
            </div>
            <div class="form-group">
                <label for="gender">성별</label>
                <select id="gender">
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                    <option value="none">밝히고 싶지 않음</option>
                </select>
            </div>
            <button class="submit-btn">
                수정하기
            </button>
        </div>
    </div>
<!--/contents-->
</div>
</body>
</html>