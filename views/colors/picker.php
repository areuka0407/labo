<!--head-->
<link rel="stylesheet" href="/css/colors/picker.css">
<link rel="stylesheet" href="/css/colors/keysearch.css">
<script src="/js/colors/Keysearch.js" type="text/javascript"></script>
<script src="/js/colors/picker/Viewer.js" type="text/javascript"></script>
<script src="/js/colors/picker/Canvas.js" type="text/javascript"></script>
<script src="/js/colors/picker/Cursor.js" type="text/javascript"></script>
<script src="/js/colors/picker/Tags.js" type="text/javascript"></script>
<script src="/js/colors/picker/ColorPicker.js" type="text/javascript"></script>
<!--/head-->

<!--contents-->
<div class="contents">
    <div id="colorPicker"></div>
    <div id="color-form">
        <p class="help-message">완성한 색들을 그룹으로 분류하여 저장해 보세요!</p>
        <div id="group-box">
            <select id="myGroups"<?=!user() ? " disabled" : ""?>></select>
<<<<<<< HEAD
=======
            <button class="group-add">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
            </button>
>>>>>>> 7481e3f... Tab 기능 추가
        </div>
        <p class="help-message">자유롭게 당신의 색을 표현할 수 있는 태그를 작성해 보세요!</p>
        <div id="tag-box"<?=!user() ? " class='disabled'" : ""?>>
            <div class="input-box">
                <span class="prefix">#</span>
                <input type="text" class="output" hidden>
                <input type="text" class="input" placeholder="봄_느낌">    
            </div>
        </div>
        <div class="save-help<?=user() ? "" : " hidden"?>">
            <p class="help-message">저장한 목록은 <span class="text-accent">보관함</span>에서 확인하세요!</p>
            <button id="submit">저장하기</button>
        </div>
        <div class="guest-help<?=!user() ? "" : " hidden"?>">
            <p class="help-message">이미 계정이 있으신가요? <span class="login-span text-accent">로그인하기</span></p>
            <a href="/join/agree" class="join-btn">가입후 저장</a>
        </div>
    </div>
    
</div>
<div id="view">
    <ul>
        <li class="box">
            <div class="color-box FF8087"></div>
            <ul class="code-box">
                <li class="HEX">
                    #<input type="text" value="FF8087" maxlength="6" class="hex" spellcheck="false" readonly>
                </li>
                <li class="R">
                    R :<input type="text" value="255" maxlength="3" class="rgba" readonly>
                </li>
                <li class="G">
                    G :<input type="text" value="128" maxlength="3" class="rgba" readonly>
                </li>
                <li class="B">
                    B :<input type="text" value="135" maxlength="3" class="rgba" readonly>
                </li>
                <li class="brightness">
                    <canvas></canvas>
                    <div class="select"></div>
                </li>
            </ul>
        </li>

        <li class="box">
            <div class="color-box E874B4"></div>
            <ul class="code-box">
                <li class="HEX">
                    #<input type="text" value="E874B4" maxlength="6" class="hex" spellcheck="false" readonly>
                </li>
                <li class="R">
                    R :<input type="text" value="232" maxlength="3" class="rgba" readonly>
                </li>
                <li class="G">
                    G :<input type="text" value="116" maxlength="3" class="rgba" readonly>
                </li>
                <li class="B">
                    B :<input type="text" value="190" maxlength="3" class="rgba" readonly>
                </li>
                <li class="brightness">
                    <canvas></canvas>
                    <div class="select"></div>
                </li>
            </ul>
        </li>

        <li class="box">
            <div class="color-box E874B4"></div>
            <ul class="code-box">
                <li class="HEX">
                    #<input type="text" value="E874B4" maxlength="6" class="hex" spellcheck="false" readonly>
                </li>
                <li class="R">
                    R :<input type="text" value="232" maxlength="3" class="rgba" readonly>
                </li>
                <li class="G">
                    G :<input type="text" value="116" maxlength="3" class="rgba" readonly>
                </li>
                <li class="B">
                    B :<input type="text" value="190" maxlength="3" class="rgba" readonly>
                </li>
                <li class="brightness">
                    <canvas></canvas>
                    <div class="select"></div>
                </li>
            </ul>
        </li>

        <li class="box">
            <div class="color-box FB8CFF"></div>
            <ul class="code-box">
                <li class="HEX">
                    #<input type="text" value="FB8CFF" maxlength="6" class="hex" spellcheck="false" readonly>
                </li>
                <li class="R">
                    R :<input type="text" value="251" maxlength="3" class="rgba" readonly>
                </li>
                <li class="G">
                    G :<input type="text" value="140" maxlength="3" class="rgba" readonly>
                </li>
                <li class="B">
                    B :<input type="text" value="255" maxlength="3" class="rgba" readonly>
                </li>
                <li class="brightness">
                    <canvas></canvas>
                    <div class="select"></div>
                </li>
            </ul>
        </li>
        <li class="box">
            <div class="color-box C474E8"></div>
            <ul class="code-box">
                <li class="HEX">
                    #<input type="text" value="C474E8" maxlength="6" class="hex" spellcheck="false" readonly>
                </li>
                <li class="R">
                    R :<input type="text" value="196" maxlength="3" class="rgba" readonly>
                </li>
                <li class="G">
                    G :<input type="text" value="116" maxlength="3" class="rgba" readonly>
                </li>
                <li class="B">
                    B :<input type="text" value="232" maxlength="3" class="rgba" readonly>
                </li>
                <li class="brightness">
                    <canvas></canvas>
                    <div class="select"></div>
                </li>
            </ul>
        </li>
    </ul>
