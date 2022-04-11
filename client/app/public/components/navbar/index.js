
Template.publicComponentsNavbar.onRendered(function () {
    const self = this;
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        $('.publicComponentsNavbar').removeClass('brd-hide')
      } else {
        $('.publicComponentsNavbar').addClass('brd-hide')
      }
      prevScrollpos = currentScrollPos;
    }
   
 
  
});


Template.publicComponentsNavbar.events({

});






