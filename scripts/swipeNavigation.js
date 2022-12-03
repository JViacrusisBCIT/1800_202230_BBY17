
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;//for x direction                                                        
var yDown = null; // for y direction

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}           
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                  
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) { //this function is actually telling it what to do upon swipe
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            history.forward();//left swipe
            // $('.container').toggleClass('show');//dont mess with this
        } else {
            history.back(); //right swipe
            // $('.container').toggleClass('show');//dont mess with this either
        }                       
    } else {
        if ( yDiff > 0 ) {
            //  down swipe  
        } else { 
            // up swipe 
        }                                                                 
    }
    // reset values 
    xDown = null;
    yDown = null;                                             
};

function hideDivs(divname1, divname2){
    var element = document.getElementById(divname1);
    element.style.display = "none";
    var element2 = document.getElementById(divname2);
    element2.style.display = "none";

}