<!--head-->
<link rel="stylesheet" href="/css/option/option.css">
<script type="text/javascript" src="/js/option/Validator.js"></script>
<script type="text/javascript" src="/js/option/Option.js"></script>
<!--/head-->

<!--contents-->
    <div id="option">
        <div class="o-header">
            <a href="/option">
                <h2>사용자 설정</h2>
            </a>
        </div>
        <hr class="mb-4">
        <div class="o-side o-item hidden">
            <div class="item">
                <a href="/option/user">사용자 정보 수정</a>
            </div>
            <div class="item active">
                <a href="/option/password">비밀번호 재설정</a>
            </div>
            <div class="item">
                <a href="/option/profile-image">프로필 사진 수정</a>
            </div>
        </div>
        <div class="o-info o-item hidden">
            <input type="hidden" id="uid" value="<?=user()->id?>">
            <input type="hidden" id="user_id" value="<?=user()->user_id?>">
            <div class="form-group">
                <label for="password">새로운 비밀번호</label>
                <input type="password" id="password">
            </div>
            <div class="form-group">
                <label for="passconf">비밀번호 재확인</label>
                <input type="password" id="passconf">
            </div>
            <button class="submit-btn mt-4">
                수정 완료!
            </button>
        </div>
    </div>
<!--/contents-->