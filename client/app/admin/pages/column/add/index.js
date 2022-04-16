import Quill from "quill";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';
import Slugify from 'slugify';
Template.adminPageColumnAdd.onCreated(function () {
  this.state = new ReactiveDict(null, {

  });
});

Template.adminPageColumnAdd.onRendered(function () {
  const self = this;
  self.quill = new Quill("#column-add-editor", {
    theme: "snow",
    placeholder: 'Optional',
  });
  this.autorun(function () {

  });
});

Template.adminPageColumnAdd.events({
  "submit form#brdColumnAddForm": function (event, template) {
    event.preventDefault();
    const title = event.target.inputTitle.value;
    if (title === '') {
      ErrorHandler.show("Title cannot be empty");
      return;
    }
    const subTitle = event.target.inputSubTitle.value;
    const content = template.quill.root.innerHTML;
    const slugUrl = Slugify(event.target.slugUrl.value, '-');
    //TODO will change after upload system
    const featuredImage = 'YSsf6nLfoKjAAekKo';
    const metaTitle = event.target.inputMetaTitle.value;
    const metaDescription = event.target.inputMetaDescription.value;
    const noIndex = event.target.noIndexSelect.checked;
    const noFollow = event.target.noFollowSelect.checked;

    const obj = {
      column: {
        title: title,
        subTitle: subTitle,
        content: content,
        slugUrl: slugUrl,
        featuredImage: featuredImage,
        metaContent: {
          metaTitle: metaTitle,
          metaDescription: metaDescription,
          noIndex: noIndex,
          noFollow: noFollow,
        },
        communityData: {
          views: 0,
          like: [],
        },
      }
    }
    console.log(obj);

    Swal.fire({
      title: 'Do you want to save Column?',
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call("column.create", obj, function (error, success) {
          if (error) {
            ErrorHandler.show(error.message);
            return;
          }
          AppUtil.refreshTokens.set("column", Random.id());
          event.target.reset();
          Swal.fire('Saved!', '', 'success')
          FlowRouter.go("admin.column", {});
        });

      }
    })
  },
  'input #inputTitle': function (event, template) {
    $('#slugUrl').val(Slugify(event.target.value));
  },
});