import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import Swal from 'sweetalert2';

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
  "click .btnLogout": function (event, template) {
    event.preventDefault();
    Meteor.logout(function () {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Goodbye!',
        showConfirmButton: false,
        timer: 1500
      })
      FlowRouter.go("public.home");
    });
  },
});






