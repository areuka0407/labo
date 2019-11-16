<!--head-->
    <link rel="stylesheet" href="/css/colors/storage.css">
    <script src="/js/colors/Color.js" type="text/javascript"></script>
    <script src="/js/colors/storage/Storage.js" type="text/javascript"></script>
<!--/head-->

<!--contents-->
    <div id="wrap">
        <div id="user-profile">
            <div class="image">
                <img src="/images/default-userprofile.png" alt="User-Profile">
            </div>
            <div class="info">
                <div class="user-info">
                    <span class="user-name"><?= $owner->user_name ?></span>
                    <span class="user-id">@<?= $owner->user_id ?></span>
                </div>
                <div class="tool-info">
                    <button class="group-add">
                        <svg class="gUZ B9u U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M22 10h-8V2a2 2 0 0 0-4 0v8H2a2 2 0 0 0 0 4h8v8a2 2 0 0 0 4 0v-8h8a2 2 0 0 0 0-4"></path></svg>
                    </button>
                    <button class="ml-2 user-edit">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cog" class="svg-inline--fa fa-cog fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"/></svg>
                    </button>
                </div>
            </div>    
        </div>
        <hr>
        <section>
            <div class="section-head">
                <h3>최근 추가한 색상</h3>
                <div class="button-group">
                    <button class="group-edit ml-2">
                        <svg class="gUZ B9u U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M13.386 6.018l4.596 4.596L7.097 21.499 1 22.999l1.501-6.096L13.386 6.018zm8.662-4.066a3.248 3.248 0 0 1 0 4.596L19.75 8.848 15.154 4.25l2.298-2.299a3.248 3.248 0 0 1 4.596 0z"></path></svg>
                    </button>
                    <button class="group-remove ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eraser" class="svg-inline--fa fa-eraser fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"/></svg>
                    </button>
                </div>
            </div>
            <article>
                <div class="item">
                    <div class="colors">
                        <div class="line" style="background-color: #ff0000">#ff0000</div>
                        <div class="line" style="background-color: #ffff00">#ffff00</div>
                        <div class="line" style="background-color: #00ff00">#00ff00</div>
                        <div class="line" style="background-color: #00ffff">#00ffff</div>
                        <div class="line" style="background-color: #0000ff">#0000ff</div>
                    </div>
                    <div class="tags">
                        <span class="tag">#태그1</span>
                        <span class="tag">#태그2</span>
                        <span class="tag">#태그212</span>
                        <span class="tag">#태그2</span>
                        <span class="tag">#태그2</span>
                        <span class="tag">#태그2</span>
                        <span class="tag">#태그2</span>
                        <span class="tag">#태그2</span>
                        <span class="tag">#태그2</span>
                        <span class="tag">#태그2</span>
                        <span class="tag">#태그2</span>
                        <span class="tag">#태그2</span>
                        <span class="tag">#태그2</span>
                        <span class="tag">#태그2</span>
                    </div>
                    <div class="info">
                        <span class="date">2019년 11월</span>
                        <span class="good">
                            <svg viewBox="0 0 24 24"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                            <span class="good-count ml-1">0</span>
                        </span>
                        
                    </div>
                </div>

                <div class="hidden-bar">
                    <svg class="gUZ B9u U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M22 10h-8V2a2 2 0 0 0-4 0v8H2a2 2 0 0 0 0 4h8v8a2 2 0 0 0 4 0v-8h8a2 2 0 0 0 0-4"></path></svg>
                </div>
            </article>
        </section>
        <section>
            <div class="section-head">
                <h3>최근 추가한 색상</h3>
                <div class="button-group">
                    <button class="group-edit ml-2">
                        <svg class="gUZ B9u U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M13.386 6.018l4.596 4.596L7.097 21.499 1 22.999l1.501-6.096L13.386 6.018zm8.662-4.066a3.248 3.248 0 0 1 0 4.596L19.75 8.848 15.154 4.25l2.298-2.299a3.248 3.248 0 0 1 4.596 0z"></path></svg>
                    </button>
                    <button class="group-remove ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eraser" class="svg-inline--fa fa-eraser fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"/></svg>
                    </button>
                </div>
            </div>
            <article>
                <div class="no-item">
                    <p>
                        그룹에 등록된 색상이 없네요….<br>
                        <a href="/colors/picker">당장 등록하러 가볼까요?</a>
                    </p>
                </div>
            </article>
        </section>
    </div>
<!--/contents-->