import Swal from 'sweetalert2';
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

Template.authPageProfile.onCreated(function (){
  this.storage = getStorage();
  this.state = new ReactiveDict(null,{
    user:{},
  })
})

Template.authPageProfile.onRendered(function () {
  const self = this;
});

Template.authPageProfile.events({
  'submit #userEdit': function (event, template) {
    event.preventDefault();
    const obj = {
      userName: event.target.profileInputUserName.value,
      name: event.target.profileInputFirstName.value,
      lastName: event.target.profileInputLastName.value,
    };
    Meteor.call("user.profile.update", obj, function (error, success) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      Swal.fire('Saved!', '', 'success');
    });
  },
  'change #file-upload': async function(event, template) { 
    event.preventDefault();
    Swal.fire({
      title: 'Please Wait!',
      html: `Files uploading`,
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });

    const profileFile = document.getElementById('file-upload').files[0];
    const fileName = Meteor.userId()+profileFile.name.match(/\.[0-9a-z]+$/i, "");
    //const fileName = Meteor.userId()+".jpg"
    
    const storageRef = ref(template.storage, "profilePictures/"+fileName);
    const snapshot = await uploadBytes(storageRef, profileFile);
    const url = await getDownloadURL(storageRef);

    const obj = {
      picture: {
        name:fileName,
        url:url,
      },
    };
    
    Meteor.call("user.picture.update", obj, function (error, success) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
    });
    Swal.fire('Saved!', '', 'success');
  } 
});