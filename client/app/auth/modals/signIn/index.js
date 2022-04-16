import bootstrap from "bootstrap";
import Swal from 'sweetalert2';
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.authModalSignIn.onRendered(function () {
  const self = this;

  const modalElement = document.getElementById("brdLoginModal");
  this.modal = new bootstrap.Modal(modalElement);
  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("#brdAuthLoginForm").trigger("reset");
  });
});

Template.authModalSignIn.events({
  "submit form#brdAuthLoginForm": function (event, template) {
    event.preventDefault();
    const emailAddress = event.target.signInEmailInput.value;
    const password = event.target.SignInPasswordInput.value;
    Meteor.loginWithPassword(emailAddress, password, function (error) {
      if (error) {
        ErrorHandler.show(error);
        return;
      }
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Welcome ${Meteor.user().profile.name}`,
        showConfirmButton: false,
        timer: 1500
      })
      event.target.reset();
      template.modal.hide();
      FlowRouter.go("public.home");
    });
  },
});
