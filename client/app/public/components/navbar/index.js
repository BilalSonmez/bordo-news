
Template.publicComponentsNavbar.onRendered(function () {
    const self = this;
    let scrollAmount;
    console.log(window.innerWidth)
    window.addEventListener("scroll",function(){
     
        scrollAmount = window.scrollY;
        if (scrollAmount > 50) {
        
           $('.publicComponentsNavbar').addClass('brd-hide')
        }else{
           $('.publicComponentsNavbar').removeClass('brd-hide')
        }
      
    });
  
});
Template.publicComponentsNavbar.events({

});






