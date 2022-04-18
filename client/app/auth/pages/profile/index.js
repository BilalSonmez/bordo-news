import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
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
  const uppy = new Uppy({
    debug: true,
    autoProceed: false,
    restrictions: {
      maxFileSize: 1000000,
      maxNumberOfFiles: 30,
      minNumberOfFiles: 1,
      allowedFileTypes: ['image/*']
    }
  }).use(Dashboard, {
    inline: true,
    target: '#drag-drop-area',
    showProgressDetails: true,
    note: 'Images only, 1 file, up to 1 MB',
    height: 350,
    width: 1920,
    browserBackButtonClose: false
  });
  uppy.on('complete', async (result) => {

    Swal.fire({
      title: 'Do you want to upload Picture?',
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then(async (swalresult) => {
      if (swalresult.isConfirmed) {
        await Promise.all(result.successful.map(async (val) => {
          $('.fileLoading').show();
          const fileName = Meteor.userId()+".jpg"
          const storageRef = ref(self.storage, "profilePictures/"+fileName);
          const snapshot = await uploadBytes(storageRef, val.data);
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
          uppy.reset();
        }))
        $('.fileLoading').hide();
        $('#authProfilePictureModal').modal('hide');
        Swal.fire('Saved!', '', 'success');

      
      }
    });

    
  });
  this.autorun(function () {
    

  });
});