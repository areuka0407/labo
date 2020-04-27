<!--head-->
<link rel="stylesheet" href="/css/colors/picker.css">
<script src="/js/colors/picker/Viewer.js" type="text/javascript"></script>
<script src="/js/colors/picker/Canvas.js" type="text/javascript"></script>
<script src="/js/colors/picker/Cursor.js" type="text/javascript"></script>
<script src="/js/colors/picker/Tags.js" type="text/javascript"></script>
<script src="/js/colors/Keysearch.js" type="text/javascript"></script>
<script src="/js/colors/picker/ColorPicker.js" type="text/javascript"></script>
<!--/head-->

<!--contents-->
<div class="contents">
    <div class="option-tab">
        <div class="option">
            <input type="radio" id="type-auto" name="type" value="1" checked hidden>
            <label for="type-auto">자동 선택</label>
            <label for="type-auto" class="radio">
                <div></div>
            </label>
        </div>
        <div class="option">
            <input type="radio" id="type-passive" name="type" value="0" hidden>
            <label for="type-passive">수동 선택</label>
            <label for="type-passive" class="radio">
                <div></div>
            </label>
        </div>
    </div>
    <div id="colorPicker"></div>

    <p class="help-message">
        자유롭게 당신의 색을 표현할 수 있는 태그를 작성해 보세요!
    </p>
    <div id="tag-box">
        <div class="input-box">
            <span class="prefix">#</span>
            <input type="text" class="output" hidden>
            <input type="text" class="input" placeholder="봄_느낌">    
        </div>
    </div>
    <button id="submit">저장하기</button>
</div>
<div class="container">
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
            option: ".option-tab"
        };
        const app = new ColorPicker(option);
        const tags = new Tags("#tag-box");
    }
</script>
<!--/contents-->