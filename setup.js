"use strict"


/* Global Values */
function test () {
console.log(document.forms.setup.player_count.value);
}

/* Event Listeners */
var submitBtn = document.forms.setup.elements.submit;
submitBtn.addEventListener("click", function() {
    test();

})

/* Session Storage Functions to Get and Set Data */
