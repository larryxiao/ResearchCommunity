// ==UserScript==
// @name         USENIX Conference, Author Bio
// @namespace    https://github.com/larryxiao/USENIX-Conference
// @version      0.1
// @description  Display USENIX paper author bio
// @author       Arkansol
// @match        https://www.usenix.org/conference/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function()
                  {
                      console.log("jQuery is loaded");
                  });

// [0] show author's bio like institution, list of publications
//     * consider using some database of researchers
// [1] show author's research interest

// OSDI technical-sessions
$(".field-item .even p").each(
    function(){
//        this.style.color = "blue"
    }
);

function constructEntries(l){
    var ret = ""
    var institution = l[l.length-1];
    for (var i = 0; i < l.length-1; i++) {
        ret = ret + "<a href=https://www.google.com/search?q=" + encodeURI(l[i] + " " + institution) + ">" + l[i] + (i==l.length-2?"":",") + "</a>";
    }
    return "<p class='arkansol'>" + institution + " : " + ret + "</p>";
}

$(".field-item .even p").on("click", 
    function() {
        // Person 1, and Person 2; Inst 1, and Inst 2
        // Person 1, Inst 1, and Person 2, Inst 2
        cleantext = $(this).text()
//        	.replace(", and"," and")
            .replace(", and",",")
        	.replace("University of California,","University of California");
        institutions = cleantext.split(";");
        for (var i in institutions) 
        {
            authors = institutions[i].split(",");
			$(this).parent().append(constructEntries(authors));
        }
        $(this).hide();
    }
);
