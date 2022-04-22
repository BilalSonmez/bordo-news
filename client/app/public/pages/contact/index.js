import Swal from 'sweetalert2';

Template.publicPagesContact.events({
  'submit #contact-form': async function (event, template) {
    event.preventDefault();
    Swal.fire({
      title: 'Please Wait!',
      html: `Send contact info`,
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });
    const result = await Meteor.callWithPromise("contact.send", {
      name: event.target.ct_name.value,
      mail: event.target.ct_mail.value,
      text: event.target.ct_area.value,
    });
    Swal.fire('Send!', '', 'success')
    event.target.reset();
  }
});