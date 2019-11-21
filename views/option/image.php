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
            <div class="item">
                <a href="/option/password">비밀번호 재설정</a>
            </div>
            <div class="item active">
                <a href="/option/profile-image">프로필 사진 수정</a>
            </div>
        </div>
        <div class="o-image o-item hidden">
            <input type="hidden" id="uid" value="<?=user()->id?>">
            <input type="hidden" id="user_id" value="<?=user()->user_id?>">
            <label for="upload-image">프로필 이미지</label>
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

            <div class="help-message mt-3">※ 적정 사이즈: 80px × 80px</div>
            <div class="help-message mt-1">※ 이미지 사이즈는 자동으로 조정됩니다.</div>
            <button class="submit-btn mt-2">수정 완료!</button>
        </div>
    </div>
<!--/contents-->