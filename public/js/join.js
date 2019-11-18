// join.js
window.onload = function(){
    agree();
    agree_movement();
    $("#agree").css({"width":"100%","height":"100%"});
    $("#agree_content").css({"width":"100%","height":"100%"});
    //페이지 전환을 위한 변수
    var move=0,now_join_page="",name="";
    $(".container").fadeIn(600);
    $(".join_check_next").on("click",function(){return false;});
    //페이지 전환 함수
    function agree_movement(){
        $("#right-arrow").on("click",function move_join_page(){
            if(move){
                if(now_join_page==="agree"){
                    move=0;
                    $(".container").fadeOut(600,function(){
                        $("#agree").load("/join/info #info",function(){
                            $("#info").css({"width":"100%","height":"100%"});
                            $("#info > form").css({"width":"200px"});
                            $(".container_2").fadeIn(600);
                            $(".join_check_next").on("click",function (){return false;});
                            $("#right-arrow").css("cursor", "default");
                            info(agree_movement());
                            $("#left-arrow").on("click",function (){
                                $(".wrapper-gradient").fadeOut(600);
                                $("#info").fadeOut(600,function(){
                                    $("#agree").load("/join/agree #agree_content",function(){
                                        $(".container").fadeIn(600,agree(move_join_page(agree_movement())));
                                        $(".wrapper").css("background", "rgba(0, 0, 0, 0.5)");//원래 배경으로 변경
                                        $(".wrapper-gradient").css({"background":"url('/images/gradient-image.png')","opacity":"0","display":"block"});//그라디언트 배경 변경
                                    });
                                });
                            });
                        });
                    });
                }else{
                    if(now_join_page==="success"){
                        let data = {"ID":$("#join-loginId").val(),"nickname":$("#nickname").val(),"password":$("#join-loginPw").val(),"y_m_d":$("#year").val()+"-"+$("#month").val()+"-"+$("#day").val(),"gender":$("#gender").val(),"login_check":""};
                        $.ajax({
                            url:"/users/join",
                            type:"POST",
                            data: data,
                            dataType:"JSON",
                            success:function(result){
                                // console.log(result);
                                $("#info").fadeOut(600,function(){
                                   $("#agree").load("/join/success #success",function(){
                                        //성공시의 텍스트 이름 변경
                                        $("#success #name").text(name);
                                        $("#success").fadeIn(600);

                                        // 로그인 버튼을 누르면 로그인 되어 메인 페이지로 넘어가기
                                        $("#login-btn").on("click", function(e){
                                            e.preventDefault();
                                            $.post("/users/login", {ID: data['ID'], PW: data['password']}, function(res){
                                                location.assign("/") ;
                                            });
                                            return false;
                                        });
                                   });
                                });
                            },
                            error:function(request,status,error){
                                console.log(request);
                                console.log(status);
                                console.log(error);
                            }
                        });
                    }
                }
            }
        });
    }

    function agree_change(check,box){
        if(box) for (let i = 1; i <= 3; i++) $("#box" + i).prop('checked', check);
        if(check){ 
            $("#right-arrow").css("cursor", "pointer");//커서 변경
            $("#right-arrow").attr("src", "/images/right-arrow-true.png");//right-arrow변경
            $(".wrapper").css("background", "none");//원래의 배경 해제
            $(".wrapper-gradient").css({"background":"url('/images/gradient-image.png')","opacity":"1","display":"block"});//그라디언트 배경 변경
            move=1;
            now_join_page="agree";
            if ($("#box1").is(":checked")&&$("#box2").is(":checked")&&$("#box3").is(":checked")) $("#box").prop("checked",true);
        }else{
            $("#right-arrow").attr("src", "/images/right-arrow-false.png");//right-arrow변경
            $("#right-arrow").css("cursor", "default"); //pointer 해제
            $(".wrapper-gradient").css({"background":"url('/images/gradient-image.png')","opacity":"0"});//그라디언트 배경 변경
            $(".wrapper").css("background", "rgba(0, 0, 0, 0.5)");//원래 배경으로 변경
            $("#box").prop("checked", false);//전체약관동의 해제
            move=0;
            now_join_page="";
        }
    }
    $("#right-arrow").css("cursor", "default");
    function agree(){
        //전체약관 동의
        $("#box").on("click", function check_all() {agree_change($("#box").is(':checked'),true);});
        $("#box1").on("click", function check_next() {agree_change($("#box1").is(":checked") && $("#box2").is(":checked"),false);});
        $("#box2").on("click", function check_next() {agree_change($("#box1").is(":checked") && $("#box2").is(":checked"),false);});
        $("#box3").on("click", function box3_check() {
            if ($("#box1").is(":checked") && $("#box2").is(":checked") && $("#box3").is(":checked")) $("#box").prop("checked", true);//전체약관동의 확인
            else $("#box").prop("checked", false);//전체약관동의 해제
        });
    }

    function info(){
        //각 에러들에 대한 조건 여부 판단 & 중복 방지 변수
        let error_pw=1,error_pw_regex=1,error_pw_num=1,error_name_regex=1,error_nickname=1;
        //입력한 회원 정보가 조건에 안맞을시 띄울 에러 메시지&css
        function error(id,msg){$("#info").append("<p class="+id+">"+msg+"</p>");}
        function error_css(id,offset){ $("."+id).css({"position":"absolute","width":"400px","height":"30px","top":($("#"+offset).offset().top+46),"left":($("#"+offset).offset().left),"color":"#FFF57C"});}
        $("#join-loginId").blur(function(){
            if(error_name_regex){
                $.ajax({
                    url : "/users/join",
                    type : "POST",
                    data : {"ID":$("#join-loginId").val(),"password":"","nickname":"","y_m_d":"","gender":"","login_check":"id"},
                    dataType : "JSON",
                    success:function(result){
                        if(result['result']){
                            error("nickname_error_db","이미 있는 아이디 입니다.");
                            error_css("nickname_error_db","join-loginId");
                            error_name_regex=0;
                        }else{
                            $(".nickname_error_db").remove();
                            $(".id_error").remove();
                            error_name_regex=1;
                        }
                    },
                    error:function(request,status,error){
                        console.log(request);
                        console.log(status);
                        console.log(error);
                    }
                });
            }
        });
        $("#nickname").blur(function(){
            if(error_nickname){
                $.ajax({
                    url : "/users/join",
                    type : "POST",
                    data : {"ID":"","password":"","nickname":$("#nickname").val(),"y_m_d":"","gender":"","login_check":"name"},
                    dataType : "JSON",
                    success:function(result){
                        if(result['result']){
                            console.log(result);
                            error("name_error_db","이미 있는 닉네임입니다.");
                            error_css("name_error_db","nickname");
                            error_nickname=0;
                        }else{
                            $(".name_error_db").remove();
                            error_nickname=1;
                        }
                    },
                    error:function(request,status,error){
                        console.log(request);
                        console.log(status);
                        console.log(error);
                    }
                });
            }
        });
        $("#right-arrow_join2").css("cursor","default");
        $(".input").on("propertychange change keyup paste input",function join_input(){
            let login=$("#join-loginId").val();
            let pw=$("#join-loginPw").val();
            let pw_c=$("#join-loginPwRe").val();
            name=$("#nickname").val();
            if(login.length!=0){
                //입력된 아이디가 정규표현식에 맞는가?
                let reg_name=/^[a-zA-Z0-9]{1,}$/;
                console.log((reg_name.test(login)),error_name_regex);
                if(!(reg_name.test(login))){
                    if(error_name_regex){
                        error("nickname_error_regex","아이디는 영문자나 숫자가 포함되어야 합니다.");
                        error_css("nickname_error_regex","join-loginId");
                        error_name_regex=0;
                    }
                }else{
                    error_name_regex=1;
                    $(".nickname_error_regex").remove();
                }
                //아이디가 1~30글자인가?
                if(error_name_regex){
                    if (login.length>50) {
                        error("id_error","아이디는 50자 이하여야 합니다.");
                        error_css("id_error","join-loginId");
                    }else $(".id_error").remove();
                }
            }else{
                error_name_regex=1;
                $(".nickname_error_regex").remove();
                $(".id_error").remove();
            }

            if(pw.length!=0){
                //비밀번호가 8자 이하인가?
                if (pw.length<8) {
                    if (error_pw_num) {
                        error("pw_num_error","비밀번호는 8자 이상여야 합니다.");
                        error_css("pw_num_error","join-loginPw");
                        error_pw_num=0;
                    }
                }else {
                    $(".pw_num_error").remove();
                    error_pw_num=1;
                }
                //비밀번호가 정규식에 어긋나는가?
                let reg=/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
                if(error_pw_num){
                    if(!(reg.test(pw))){
                        if(error_pw_regex){
                            error("error_pw_regex","비밀번호는 영문자와 숫자조합이어야합니다.");
                            error_css("error_pw_regex","join-loginPw");
                            error_pw_regex=0;
                        }
                    }else{
                        $(".error_pw_regex").remove();
                        error_pw_regex=1;
                    }
                }else{
                    $(".error_pw_regex").remove();
                    error_pw_regex=1;
                }
                //비밀번호와 비밀번호 확인이 같은가?
                if(pw_c.length!=0){
                    if(error_pw_regex&&(pw!=pw_c)){
                        if(error_pw){
                            error("error_pw","비밀번호와 비밀번호 확인이 일치하지않습니다.");
                            error_css("error_pw","join-loginPwRe");
                            error_pw=0;
                        }
                    }else {
                        $(".error_pw").remove();
                        error_pw=1;
                    }
                }else{
                    $(".error_pw").remove();
                    error_pw=1;
                }
            }else{
                error_pw_num=1;
                error_pw_regex=1;
                $(".pw_num_error").remove();
                $(".error_pw_regex").remove();
                $(".error_pw").remove();
            }
            //닉네임 길이 체크
            if (name.length>30) {
                error("name_error","닉네임은 30자 이하여야 합니다.");
                error_css("name_error","nickname");
                error_nickname=0;
            }else{
                $(".name_error").remove();
                error_nickname=1;
            }
            //조건충족
            if(login.length>0&&(pw.length>=8&&pw.length<=100)&&(pw_c.length>=8&&pw_c.length<=100)&&name.length>0&&pw===pw_c&&error_name_regex&&error_pw_num&&error_pw_regex&&error_pw&&name.length<=30&&login.length<=50&&error_nickname){
                move=1;
                now_join_page="success";
                $("#right-arrow").css("cursor","pointer");
                $("#right-arrow").attr("src","/images/right-arrow-true.png");
            }else{
                //조건 미충족
                move=0;
                now_join_page="info";
                $(".join2_check_next").bind("click");
                $("#right-arrow").css("cursor","default");
                $("#right-arrow").attr("src","/images/right-arrow-false.png");
            }
       });

       //추가작업 연도,월 seletor
       let m_day=[31,28,31,30,31,30,31,31,30,31,30,31];
       let month=0,year=0;
       function leap_year(){
            year=$("#year").val();
            month=$("#month").val()-1;
            $("#day option").remove();
            $("#day").append("<option value=''>일</option>");
            //윤년일 경우
            if(((year%4===0&&year%100!==0)||year%400===0)&&month===1) for(let i=1;i<=29;i++) add_date("day",0,i);
            else for(let i=1;i<=m_day[month];i++) add_date("day",0,i);
       }
       function add_date(append_item,plus_i,i){
            let option=("<option value='"+(i+plus_i)+"'>"+(i+plus_i)+"</option>");
            $("#"+append_item).append(option);
       }
       //연도 생성
       for(let i=0;i<=119;i++) add_date("year",1900,i);
       for(let i=1;i<=m_day[month];i++) add_date("day",0,i);
       $("#month").change(leap_year);
       $("#year").change(leap_year);
    }
}