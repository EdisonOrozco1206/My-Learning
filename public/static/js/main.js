$(document).ready(function() {
    $(document).mousemove(girarMarikita);
});  

function girarMarikita(e){ 
  var box=$("#marikita");
  var boxCenter=[box.offset().left+box.width()/2, box.offset().top+box.height()/2];   
  var angle = Math.atan2(e.pageX- boxCenter[0],- (e.pageY- boxCenter[1]) )*(180/Math.PI);
        
  box.css({ 
    "-webkit-transform": 'rotate(' + angle + 'deg)',
    '-moz-transform': 'rotate(' + angle + 'deg)',
    'transform': 'rotate(' + angle + 'deg)'
  });
  moverMarikita(e);
}

function moverMarikita(e){
  var $mouseX = e.pageX;
  var $mouseY = e.pageY; 
  $('#marikita').stop().animate({left:$mouseX +'px', top:$mouseY +'px'},700);
} 