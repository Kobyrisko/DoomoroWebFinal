var iCommentCout = 0;
var oInitialize = {
	Initialize : function(){
		//Hiding Features for Effects
		$("#contactDooerForm").hide();
		$(".description p:nth-child(2)").hide();
		$(".moreComments li").hide();
		$("#userCommentForm").hide();
		$("#userReplyForm").hide();
		
		//Initializing Events for handling click events
		$(document).on("click", ".morePictures img", oEffects.changeMainPicture);
		$(document).on("click", "#contactDooer", oEffects.openContactDialog);
		$(document).on("click", ".glyphicon-star", oEffects.remindMe);
		$(document).on("click", ".description h5", oEffects.readMore);
		$(document).on("click", ".comments h5", oEffects.showMoreReviews);
		$(document).on("click", ".userQuestions h5", oEffects.showMoreComments);
		$(document).on("click", ".shareForm a", oEffects.shareAndGet);
		$(document).on("click", "#addAComment", oEffects.showInputCommentBox);
		$(document).on("click", ".userQuestions .reply", oEffects.addAreply);
		$("#userReplyForm").on("submit", oEffects.reply);
		$("#userCommentForm").on("submit", oEffects.readUserInputFromForm);
		
		//Reading the data from JSON object using AJAX
		oInitialize.readCostumerReviews();
		oInitialize.readSellerDetails();
		oInitialize.readUserQuestions();
	},
	//Functions to read the data with JSON and AJAX
	readSellerDetails : function(){
		$.getJSON('SellersData.json', function(data){
			$("#headLine").html(data.headLine);
			$("#department").append("<b>"+data.department+"</b>");
			$("#mainImage").attr("src", data.mainImage);
			$("#image1").attr("src", data.mainImage);
			$("#image2").attr("src", data.image2);
			$("#image3").attr("src", data.image3);
			$("#image4").attr("src", data.image4);
			$(".description p:first-child").append(data.description);
			$(".description p:nth-child(2)").append(data.moreDescription);
			$(".checkPoint").append('<h6>' + data.checkPoint + '</h6>');
			$(".availabilty").append('<h6>' + data.avalability + '</h6>');
			$(".buyerInstruction").append('<h6>' + data.instructions + '</h6>');
			$(".personalData").append('<h4>' + data.name + '</h4>');
			$(".personalData").append('<h5><span class = "glyphicon glyphicon-record online"></span>' + data.status + '</h5>');
			$(".personalData").append('<img src ="' + data.profileImage + '"/>');
		});
	},
	readCostumerReviews : function(){
		$.getJSON('CostumerReviews.json', function(data){
			var output = '<ol>';
		$.each(data, function(key, val){
				output += '<li>';
				output += '<p class="commentInfo">';
				output += '<img src ="';
				output += val.profileImage;
				output += '"/><br>';
				output += val.name;
				output += '</p>';
				output += '<div class="comment">';
				output += '<p>';
				output += val.comment;
				output += '<small class="commentDateStamp">';
				output += val.time;
				output += '</small>';
				output += '</p>';
				output += '</div>';
				if(val.bPositive)
					output += '<span class = "glyphicon glyphicon-heart red"></span>';
				else 
					output += '<span class = "glyphicon glyphicon-heart-empty green"></span>';
				output += '</li>';
			});
				output += '</ol>';
				$(".comments h1").after(output);
		});
		
	},
	readUserQuestions : function(){
		$.getJSON('UserQuestions.json', function(data){
			var output = '<ol>';
		$.each(data, function(key, val){
				output += '<li>';
				output += '<p class="commentInfo">';
				output += '<img src ="';
				output += val.profileImage;
				output += '"/><br>';
				output += val.name;
				output += '</p>';
				output += '<div class="comment">';
				output += '<a href ="#" class = "reply">REPLY</a>';
				output += '<p>';
				output += val.comment;
				output += '<small class="commentDateStamp">';
				output += val.time;
				output += '</small>';
				output += '</p>';
				output += '</div>';
				output += '</li>';
			});
				output += '</ol>';
				$("#addAComment").after(output);
				$("section ol li:last-child").hide();
		});
		
	}
};

