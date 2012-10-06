$("#home_clearstorage_button").live('click', function(){
	window.localStorage.clear();
});
$("#SearchWine").live('click', function(){
	$.mobile.changePage("Search.html", { transition: "slideup" });
});
$("#WineswatchList").live('click', function(){
	$.mobile.changePage("watchlist.html", { transition: "slideup" });
});

function back() {
      $.mobile.changePage("index.html", { transition: "slideup" });
}
function winedetailback()
{
    $.mobile.changePage("watchlist.html", { transition: "slideup" });
}
function searchback()
{
    $.mobile.changePage("Search.html", { transition: "slideup" });
}

//binding the wine details
$('#WineDetailsPage').live('pageshow', function(event) { //or 'pagecreate'

    // get query string part of url into its own variable
    //var url = window.location.href;
    var url=unescape(document.location.href);
    alert(url);
    var query_string = url.split("?");

    //alert(query_string);

    // make array of all name/value pairs in query string
    var firstparams = query_string[1].split("=");
    //alert(firstparams);

    var secondparam = firstparams[1];
    //alert(secondparam);
    getWinesdetails(secondparam);
});

var track_id = '';      // Name of the wine
var tracking_data = []; // Array containing wine objects objects
var tracking_data1='';
var wines='';
function getWinesdetails(secondparam) {
    //alert("enter Winesdetails");

    //Get the records from JSON file
    jQuery.getJSON("js/winecurrent.json", function(data) {
    
        $('#WinesDetails li').remove();
        wines = data.rows;
        $.each(wines, function(index, wine) {
            alert("enter2");
        if (wine.winename == secondparam) {
                $('#WinesDetails').append('<li><span style="color:#336699">Wine Name</span> : ' + wine.winename + '<Br />' +
                '<span style="color:#336699">Price</span> : ' + wine.price + '<Br />' +
                '<span style="color:#336699">Region </span>: ' + wine.region + '<Br />' +
                '<span style="color:#336699">Review Stars</span> : ' + wine.reviewstars + '<Br />' +
                '<span style="color:#336699">Reviewer</span> : ' + wine.reviewer + '<Br />' +
                '<span style="color:#336699">Potential </span>: ' + wine.potential + '<Br />' +
                '<span style="color:#336699">Review Date </span>: ' + wine.reviewdate + '<Br />' +
                '<span style="color:#336699">Food Pairing</span> : ' + wine.foodpairing + '<Br />' +
                '<span style="color:#336699">Varietal</span> : ' + wine.varietal + '<Br />' +
                '<span style="color:#336699">Producer</span> : ' + wine.producer + '<Br />' +
                '<span style="color:#336699">Review Text</span> : ' + wine.reviewtext + '<Br />' +
                '<span style="color:#336699">Vintages </span>: ' + wine.vintages + '<Br />' +
                '<span style="color:#336699">Alcohol</span> : ' + wine.alcohol + '<Br />' +
                '<span style="color:#336699">Vintage </span>: ' + wine.vintage + '<Br />' +
                '<span style="color:#336699">Lcbonum </span>: ' + wine.lcbonum + '<Br />' +
                '</li>');
                //save in var
                tracking_data='<span style="color:#336699">Wine Name</span>: ' + wine.winename +'<Br />'+
                '<span style="color:#336699">Price </span>: ' + wine.price + '<Br />' +
                '<span style="color:#336699">Region </span>: ' + wine.region + '<Br />' +
                '<span style="color:#336699">Review Stars </span>: ' + wine.reviewstars + '<Br />' +
                '<span style="color:#336699">Reviewer </span>: ' + wine.reviewer + '<Br />' +
                '<span style="color:#336699">Potential </span>: ' + wine.potential + '<Br />' +
                '<span style="color:#336699">Review Date</span> : ' + wine.reviewdate + '<Br />' +
                '<span style="color:#336699">Food Pairing </span>: ' + wine.foodpairing + '<Br />' +
                '<span style="color:#336699">Varietal </span>: ' + wine.varietal + '<Br />' +
                '<span style="color:#336699">Producer : ' + wine.producer + '<Br />' +
                '<span style="color:#336699">Review Text : ' + wine.reviewtext + '<Br />' +
                '<span style="color:#336699">Vintages </span>: ' + wine.vintages + '<Br />' +
                '<span style="color:#336699">Alcohol</span> : ' + wine.alcohol + '<Br />' +
                '<span style="color:#336699">Vintage</span> : ' + wine.vintage + '<Br />' +
                '<span style="color:#336699">Lcbonum</span> : ' + wine.lcbonum + '<Br />';
               //$('#track_id').text(wine.winename);
               track_id=wine.winename;
               //alert(track_id);
               //alert(tracking_data);
               
            }
            
            //tracking_data=WinesDetails.val();
            

        });
        $('#WinesDetails').listview('refresh');
    });

}

//Save the data

function addtolist()
{
    //alert("watch list");
    // Tidy up the UI
    //track_id = $("#track_id").val();
    //alert(track_id);
    //$("#track_id").hide();
   window.localStorage.setItem(track_id, JSON.stringify(tracking_data));
    alert("Succesfully added to watchlist");
}

//Wish list
// When the user views the history page
var tracks_recorded='';
$('#watchlistpage').live('pageshow', function () {
	
	// Count the number of entries in localStorage and display this information to the user
	tracks_recorded = window.localStorage.length;
	//alert(tracks_recorded);
	$("#tracks_recorded").html("<strong>" + tracks_recorded + "</strong> Wines(s) added");
	
	// Empty the list of recorded tracks
	$("#history_tracklist").empty();
	
	// Iterate over all of the recorded tracks, populating the list
	for(i=0; i<tracks_recorded; i++){
		$("#history_tracklist").append("<li><a href='#track_info' data-ajax='false'>" + window.localStorage.key(i) + "</a></li>");
	}
	
	// Tell jQueryMobile to refresh the list
	$("#history_tracklist").listview('refresh');

});
// When the user clicks a link to view track info, set/change the track_id attribute on the track_info page.
$("#history_tracklist li a").live('click', function(){

	$("#track_info").attr("track_id", $(this).text());
	
});

// When the user views the Track Info page
$('#track_info').live('pageshow', function(){

	// Find the track_id of the workout they are viewing
	var key = $(this).attr("track_id");
	//alert(key);
	// Update the Track Info page header to the track_id
	$("#track_info div[data-role=header] h1").text(key);
	
	// Get all the GPS data for the specific workout
	var data = window.localStorage.getItem(key);
	//alert(data);
	// Turn the stringified GPS data back into a JS object
	data = JSON.parse(data);

	// Calculate the total distance travelled
	total_km = 0;

	for(i = 0; i < data.length; i++){    
	    	    
	    total_km += data[i];
	}
	// Display total distance and time
	$("#track_info_info").html(total_km);
});
