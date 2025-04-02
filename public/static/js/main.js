$(document).ready(function() {
  $(document).mousemove(girarMarikita);
});

function girarMarikita(e) { 
  var box = $("#marikita");
  var boxCenter = [box.offset().left + box.width() / 2, box.offset().top + box.height() / 2];   
  var angle = Math.atan2(e.pageX - boxCenter[0], - (e.pageY - boxCenter[1])) * (180 / Math.PI);
  
  box.css({ 
    "-webkit-transform": 'rotate(' + angle + 'deg)',
    '-moz-transform': 'rotate(' + angle + 'deg)',
    'transform': 'rotate(' + angle + 'deg)'
  });

  moverMarikita(e);
}

function moverMarikita(e) {
  var box = $("#marikita");
  var winWidth = $(window).width();
  var docHeight = $(document).height();
  var boxWidth = box.outerWidth();
  var boxHeight = box.outerHeight();

  var newX = Math.min(Math.max(e.pageX + 5, 0), winWidth - boxWidth);
  var newY = Math.min(Math.max(e.pageY - 5, 0), docHeight - boxHeight);

  box.stop().animate({ left: newX + 'px', top: newY + 'px' }, 500);
}

$("#marikita").css({
  "user-select": "none",
  "pointer-events": "none",
  "position": "absolute"
});