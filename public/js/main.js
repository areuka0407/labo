var page = 1;
var lastpage = 1;
var user = {suser:"",semail:"",slevel:0,sphoto:"", login:false};

$(function(){
	logincheck();
	init();	
	gallery();
});

function logincheck(){
	$.getJSON("/api/logincheck", function(json){
		user.suser = json.suser;
		user.semail = json.semail;
		user.slevel = json.slevel;
		user.sphoto = json.sphoto;
		user.suserid = json.suserid;
		if( user.suser && user.semail ) {
			user.login = true;
			$(".btn-write").show();
			var userphoto = "";
			if( user.sphoto ) {
				userphoto = `<img src='/photo/${user.sphoto}' alt='${user.sphoto}' class='user-photo'>&nbsp;`
			}
			$("#login-name").html(userphoto + user.suser);
			$("#login-form").hide();
			$("#logout-form").show();
		} else {
			user.login = false;
			$(".btn-write").hide();
			$("#login-name").html("")
			$("#login-form").show();
			$("#logout-form").hide();	
		}
	});
}

$(".btn-logout").click(function(){
	$.get("/api/logout",function(){
		location.reload();
	});
});

function init(){
	$("#newslist tbody").html("");
	$.getJSON("/api/news?page="+page, function(json){
		//console.log(json);
		var newslist = json.data;
		lastpage = json.lastpage;
		var total = json.total;
		var list = json.list;
		var pages = pagination(total, list, 5, page, "");
		$("#pagelist").html(pages);

		for(var i=0; i<newslist.length; i++) {
			var newsphoto = "";
			if( newslist[i].photo ) {
				newsphoto = `<img src='/photo/${newslist[i].photo}' alt='${newslist[i].photo}' class='news-photo'>`;
			}
			var tr = `<tr id='news-${newslist[i].id}'>
								<td>${newslist[i].id}</td>
								<td>${newsphoto}</td>
								<td><a class='news-view' href='${newslist[i].id}'>${newslist[i].title}</a></td>
								<td>${newslist[i].username}</td>
								<td>${newslist[i].wdate2}</td>
								<td>${newslist[i].hit}</td>
								<td>`;
								if(user.login && newslist[i].user_id == user.suserid ) {
									tr += `<a href='${newslist[i].id}' class='btn-del text-danger'>
										<i class='fas fa-trash'></i>
									</a>
									<a href='${newslist[i].id}' class='btn-edit text-warning'>
										<i class='fas fa-edit'></i>
									</a>`;
								}
								tr += `
								</td>
								</tr>`;
			$("#newslist tbody").append(tr);
		}
	});
}

$(".main").on("click",".page-link",function(e){
	e.preventDefault();
	var pg = $(this).attr("href");
	if( ! pg ) return;
	page = parseInt(pg,10);
	init();
});

$("#newslist").on("click",".btn-del",function(e){
	e.preventDefault();
	var id = $(this).attr("href");
	if( ! id ) return;
	if( ! confirm("지울까요?") ) return;
	$.ajax({
		url:"/api/news/" + id,
		method: "DELETE",
		success: function(result){
			var json = $.parseJSON(result);
			if( json.success == "true") {
				alert(json.msg);
				// location.reload();
				$("#news-"+id).remove();
			} else {
				alert(json.msg);
			}
		}
	});
});


function gotopage(n) {
	page = page + n;
	if( page < 1 ) page = 1;
	if( page > lastpage ) page = lastpage;
	init();
}


function openNewsForm(){
	$("#mode").val("add");
	$("#id").val(""); //setter
	$("#title").val("");
	$("#content").val("");
	$("#write-form").slideDown();
	location.href="#write-form";
}

function closeNewsForm(){
	$("#write-form").slideUp();
}

function saveNews() {
	var data = {};//빈 객체
	data.mode = $("#mode").val();
	data.title = $("#title").val();
	data.content = $("#content").val();
	data.photo = $("#preview img").attr("src");
	data.id = $("#id").val();
	if( data.mode == "add" ) {
		addNews(data);
	} else if( data.mode == "edit" ) {
		editNews(data);
	}
}

function addNews(data) {
	data.user_id=user.suserid;
	$.post("/api/news", data, function(r){
		var result = $.parseJSON(r);
		if( result.success == "true" ) {
			alert(result.msg);
			location.reload();
		} else {
			alert(result.msg);
		}
	});
}


