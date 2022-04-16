Template.adminComponentFile.onCreated(function() {
  AppUtil.temp.set(this.data.fileAreaID, []);
});

Template.adminComponentFile.onRendered(function() {

});

Template.adminComponentFile.events({
  'click .media-preview-item .btn-preview-remove': function(event, template){
    const selectedFiles = AppUtil.temp.get(template.data.fileAreaID);
    const selectedFilesIndex = selectedFiles.findIndex(_file => _file._id === this._id);
    selectedFiles.splice(selectedFilesIndex, 1);
    AppUtil.temp.set(template.data.fileAreaID, selectedFiles);
  },
  'click .btn-media-all': function(event, template) {
    AppUtil.temp.set('currentArea', {
      fileAreaID: template.data.fileAreaID,
      multiple: template.data.multiple,
      onlyCurrentUser: template.data.onlyCurrentUser,
    });
  }
});