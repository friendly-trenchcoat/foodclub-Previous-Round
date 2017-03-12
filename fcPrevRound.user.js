// ==UserScript==
// @author         friendly-trenchcoat
// @name           Neopets - Food Club Previous Round
// @description    Lists previous round's winners on one page.
// @include        http://www.neopets.com/pirates/foodclub.phtml?type=previous
// @require	       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$("img[src*='shipwreck']").hide();
$("table[width='500']").width(750);
$("font[color='white']").text("Loading...").wrap('<b></b>');
$("font[color='darkred']").hide();

var winnerName, winnerPic, winnerArena;
var firstName = $("font[color='darkred']").next().next();
var firstPic = $("img[src*='/fc_pirate']");
var arenas = ["Lagoon","Treasure Island","Hidden Cove","Harpoon Harry's"];
var names = new Array(4);
var pics = new Array(4);

for (var i=2; i<6; i++){
    $.ajax({
        url: 'http://www.neopets.com/pirates/foodclub.phtml?type=previous&id='+i,
        dataType: 'text',
        success: function(data) {
            winnerName = $(data).find("font[color='darkred']").next().next().text();
            winnerPic = $(data).find("img[src*='/fc_pirate']").clone();
            winnerArena = arenas.indexOf($(data).find("font[color='white']").text().replace(" Competition",""));  // for order, because ajax is unpredictable
            names[winnerArena] = winnerName;
            pics[winnerArena] = winnerPic;
        }
    });
}
$(document).ajaxStop(function(){  // after all ajax is done
    for (var j=3; j>=0; j--){
        firstName.after(' | '+names[j].bold());
        firstPic.after(pics[j]);
        $("font[color='white']").text("All Competitions").wrap('<b></b>');
    }
});
