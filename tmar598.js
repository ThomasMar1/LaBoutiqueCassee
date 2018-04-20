
var AmILoggedIn = false;


function getHome() {
    document.getElementById("p1").innerHTML = "Welcome to La Boutique Cass&eacute;e";
    document.getElementById("show_result").innerHTML = "La Boutique Cass&eacute;e is the French term for \"The Broken Shop\". New Zealand's leading online stores for selling books and Blu-ray online. <br><br>We hope you find the right book or blu-ray movie you are after today.<br><br>";
    document.getElementById("homePage").style.display="block";
	document.getElementById("form").style.display="none";
	document.getElementById("register").style.display="none";
	document.getElementById("showTab").innerHTML = "";
	if (AmILoggedIn == true){
		
	}
	else {

		document.getElementById("myUN").innerHTML = "";
		document.getElementById("log").innerHTML = "Log In / Register";
		document.getElementById("welcomeMessage").innerHTML = "";
	}

	document.getElementById("showComments").innerHTML = "";
	document.getElementById("sbook").style.display="none";

	document.getElementById("sbr").style.display="none";
	document.getElementById("sc").style.display="none";
	document.getElementById("login").style.display="none";


	//document.getElementById("login").style.display="none";
}



function getRegister() {
	document.getElementById("p1").innerHTML = "";
	document.getElementById("form").style.display="none";
	document.getElementById("show_result").innerHTML = "";
	document.getElementById("showTab").innerHTML = "";
	document.getElementById("showComments").innerHTML = "";
	document.getElementById("sbook").style.display="none";
	document.getElementById("login").style.display="none";
	document.getElementById("sbr").style.display="none";
	document.getElementById("sc").style.display="none";
	document.getElementById("register").style.display="block";
	document.getElementById("homePage").style.display="none";

}




function register() {
	var address = document.getElementById("regAddress").value;
	var userName = document.getElementById("registerUserName").value;
	var password = document.getElementById("registerPassword").value;

	if (userName =="") {
		alert("Username is required.");
	}
	else {

		if (password == ""){
			alert("Password is required.");
		}
		else {
			if (address == "") {
				alert("Address is required.");
			}
			else {
				var myObj = {
					Address: address,
					Name: userName,
					Password: password
				};
				var xmllength = address + userName+ password;
				var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/register";
				var xhr = new XMLHttpRequest();
				xhr.open("POST", uri, true);
				xhr.setRequestHeader("Content-Length", xmllength.length);
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.setRequestHeader("Connection", "close");
				var sendData = JSON.stringify(myObj);
				xhr.send(sendData);
				xhr.onload = function () {
					alert(xhr.responseText);
					var inform = document.getElementById("registerform");
					inform.reset();
					getHome();
				};
			}
		}
	}
}




function postComment() {
	var uname = document.getElementById("username").value;
	var comment = document.getElementById("userComment").value;
	if (comment == ""){
		alert("You need a comment");
	}
	else {
		if (uname == ""){
			alert("You need a name.");
		}
		else {
			var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/comment?name=" + uname;
			var xhr = new XMLHttpRequest();
			xhr.open("POST", uri, true);
			//xhr.setRequestHeader("Content-Length", comment.length);
			xhr.setRequestHeader("Content-Type", "application/json");
			//xhr.setRequestHeader("Connection", "close");
			var sendComment = JSON.stringify(comment);
			xhr.send(sendComment);
			var form = document.getElementById("userform");
			form.reset();
		    window.setTimeout(getComments,500);
		}
	}
}


function getComments() {
	document.getElementById("p1").innerHTML = "Guest Book";
	document.getElementById("show_result").innerHTML = "Leave comments in our guest book";
	document.getElementById("showTab").innerHTML = "";
	document.getElementById("sbook").style.display="none";
	document.getElementById("sbr").style.display="none";
	document.getElementById("login").style.display="none";
	document.getElementById("form").style.display="block";
	document.getElementById("sc").style.display="block";
	document.getElementById("register").style.display="none";
	document.getElementById("homePage").style.display="none";
	document.getElementById("iframe").setAttribute("src", "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/htmlcomments");
}

function getLogin(item) {
	document.getElementById("p1").innerHTML = "";
	document.getElementById("show_result").innerHTML = "";
	document.getElementById("showTab").innerHTML = "";
	document.getElementById("sbook").style.display="none";
	document.getElementById("sbr").style.display="none";
	document.getElementById("login").style.display="block";
	document.getElementById("form").style.display="none";
	document.getElementById("sc").style.display="none";
	document.getElementById("register").style.display="none";
	document.getElementById("homePage").style.display="none";
	document.getElementById("iframe").setAttribute("src", "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/htmlcomments");
}




function getBooks() {
	document.getElementById("p1").innerHTML = "Book Shop";
	document.getElementById("show_result").innerHTML = "View our wonderful range of books available. <br><br> You must be signed in to purchase an item.";
	document.getElementById("showTab").innerHTML = "";
	document.getElementById("showComments").innerHTML = "";
	document.getElementById("form").style.display="none";
	document.getElementById("sbook").style.display="block";
	document.getElementById("login").style.display="none";
	document.getElementById("sbr").style.display="none";
	document.getElementById("sc").style.display="none";
	document.getElementById("register").style.display="none";
	document.getElementById("homePage").style.display="none";

	var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booklist";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showBooks(resp);
	};
	xhr.send(null);
}

function getLoginStatus(status){
	if (AmILoggedIn == false){
		getLogin();
	}
	else {
		AmILoggedIn = false;
		location.reload();
	}
}


