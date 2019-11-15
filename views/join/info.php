<!--head-->
<!--/head-->

<!--contents-->
<div id="info">
    <a href="/join/agree" class="join_check_next"><img src="/images/left-arrow-true.png" alt="left-arrow" id="left-arrow"></a>
    <a href="/join/success" class="join_check_next"><img src="/images/right-arrow-false.png" alt="right-arrow" id="right-arrow"></a>

    <div class="container_2">
        <form class="join_form">
            <img src="/images/Clogo.png" alt="logo" height="100" class="logo">

            <!--프로필사진-->

            <label for="join-loginId" class="label">아이디</label>
            <input type="text" id="join-loginId" class="input" maxlength="20" required>

            <label for="join-loginPw" class="label">비밀번호</label>
            <input type="password" id="join-loginPw" class="input"  minlength="8" required>

            <label for="join-loginPwRe" class="label">비밀번호 재확인</label>
            <input type="password" id="join-loginPwRe" class="input"  minlength="8" placeholder="비밀번호와 정확히 일치시켜주세요" required>

            <label for="nickname" class="label">이름</label>
            <input type="text" class="input" id="nickname" required>
            
            <label for="year" class="label">생년월일 <span class="choice">(선택)</span></label>
            <div class="y-m-d">
                <select name="year" id="year">
                    <option value="">연도</option>
                </select>
                <select name="month" id="month">
                    <option value="">월</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                <select name="day" id="day">
                    <option value="">일</option>
                </select>
            </div>

            <label for="gender" class="label">성별 <span class="choice">(선택)</span></label>
            <select name="gender" id="gender">
                <option value="">성별</option>
                <option value="male">남자</option>
                <option value="female">여자</option>
                <option value="hidden">밝히고 싶지 않음</option>
            </select>

            <!--메일인증-->

            <!--계정찾기힌트-->
            <footer>
                Copyright&copy; 2019. 수원정보과학고등학교. All Rights Reserved.
            </footer>
        </form>
    </div>
</div>
<!--/contents-->