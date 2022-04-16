import Quill from "quill";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import Swal from "sweetalert2";
import Slugify from "slugify";
Template.adminPageColumnEdit.onCreated(function () {
  this.state = new ReactiveDict(null, {
    column: {},
  });
});

Template.adminPageColumnEdit.onRendered(function () {
  const self = this;
  const _id = FlowRouter.getParam("_id");
  self.quill = new Quill("#column-edit-editor", {
    theme: "snow",
    placeholder: "Optional",
  });

  this.autorun(function () {
    Meteor.call("column.show", {
      _id: _id
    }, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("column", result);
      if (result.featuredImage) {
        AppUtil.temp.set('columnFeaturedImage', [result.featuredImage]);
      }
      self.quill.root.innerHTML = result.content;
    });
  });
});

Template.adminPageColumnEdit.events({
  "submit form#brdColumnAddForm": function (event, template) {
    event.preventDefault();
    const title = event.target.inputTitle.value;
    const images = AppUtil.temp.get('columnFeaturedImage');
    if (title === "") {
      ErrorHandler.show("Title cannot be empty");
      return;
    }
    const subTitle = event.target.inputSubTitle.value;
    const content = template.quill.root.innerHTML;
    const slugUrl = Slugify(event.target.slugUrl.value, "-");
    const featuredImage = images.length > 0 ? images[0]._id : null;
    const metaTitle = event.target.inputMetaTitle.value;
    const metaDescription = event.target.inputMetaDescription.value;
    const noIndex = event.target.noIndexSelect.checked;
    const noFollow = event.target.noFollowSelect.checked;

    const rawcolumn = template.state.get("column");
    const obj = {
      _id: rawcolumn._id,
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
        communityData: rawcolumn.communityData,
      },
    };
    console.log(obj);

    Swal.fire({
      title: "Do you want to save Column?",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call("column.update", obj, function (error, success) {
          if (error) {
            ErrorHandler.show(error.message);
            return;
          }
          AppUtil.refreshTokens.set("column", Random.id());
          event.target.reset();
          Swal.fire("Saved!", "", "success");
          FlowRouter.go("admin.column", {});
        });
      }
    });
  },
  "input #inputTitle": function (event, template) {
    $("#slugUrl").val(Slugify(event.target.value));
  },
});