function editNews(data) {
		if( ! data.id ) return;
		$.ajax({
			url: "/api/news/" + data.id,
			method: "PUT",
			data: data,
			success: function(r){
				var result = $.parseJSON(r);
				if(result.success=="true") {
					alert(result.msg);
					location.reload();
				} else {
					alert(result.msg);
				}
			}
		});
}


$("#newslist").on("click",".btn-edit", function(e){
	e.preventDefault();
	var id = $(this).attr("href");
	if( ! id ) return;
	$.getJSON("/api/news/" + id, function(r){
		var news = r.data[0];
		$("#id").val(id);
		$("#title").val(news.title);
		$("#content").val(news.content);
		$("#mode").val("edit");
		$("#write-form").slideDown();
		location.href="#write-form";
	});
});

$("#newslist").on("click", ".news-view", function(e){
	e.preventDefault();
	var id = $(this).attr("href");
	if( ! id ) return;
	var cur_tr_id = "news-" + id;
	$(".tr-news-view").remove();
	$.post("/api/newsview/"+id,{action:"hit"});
	$.getJSON("/api/news/" + id, function(r){
		var news = r.data[0];
		var imgtag = "";
		if( news.photo ) {
			imgtag = `<p>
														<img src='/photo/${news.photo}' alt='${news.photo}' style='max-width: 100%;'>
													</p>`;
		}
		var new_tr = `
			<tr class='tr-news-view' id='news-view-${news.id}'>
				<td colspan='6' style='background-color:#ddd;'>
					<div>
						<h3>${news.title}</h3>
						<hr>
						<p>
							글쓴이 ${news.username} 
							날짜 ${news.wdate} 
							조회 ${news.hit} 
							<i class='fas fa-thumbs-up text-primary' onclick='like(${news.id})'></i><span id='likes-${news.id}'>${news.likes}</span> 
							<i class='fas fa-thumbs-down text-danger' onclick='dislike(${news.id})'></i><span id='dislikes-${news.id}'>${news.dislikes}</span
						</p>
						<hr>
						<p>${news.content}</p>
						${imgtag}
						<p><a href='#!' onclick='closeView(${news.id})'><i class='far fa-times-circle'></i></a></p>
					</div>
				</td>
			</tr>
		`;
		$("#" + cur_tr_id).after(new_tr);
	});
});

function closeView(id) {
	$("#news-view-"+id).remove();
}

function like(id){
	if( ! id ) return;
	$.post("/api/newsview/"+id, {action:"likes"}, function(r){
		var count = parseInt(r,10);
		if( count ) {
			var likes = $("#likes-"+id).text();
			likes = parseInt(likes,10);
			$("#likes-"+id).text(likes + 1);
		}
	});
}

function dislike(id){
	if( ! id ) return;
	$.post("/api/newsview/"+id, {action:"dislikes"}, function(r){
		var count = parseInt(r,10);
		if( count ) {
			var likes = $("#dislikes-"+id).text();
			likes = parseInt(likes,10);
			$("#dislikes-"+id).text(likes + 1);
		}
	});
}

$("#photo, #userphoto").change(function(){
	var previewid = $(this).attr("data-previewid");
	photoView(this,previewid);
});


function photoView(photo, previewid) {
	if( ! photo.files ) return;
	$("#" + previewid).hide();
	$("#" + previewid + " img").attr("src","");
	var reader = new FileReader();
	reader.onload = function(event){
		var src = event.target.result;
		if( src ) {
			$("#" + previewid + " img").attr("src", src);
			$("#" + previewid).show();
		}
	};
	reader.readAsDataURL(photo.files[0]);
}

$(".btn-join").click(function(e){
	e.preventDefault();
	$("#username").val("");
	$("#email").val("");
	$("#pass, #pass2").val("");
	$("#userphoto").val("");
	$("#userpreview img").attr("src","");
	$("#userpreview").hide();
	$("#join-form").show();
});

function closeJoin(){
	$("#join-form").hide();
}