</div>
<div id="option">
    <div id="pick-option" class="option-box">
        <h2 class="option-title">팔레트 선택</h2>
        <div class="help-message">어떤 색을 선택할 지 고르세요!</div>
        <hr>
        <!-- 유사색 -->
        <input type="radio" id="p-similar" name="pick" value="similar" hidden checked>
        <div class="item">
            <label for="p-similar" class="text">유사색</label>
            <label for="p-similar" class="radio"></label>
            <div class="hidden-message">색상 간에 대비가 낮아<br>어떤 곳에도 어울립니다.</div>
        </div>
        <!-- 단색 -->
        <input type="radio" id="p-simple" name="pick" value="simple" hidden>
        <div class="item">
            <label for="p-simple" class="text">단색</label>
            <label for="p-simple" class="radio"></label>
            <div class="hidden-message">동일한 채도를 사용하여<br>단순한 색감을 표현합니다.</div>
        </div>
        <!-- 보색 -->
        <input type="radio" id="p-complete" name="pick" value="complete" hidden>
        <div class="item">
            <label for="p-complete" class="text">보색</label>
            <label for="p-complete" class="radio"></label>
            <div class="hidden-message">강한 대비색으로 강렬하고<br>화려한 느낌을 표현합니다.</div>
        </div>
        <!-- 약보색 -->
        <input type="radio" id="p-little" name="pick" value="little" hidden>
        <div class="item">
            <label for="p-little" class="text">약보색</label>
            <label for="p-little" class="radio"></label>
            <div class="hidden-message">약한 대비색으로 강하게<br>원하는 곳을 강조합니다.</div>
        </div>
        <!-- 삼보색 -->
        <input type="radio" id="p-trio" name="pick" value="trio" hidden>
        <div class="item">
            <label for="p-trio" class="text">삼보색</label>
            <label for="p-trio" class="radio"></label>
            <div class="hidden-message">균등한 간격으로 위치한 색상으로<br>조화로운 배색이 가능합니다.</div>
        </div>
        <!-- 사용자 지정 -->
        <input type="radio" id="p-none" name="pick" value="none" hidden>
        <div class="item">
            <label for="p-none" class="text">사용자 지정</label>
            <label for="p-none" class="radio"></label>
            <div class="hidden-message">사용자 임의대로 배색합니다.<br>자유롭게 색상을 선택하세요!</div>
        </div>
    </div>
    <div id="color-option" class="option-box">

    </div>
</div>

<script>
    window.onload=function(){
        const option = {
            picker: "#colorPicker",
            viewerBox: ".box",
            viewColor: ".color-box",
            viewHex: ".hex",
            viewR: ".R > input",
            viewG: ".G > input",
            viewB: ".B > input",
            brightness: ".brightness",
            option: "#pick-option"
        };
        const app = new ColorPicker(option);
    }
</script>
<!--/contents-->