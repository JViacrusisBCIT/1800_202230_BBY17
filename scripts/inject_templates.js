// Injects the navbar, and footer into the HTML doc
function inject_templates() {
    console.log($('#nav').load('../text/nav_template.html'));
    console.log($('#foot').load('../text/foot_template.html'));
}

// Calls the inject_navfoot function
inject_templates();



document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;//for x direction                                                        
var yDown = null; // for y direction

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                  //haha it says touches                   
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];       //haha touches                               
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {//this function is actually telling it what to do upon swipe
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            history.forward();//left swipe
        } else {
            history.back(); //right swipe
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
        } else { 
            /* up swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
