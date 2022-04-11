import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import Swal from 'sweetalert2';

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






