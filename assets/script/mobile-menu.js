/* Init */
$(document).ready(function () {
  window.windowWidth = $(this).width();
  window.widthMode = checkWidthMode(window.windowWidth);
  if (window.widthMode == "narrow") {
    window.menuOpen = false;
  } else {
    window.menuOpen = true;
  }
  setDefaultMenuStyle(window.widthMode);

  /* Click on menu tab on narrow/mobile view */
  $(".mobimenu-tab").click(function () {
    if (window.menuOpen == false) {
      $("#nav").slideDown(600);
      $("#topnav").slideDown(600);
      $(".mobimenu-tab").html("<span class='expanded'>menu</span>");
      window.menuOpen = true;
    } else {
      $("#nav").slideUp(600);
      $("#topnav").slideUp(600);
      $(".mobimenu-tab").html("<span class='collapsed'>menu</span>");
      window.menuOpen = false;
    }
  });
});




/* Default state of menu - closed on mobile, open on legacy */
function setDefaultMenuStyle(widthMode) {
  
  if (widthMode == 'narrow') {
      $("#nav").slideUp(0);
    $("#topnav").slideUp(0);
    $('#topnav-full').insertAfter('#nav-misc');
    $(".mobimenu-tab").html("<span class='collapsed'>menu</span>");
    
    window.menuOpen = false;
  } else {
      $("#nav").slideDown(0);
    $("#topnav").slideDown(0);
    $('#topnav-full').insertBefore('#fullbanner');
    $(".mobimenu-tab").html("<span class='expanded'>menu</span>");
    window.menuOpen = true;
  }
}

/* Check width of window and return mode (narrow or wide) */
function checkWidthMode(width) {
  width = parseInt(width);
  if (width <= 550) {
    return "narrow";
  } else if ((width > 550)) {
    return "wide";
  }
}

/* Fired each time window size changes */
$(function() {
  $(window).resize(function() {
    var resizedWidth = $(this).width();
    /* If the mode has switched between narrow and wide call setDefaultMenuStyle */
    if (window.widthMode != checkWidthMode(resizedWidth)) {
      setDefaultMenuStyle(checkWidthMode(resizedWidth));
      window.widthMode = checkWidthMode(resizedWidth);
    }
  });
  
  
  
var screen = $('#screenStyle').attr("href");
var mobile = $('#mobileStyle').attr("href");
var d = new Date();
            
fullClicked();
function fullClicked() {
//switch to full site
$("a#screen").click(function() { 
    $('#mobileStyle').attr("href", screen);  
    $('div.mobi-full a').text("view mobile site");
    $('div.mobi-full a').attr("id", "mobile");
    $('div.mobi-full').css("display", "inline");
    setDefaultMenuStyle(600);
    $("html, body").animate({ scrollTop: 0 }, "fast");
    
    mobileClicked();
    
    
    return false;
});
}

function mobileClicked(){
    //switch back to mobile site
    $("a#mobile").click(function() { 
        $('#mobileStyle').attr("href", mobile);
        //reset the menu to mobile
        $('div.mobi-full a').text("view full site");
        $('div.mobi-full a').attr("id", "screen");
        $('div.mobi-full').css("display", "inline");
        setDefaultMenuStyle(window.widthMode);
        $("html, body").animate({ scrollTop: 0 }, "fast");
        fullClicked();
        return false;
    });
}

//show the pencil icon to edit the main content
var pencil = $("#main img[src='/css/icons/edit.png']");
pencil.css("position","relative");
  
  
});