// Functions for handling the Events 
var oEffects = {
	changeMainPicture : function(e){
		e.preventDefault();
		$("#mainImage").attr("src", $(this).attr("src"));
		
	},
	openContactDialog : function(e){
		e.preventDefault();
		$("#contactDooerForm").dialog();
	},
	remindMe : function(){
		$remindMeIcon = $("#remindMeIcon");
		if($remindMeIcon.hasClass("yellow"))
			$remindMeIcon.removeClass("yellow");
		else
			$remindMeIcon.addClass("yellow");
	},
	readMore : function(e){
		e.preventDefault();
		if($(".description p:nth-child(2)").css("display") == "none")
		{
			$(".description p:nth-child(2)").show();
			$(".description h5").html("Read Less");
		}
		else
		{
			$(".description p:nth-child(2)").hide();
			$(".description h5").html("Read More");
		}
	},
	showMoreReviews : function(e){
		e.preventDefault();
		if($(".comments li:last-child").css("display") == "none")
		{
			$(".comments li:last-child").show();
			$(".comments h5").html("Show Less");
		}
		else
		{
			$(".comments li:last-child").hide();
			$(".comments h5").html("More Reviews");
		}
	},
	showMoreComments : function(e){
		e.preventDefault();
		if($(".userQuestions li:last-child").css("display") == "none")
		{
			$(".userQuestions li:last-child").show();
			$(".userQuestions h5").html("Show Less");
		}
		else
		{
			$(".userQuestions li:last-child").hide();
			$(".userQuestions h5").html("More Comments");
		}
	},
	shareAndGet: function(e){
		e.preventDefault();
		if($("#facebook").is(":checked"))
			alert("Facebook");
		else if($("#linkedin").is(":checked"))
			alert("LinkedIn");
		else if($("#mail").is(":checked"))
			alert("Email");
		else if($("#twitter").is(":checked"))
			alert("Twitter");
		else alert("please Select from the Media Bar");
	},
	showInputCommentBox : function(e){
		e.preventDefault();
		if($("#userCommentForm").css("display") == "none")
		{
			$("#userCommentForm").show();
		}
		else
			$("#userCommentForm").hide();
	},
	readUserInputFromForm : function(e){
		var oCommentToAdd = {
			"Name": $("#commentUserName").val(),
			"Description": $("#userComment").val(),
			"Image": "Images/Person1Image.jpg",
			"Time": "a sec ago"
		};
	oEffects.addNewComment(oCommentToAdd);
	e.preventDefault();
	$("#userCommentForm").hide();
	document.getElementById("userCommentForm").reset();
	},
	addNewComment : function(oCommentToAdd){
		var output = '<li>';
		output += '<p class = "commentInfo"> <img src ="';
		output += oCommentToAdd.Image;
		output += '" /><br>';
		output += oCommentToAdd.Name;
		output += '</p>';
		output += '<div class="comment"><a href ="#" class = "reply">REPLY</a><p>';
		output += oCommentToAdd.Description;
		output += '</p><small class="commentDateStamp">';
		output += oCommentToAdd.Time;
		output += '</small>';
		output += '</div>';
		output += '</li>';
		$('.userQuestions li:first-child').before(output);
	},
	addAreply : function(e){
		$liClicked = $(this).parents().eq(1);;
		e.preventDefault();
		$("#userReplyForm").show();
	},
	reply : function(e){
		e.preventDefault();
		var output = '';
		output += '<li>';
		output += '<div class="replyComment">';
		output += '<p>';
		output += '<img src = "Images/Person1Image.jpg" class = "replyImage"/>';
		output += $("#userReply").val();
		output += '<small class="commentDateStamp">';
		output += '1 sec ago';
		output += '</small>'; 
		output += '</p>';
		output += '</li>';
		$liClicked.after(output);
		$("#userReplyForm").hide();
		document.getElementById("userReplyForm").reset();
	}
};
