import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import Swal from 'sweetalert2';
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

Template.adminModalsFileManager.onCreated(function () {
  this.currentArea = AppUtil.temp.get('currentArea');
  this.storage = getStorage();
  this.fileUpload = new ReactiveVar(false);
  this.fileUploadError = new ReactiveVar(false);

  this.state = new ReactiveDict(null, {
    files: [],
    selectedFiles: []
  });

  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 18,
    totalCount: 0,
    totalPages: 0
  });

  this.sorting = new ReactiveDict(null, {
    sortField: 'createdAt',
    sortOrder: 'desc'
  });

  this.filtering = new ReactiveDict(null, {});
});

Template.adminModalsFileManager.onRendered(function () {
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
    note: 'Images and video only, 1–5 files, up to 1 MB',
    height: 350,
    width: 1920,
    metaFields: [
      { id: 'name', name: 'Name', placeholder: 'file name' },
      { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
    ],
    browserBackButtonClose: false
  });

  $('#brdAdminModalsFileManager').on('hide.bs.modal', function(event){
    AppUtil.temp.set('currentArea', undefined);
  });

  this.autorun(function(){
    self.currentArea = AppUtil.temp.get('currentArea');
    if (self.currentArea) {
      self.state.set('selectedFiles', AppUtil.temp.get(self.currentArea.fileAreaID));
    }
  });
  /*
  obj[key] = {
          $regex: `${_options.filtering[key]}`,
          $options: 'i'
        };
  */
  //Files.find({$or: [{name: {$regex: `${_options.filtering[key]}`, $options: 'i'}}]})
  this.autorun(function() {
    $('.fileLoading').show();
    const currentPage = self.pagination.get('currentPage');
    const pageItems = self.pagination.get('pageItems');
    const filtering = self.filtering.all();
    const sorting = self.sorting.all();

    const obj = {
      options: {
        pagination: {
          currentPage: currentPage,
          pageItems: pageItems
        },
        filtering: filtering,
        sorting: sorting
      }
    };

    Meteor.call('file.list', obj, function (error, result) {

      if (error) {
        ErrorHandler.show(error)
        return;
      }

      result.files = result.files.filter(function (file) {
        if (self.state.get('files').findIndex((element) => element._id == file._id) > -1) {
          return false;
        } else {
          return true;
        }
      });



      self.state.set('files', self.state.get('files').concat(result.files));
      self.state.set('notFound', result.options.pagination.totalCount === 0);
      self.pagination.set('currentPage', result.options.pagination.currentPage);
      self.pagination.set('pageItems', result.options.pagination.pageItems);
      self.pagination.set('totalCount', result.options.pagination.totalCount);
      self.pagination.set('totalPages', result.options.pagination.totalPages);
    });

    $('.fileLoading').hide();
  });

  $('.modal-body').scroll(function (event) {
    if ($(this).scrollTop() == ($(this)[0].scrollHeight - $(this).height()) - 32) {
      self.pagination.set('currentPage', self.pagination.get('currentPage') + 1);
    }
  });

  uppy.on('complete', async (result) => {
    self.fileUpload.set(true);
    Swal.fire({
      title: 'Please Wait!',
      html: `Files uploading`,
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });
    await Promise.all(result.successful.map(async (val) => {
      const fileName = val.meta.name.replace(/\.[^/.]+$/, "");
      const extension = '.' + val.extension;
      let fileFullName = "";
      let count = 0;
      let result;

      do {
        fileFullName = fileName + (count === 0 ? "" : `-${count}`) + extension;
        result = await Meteor.callWithPromise('file.show', { name: fileFullName });
        count++;
      } while (result)

      const storageRef = ref(self.storage, fileFullName);
      const snapshot = await uploadBytes(storageRef, val.data);
      const url = await getDownloadURL(storageRef);

      const obj = {
        file: {
          name: fileFullName,
          url: url,
          extension: val.extension,
          type: val.type
        },
      };

      const createResult = await Meteor.callWithPromise("file.create", obj);
      if (createResult) {
        let files = self.state.get('files');
        files.unshift(createResult);
        self.state.set('files', files);
        uppy.removeFile(val.id);
      }
      return;
    }));
    Swal.close();
  });
});

Template.adminModalsFileManager.events({
  'click .image_picker_selector li': function(event, template) {
    const selectedFiles = template.state.get('selectedFiles');
    if (template.currentArea.multiple) {
      const selectedFilesIndex = selectedFiles.findIndex(_file => _file._id === this._id);
      if (selectedFilesIndex > -1) {
        selectedFiles.splice(selectedFilesIndex, 1);
      } else {
        selectedFiles.push(this);
      }
    } else {
      selectedFiles.splice(0, selectedFiles.length);
      selectedFiles.push(this);
    }
    template.state.set('selectedFiles', selectedFiles);
  },
  'click .btnBrdFileManagerSave': function(event, template) {
    AppUtil.temp.set(template.currentArea.fileAreaID, template.state.get('selectedFiles'));
    $('#brdAdminModalsFileManager').modal('hide');
  },
  'click .image_picker_selector .btn-brd-media-image-delete': function (event, template) {
    const item = this;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        event.currentTarget.remove();
        await Meteor.callWithPromise('file.delete', { _id: this._id });
        const desertRef = ref(template.storage, this.name);
        deleteObject(desertRef).then(() => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }).catch((error) => {
          Swal.fire(
            'Error!',
            'Firebase Storage error please contact developer.',
            'error'
          )
        });
      }
    });
  }
});