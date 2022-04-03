Template.adminComponentNavbar.onRendered(function () {
  const self = this;

  this.autorun(function () {
    
      $(window).scroll(function(){
        if($(this).scrollTop()!=0){
          $('.navbar-brand-content').addClass('d-none');
        } else {
          $('.navbar-brand-content').removeClass('d-none');
        }
      });
    });
    

});

Template.adminComponentNavbar.events({
  'click #event': function (event,template) {

  }
});