function saveUser(){
	var data = {};
	data.username = $("#username").val();
	data.email = $("#email").val();
	data.pass = $("#pass").val();
	data.pass2 = $("#pass2").val();
	data.photo = $("#userpreview img").attr("src");
	if( ! data.username ) {
		alert("이름은 필수입니다.");
		$("#username").focus();
		return;
	}
	if( ! data.email ) {
		alert("Email은 필수입니다.");
		$("#email").focus();
		return;
	}
	if( ! data.pass ) {
		alert("비밀번호는 필수입니다.");
		$("#pass").focus();
		return;
	}
	if( ! data.pass2 ) {
		alert("비밀번호확인은 필수입니다.");
		$("#pass2").focus();
		return;
	}
	if( data.pass != data.pass2 ) {
		alert("비밀번호확인이 다릅니다.");
		$("#pass2").focus();
		return;
	}

	data.mode = "add";
	$.post("/api/member", data, function(r){
		var result = $.parseJSON(r);
		if( result.success == "true" ) {
			alert(result.msg);
			closeJoin();
		} else {
			alert(result.msg);
		}
	});

}

$(".btn-login").click(function(e){
	e.preventDefault();
	var data = {};
	data.email = $("#loginemail").val();
	data.pass = $("#loginpass").val();
	data.mode = "login";
	if( ! data.email || ! data.pass ) {
		alert("필수 항목이 빠졌습니다.");
		return;
	}
	$.post("/api/member",data,function(r){
		//console.log(r);
		location.reload();
	});
});



function pagination(total, pageset, blockset, page, link) {
	var total = total ? total : 0;
	var pageset = pageset ? pageset : 10;
	var blockset = blockset ? blockset : 10;	
	var page = page ? page : 1;
	var link = link ? link : "";

	var totalpage = Math.ceil (total / pageset); // total pages
	var totalblock = Math.ceil (totalpage / blockset); // total page blocks
	var block = Math.ceil (page / blockset); // current block
	var first_page = ((block - 1) * blockset) + 1; // first page of current block
	var last_page = Math.min (totalpage, block * blockset); // last page of current block
	var prev_page = page - 1; // previous page
	var next_page = page + 1; // next page
	var prev_block = block - 1; // previous block
	var next_block = block + 1; // next block
	var prev_block_page = prev_block * blockset; // last page of previous block
	var next_block_page = next_block * blockset - (blockset - 1); // first page of next block

	var paginationblock = "<div aria-label='...'><ul class='pagination justify-content-center'>";

	if( page > 1 ) paginationblock += "<li class='page-item'><a class='page-link' href='1'>1</a></li>";
	else paginationblock +=  "<li class='page-item disabled'><a class='page-link' href='1' tabindex='-1' aria-disabled='true'>1</a></li>";

	if( prev_block > 0 ) paginationblock += "<li class='page-item'><a class='page-link' href='" + prev_block_page + "'><i class='fas fa-chevron-left'></i></a></li>";
	else paginationblock += "<li class='page-item disabled'><a class='page-link' href='#!' tabindex='-1' aria-disabled='true'><i class='fas fa-chevron-left'></i></a></li>";

	for ( var i=first_page; i <= last_page; i++ ) {
		if(i != page) paginationblock +=  "<li class='page-item'><a class='page-link' href='" + i + "'>" + i + "</a></li>";
		else paginationblock +=  "<li class='page-item active' aria-current='page'><a class='page-link' href='#!'>" + i + "</a></li>";
	}

	if( next_block <= totalblock ) paginationblock += "<li class='page-item'><a class='page-link' href='" + next_block_page + "'><i class='fas fa-chevron-right'></i></a></li>";
	else paginationblock +=  "<li class='page-item disabled'><a class='page-link' href='#!' tabindex='-1' aria-disabled='true'><i class='fas fa-chevron-right'></i></a></li>";
	
	if( page < totalpage ) paginationblock += "<li class='page-item'><a class='page-link' href='" + totalpage + "'>" + totalpage + "</a></li>";
	else paginationblock +=  "<li class='page-item disabled'><a class='page-link' href='#!' tabindex='-1' aria-disabled='true'>" + totalpage + "</a></li>";

	paginationblock += "</ul></div>";

	return paginationblock;
}


function gallery(){
	$.getJSON("/api/gallery", function(r){
		console.log(r);
		for(var i=0;i<r.length;i++) {
			var photo = r[i].photo;
			var thumb = `<img src='/photo/${r[i].photo}' alt='${r[i].photo}' class='img-thumbnail'>`;
			$("#photolist").append(thumb);
		}
	});
}