function signIn(){
	var username = document.getElementById("myUsername").value;
	var password = document.getElementById("myPassword").value;
	if (username==""){
		alert("Please enter a username");
	}
	else if (password ==""){
		alert("Please enter a password");
	}
	else{
		var response = null;

		var xhr = new XMLHttpRequest();
		var uri = "http://localhost:8189/Service.svc/user" ;
		xhr.open("GET", uri, true, username, password);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.withCredentials = true;
		xhr.send();
		xhr.onload=function(){
			response = (xhr.responseText);
			if (response == ("<Fault xmlns=\"http://schemas.microsoft.com/ws/2005/05/envelope/none\"><Code><Value>Sender</Value></Code><Reason><Text xml:lang=\"en-NZ\">Authentication failed</Text></Reason></Fault>")){
				alert("Incorrect Username or Password. Please try again.");

			}
			else{
				document.getElementById("myUN").innerHTML =(xhr.responseText) + "    ";
				document.getElementById("welcomeMessage").innerHTML = "Welcome back ";
				document.getElementById("log").innerHTML = "Log Out";
				UN = xhr.responseText;
				AmILoggedIn = true;
				getHome();
			}

		};
	}

	var userform = document.getElementById("signin");
	userform.reset();

	//getBooks();
	//getBluRay();

}



function searchBooks() {
	var bookInput = document.getElementById("myInput").value;
	var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booksearch?term=" + bookInput;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showBooks(resp);
	};
	xhr.send(null);
}




function showBooks(dest) {
	var tableContent = "<tr class='orderTitle'><td><b>Book Cover</b></td><td><b>Book Title</b></td><td><b>Author</b></td><td></td></tr>\n";
	for (var i = 0; i < dest.length; ++i) {

		var record = dest[i];
		var book = record.Title;
		var id = record.Id;
		var buy = "<button id='buttonFormat' onclick=buyBook(" + JSON.stringify(id) +")>Buy Now</button>";		

		var image = "<img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + record.Id +  "' width=100%>";
		if (i & 1 == 1) {
			tableContent += "<tr class='orderOdd'>";
		}
		else {
			tableContent += "<tr class='orderEven'>";
		}
		tableContent += "<td style='width:20%;'>" + image +  "</td><td style='width:40%;'>" + book +  "</td><td style='width:30%;'>"+ record.AuthorInitials+ " " + record.AuthorSurname + "</td><td style='width:10%;'>" + buy + "</td></tr>\n";
	}
	tableContent += "<tr class='orderTitle'><td colspan=\"3\"><p style=\"cursor:pointer;\"onclick=getBooks()>Back to the top</p></td></tr>\n"
	document.getElementById("showTab").innerHTML = tableContent;
}

function buyBook(book){
	if (AmILoggedIn == false){
		getLogin();
	}
	else{
		//alert(book);	
		//window.open("http://localhost:8189/Service.svc/bookbuy?id="+ book);
		uri = "http://localhost:8189/Service.svc/bookbuy?id="+ book
		var xhr = new XMLHttpRequest();
		xhr.open("GET", uri, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.send();
		xhr.onload=function(){
			var resp = (xhr.responseText);
			alert(resp);
		}
	}	
}

function buyBR(br){
	if (AmILoggedIn == false){
		getLogin();
	}
	else{
		//alert(br)	
		//window.open("http://localhost:8189/Service.svc/bookbuy?id="+ book);
		uri = "http://localhost:8189/Service.svc/brbuy?id="+ br;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", uri, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.send();
		xhr.onload=function(){
			var resp = (xhr.responseText);
			alert(resp);
		}
	}	
}


function getBluRay() {
	document.getElementById("p1").innerHTML = "Blu-Ray Shop";
	document.getElementById("show_result").innerHTML = "View our wonderful range of blu-ray movies available. <br><br> You must be signed in to purchase an item.";
	document.getElementById("showTab").innerHTML = "";
	document.getElementById("showComments").innerHTML = "";
	document.getElementById("form").style.display="none";
	document.getElementById("login").style.display="none";
	document.getElementById("register").style.display="none";
	document.getElementById("homePage").style.display="none";
	document.getElementById("sbook").style.display="none";
	document.getElementById("sbr").style.display="block";
	document.getElementById("sc").style.display="none";
	var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brlist";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showBluRay(resp);
	}
	xhr.send(null);
}




function searchBluRay() {
	var brInput = document.getElementById("myInput2").value;
	var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brsearch?term=" + brInput;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", uri, true);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = function () {
		var resp = JSON.parse(xhr.responseText);
		showBluRay(resp);
	}
	xhr.send(null);
}




function showBluRay(dest) {
	var tableContent = "<tr class='orderTitle'><td><b>Blu-ray Cover</b></td><td><b>Blu-ray Movie Title</b></td><td></td></tr>\n";
	for (var i = 0; i < dest.length; ++i) {
		var record = dest[i];
		var id = record.Id;
		var buy = "<button id='buttonFormat' onclick=buyBR(" + JSON.stringify(id) +")>Buy Now</button>";
		//var buy = "<button id='buttonFormat' onclick=buyBR(" + JSON.stringify(id) +")>Buy Now</button>";	
		var image = "<img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=" + record.Id +  "' width=100% >";

		if (i & 1 == 1) {
			tableContent += "<tr class='orderOdd'>";
		}
		else {
			tableContent += "<tr class='orderEven'>";
		}
		tableContent += "<td style='width:20%'>" + image +  "</td><td style='width:70%;'>" + record.Title +  "</td><td style='width:10%;'>"+ buy + "</td></tr>\n";
	}
	tableContent += "<tr class='orderTitle'><td colspan=\"3\"><p style=\"cursor:pointer;\"onclick=getBluRay()>Back to the top</p></td></tr>\n"
	document.getElementById("showTab").innerHTML = tableContent;

}
