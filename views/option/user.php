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
            <div class="item active">
                <a href="/option/user">사용자 정보 수정</a>
            </div>
            <div class="item">
                <a href="/option/password">비밀번호 재설정</a>
            </div>
            <div class="item">
                <a href="/option/profile-image">프로필 사진 수정</a>
            </div>
        </div>
        <div class="o-info o-item hidden">
            <input type="hidden" id="uid" value="<?=user()->id?>">
            <div class="form-group">
                <label>아이디</label>
                <input type="text" id="user_id" value="<?=user()->user_id?>" readonly>
            </div>
            <div class="form-group">
                <label for="user_name">이름</label>
                <input type="text" id="user_name" value="<?=user()->user_name?>">
            </div>
            <div class="form-group">
                <label for="birthday-Y">생년월일</label>
                <div class="y-m-d">
                    <input type="text" id="birthday-Y" value="<?=user()->y_m_d === "0000-00-00" ? "" : date("Y", strtotime(user()->y_m_d))?>">
                    <span>년</span>
                    <input type="text" id="birthday-M" value="<?=user()->y_m_d === "0000-00-00" ? "" : date("m", strtotime(user()->y_m_d))?>">
                    <span>월</span>
                    <input type="text" id="birthday-D" value="<?=user()->y_m_d === "0000-00-00" ? "" : date("d", strtotime(user()->y_m_d))?>">
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
            <button class="submit-btn mt-4">수정 완료!</button>
        </div>
    </div>
<!--/contents-->