<!--head-->
<link rel="stylesheet" href="/css/colors/search.css">
<link rel="stylesheet" href="/css/colors/keysearch.css">
<script src="/js/colors/Keysearch.js" type="text/javascript"></script>
<script src="/js/colors/search/Search.js" type="text/javascript"></script>
<script src="/js/colors/Color.js" type="text/javascript"></script>
<!--/head-->

<!--contents-->
<aside>
    <div class="search-area">
        <p class="help-message">※ 띄어쓰기를 통해 여러 태그를 동시에 검색해 보세요!</p>
        <div class="search">
            <input type="text" id="search-bar" placeholder="검색어를 입력하세요" data-type="tag">
            <button id="search-btn">
                <svg color="#ffffff" viewBox="0 0 20 20" width="20" height="20">
                    <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z">
                </svg>
            </button>
        </div>
    </div>
    <div class="search-option">
        <input type="radio" id="s-option-tags" name="s-option" value="tags" hidden checked>
        <div class="item">
            <label for="s-option-tags" class="name">태그 명</label>
            <label for="s-option-tags" class="radio-box"></label>
        </div>
        <input type="radio" id="s-option-username" name="s-option" value="user_name" hidden>
        <div class="item">
            <label for="s-option-username" class="name">생성자 명</label>
            <label for="s-option-username" class="radio-box"></label>
        </div>
    </div>
    <hr class="mb-0">
    <div id="filter">
        <div class="filter-area">
            <div class="filter-title">
                <span>색상(Colors)</span>
            </div>
            <div id="color-box" class="filter-list">
                <div class="item" data-color="red">
                    <div class="name">빨강(Red)</div>
                    <div class="color" style="background-color: red"></div>
                </div>
                <div class="item" data-color="yellow">
                    <div class="name">노랑(Yellow)</div>
                    <div class="color" style="background-color: yellow"></div>
                </div>
                <div class="item" data-color="blue">
                    <div class="name">파랑(Blue)</div>
                    <div class="color" style="background-color: blue"></div>
                </div>
                <div class="item" data-color="cyan">
                    <div class="name">비취(Cyan)</div>
                    <div class="color" style="background-color: cyan"></div>
                </div>
                <div class="item" data-color="green">
                    <div class="name">초록(Green)</div>
                    <div class="color" style="background-color: green"></div>
                </div>
                <div class="item" data-color="magenta">
                    <div class="name">자홍(Magenta)</div>
                    <div class="color" style="background-color: magenta"></div>
                </div>
                <div class="item" data-color="gray">
                    <div class="name">무채색(Achromatic)</div>
                    <div class="color" style="background-color: gray"></div>
                </div>
            </div>
        </div>
        <div class="filter-area">
            <div class="filter-title">
                <span>태그(Tags)</span>
                <button id="filter-order" class="DESC">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-down" class="svg-inline--fa fa-sort-down fa-w-10" role="img" viewBox="0 0 320 512"><path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"/></svg>
                </button>
            </div>
            <div id="tag-box" class="filter-list">
            </div>
        </div>
    </div>
</aside>
<section>
    <header>
        <div class="title">
            <p>당신이 생각하는 <span>최고의 색 조합(Color Collaboration)</span>을 찾아 보세요!</p>
        </div>
        <div class="tool-bar">
            <select id="orderBy">
                <option value="day-ASC">생성한 날짜: 오름차순</option>
                <option value="day-DESC">생성한 날짜: 내림차순</option>
                <option value="good-ASC">좋아요: 오름차순</option>
                <option value="good-DESC">좋아요: 내림차순</option>
            </select>
        </div>
    </header>
    <article>
    
        
    </article>
</section>
<!--/contents-->
