<!--head-->
<meta name="owner_idx" content="<?=$owner->id?>">
<meta name="owner_id" content="<?=$owner->user_id?>">
<meta name="group_id" content="<?=$group->id?>">
<link rel="stylesheet" href="/css/colors/group.css">
<script src="/js/colors/Color.js" type="text/javascript"></script>
<script src="/js/colors/storage/GroupView.js" type="text/javascript"></script>
<!--/head-->

<!--contents-->
    <div id="wrap">
        <div id="group-profile">
            <div class="info">
                <div class="group-info">
                    <div id="group-title" class="title"><?=$group->name?></div>
                    <div class="btn-group<?=user() && user()->id === $owner->id ? "" : " hidden"?>">
                        <button class="group-edit">
                            <svg class="gUZ B9u U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M13.386 6.018l4.596 4.596L7.097 21.499 1 22.999l1.501-6.096L13.386 6.018zm8.662-4.066a3.248 3.248 0 0 1 0 4.596L19.75 8.848 15.154 4.25l2.298-2.299a3.248 3.248 0 0 1 4.596 0z"></path></svg>
                        </button>
                        <button class="group-remove">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eraser" class="svg-inline--fa fa-eraser fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"/></svg>
                        </button>
                    </div>
                </div>
                <div class="user-info">
                    <img class="user-image" src="<?= $owner->image ? "/images/users/{$owner->image}" : "/images/default-userprofile.png" ?>" alt="User-Image">
                    <div class="uinfo column">
                        <small class="owner-span">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="crown" class="svg-inline--fa fa-crown fa-w-20" role="img" viewBox="0 0 640 512"><path fill="currentColor" d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z"/></svg>
                            Owner
                        </small>
                        <div>   
                            <span class="user-name"><?= $owner->user_name ?></span>
                            <span class="user-id">@<?= $owner->user_id ?></span>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
        <hr>
        <div class="tool-bar">
            <select id="colorView" class="mr-2">
                <option value="hex">색상 코드: Hex</option>
                <option value="rgb">색상 코드: RGB</option>
            </select>
            <select id="orderBy">
                <option value="day-ASC">생성한 날짜: 오름차순</option>
                <option value="day-DESC">생성한 날짜: 내림차순</option>
                <option value="good-ASC">좋아요: 오름차순</option>
                <option value="good-DESC">좋아요: 내림차순</option>
            </select>
        </div>
        <div id="color-contents">

        </div>
    </div>
<!--/contents-->