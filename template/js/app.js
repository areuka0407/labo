// app.js
window.onload = function () {
    var state = 0;
    var wrap = `<div id='wrap'></div>`;
    $("body").append(wrap);
    $(".login").css("top", "-50%");
    $(".login").css("display", "none");
    $("#login_btn").on("click", function slide_down(e) {
        state = 1;
        $(".hidden").show();
        $(".login").css("display", "flex");
        $("#wrap").fadeIn("slow");
        $("#wrap").fadeIn();
        $(".login").animate({top: "50%"}, 900);
    });

    $("#wrap").on("click", function slide_up(e) {
        if (state) {
            if (e.target.className !== "login" && e.target.className !== "loginId" && e.target.className !== "loginPw" && e.target.id !== "submit" && e.target.className !== "FAccount1" && e.target.className !== "FAccount2" && e.target.className !== "google" && e.target.className !== "login-text" && e.target.className !== "pass-text") {
                $("#wrap").fadeOut();
                $(".login").animate({top: "-50%"}, 900);
            }
            state = 0;
        }
    });
    console.log("app.js");
}