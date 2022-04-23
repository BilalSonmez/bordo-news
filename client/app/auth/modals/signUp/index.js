import bootstrap from 'bootstrap';
import Swal from 'sweetalert2';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.authModalSignUp.onRendered(function () {
  const self = this;
  const modalElement = document.getElementById('brdSignUpModal');
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener('hidden.bs.modal', function (event) {
    self.$('#brdAuthSignUpForm').trigger('reset');
  });
});

Template.authModalSignUp.events({
  'submit form#brdAuthSignUpForm': function (event, template) {
    event.preventDefault();
    const name = event.target.SignUpNameInput.value;
    const surname = event.target.SignUpSurnameInput.value;
    const emailAddress = event.target.SignUpEmailInput.value;
    const password = event.target.SignUpPasswordInput.value;

    const obj = {
      email: emailAddress,
      password: password,
      profile: {
        name: name,
        lastName: surname,
      },
    };

    Accounts.createUser(obj, function (error, result) {
      if (error) {
        ErrorHandler.show(error);
        return;
      }

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Welcome ${Meteor.user().profile.name}`,
        showConfirmButton: false,
        timer: 1500,
      });
      
      event.target.reset();
      template.modal.hide();
      FlowRouter.go('public.home');
    });
  },
});
