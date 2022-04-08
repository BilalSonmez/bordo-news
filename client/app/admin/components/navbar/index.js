import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import Swal from 'sweetalert2';

Template.adminComponentNavbar.events({
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
