// window.onload=function(){

// }

//Disable the form's submission and replace it with onkey-event to search for images
$("#form_search").submit(function(event) {
	event.preventDefault();
	// add event listener for enter-key to work as a search command
	var input = document.getElementById("form_search");
	input.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("hae_kuvia").click();
		}
	});
});

// IMGUR API start--------------------
// Defines search page number in the address line
var sivu=1;

//Ask imgur API to send stuff with a search word included
function loadDoc() {
	sivu=1;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var obj=this.responseText;
          myFunction(obj);
      }
	}
	// Gets search word from search bar
	var hakusana=document.getElementById("hakusana").value;
	// Makes the search with the added search word
	xhttp.open("GET", "https://api.imgur.com/3/gallery/search/time/{{window}}/"+sivu+"?q="+hakusana, true);
	// console.log(hakusana);
    xhttp.setRequestHeader("Authorization", "Client-ID e33f94bdcbca25e");
    xhttp.send();
}

//Parse imgur answer to JSON
function myFunction (arvot){
	arvot2=JSON.parse(arvot);
	addImages(arvot2);
}

//Make array from JSON and add images
function addImages(imgs){
	const imgByClass = document.getElementById("container_images").getElementsByTagName("img");
	var imgByClassArray=Array.from(imgByClass);
	var indexFor=5;

	// adds src address to every image
	imgByClassArray.forEach(element => {
		for (var nimi; indexFor<60;indexFor++) {
			if(imgs.data[indexFor] && imgs.data[indexFor].images) {
				// only accepts .jpeg files
				if (imgs.data[indexFor].images[0].type=="image/jpeg") {
					element.src=imgs.data[indexFor].images[0].link;
					// console.log("indexFor",indexFor);
					indexFor++;
					break;
				}

			}
		}
	});
}

// Load more images
function loadDoc_more(){
	sivu++;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var obj=this.responseText;
          myFunction(obj);
      }
	}
	// Gets search word from search bar
	var hakusana=document.getElementById("hakusana").value;
	// Makes the search with the added search word
	xhttp.open("GET", "https://api.imgur.com/3/gallery/search/time/{{window}}/"+sivu+"?q="+hakusana, true);
	// console.log(hakusana);
    xhttp.setRequestHeader("Authorization", "Client-ID e33f94bdcbca25e");
    xhttp.send();
}
// IMGUR API end--------------------

// Opens image in a new tab, could attach it to image as "onclick="window.open(this.src)"", but wanted to seperate all js from index to make changes easier
function openImage(element){
	window.open(element.src,"_blank");
}



// Tooltip
// $(function () {
// 	$('[data-toggle="tooltip"]').tooltip({
// 		html:true,
// 		trigger:"click"
// 	})
// });