$(document).ready(function() {

    var pathArray = window.location.pathname.split( '/' );
    var url = window.location.protocol + "//" + window.location.host + "/" + pathArray[1] + "/";


    $(".callout img").each(function(){

    featureImage = $(this).attr("src");
        featureImage = featureImage.replace("../", url);
    $(this).attr("src", featureImage);

    });

    $(".callout a").each(function(){

        featureLink = $(this).attr("href");
        featureLink = featureLink.replace("../", url);
        $(this).attr("href", featureLink);

    });

});
