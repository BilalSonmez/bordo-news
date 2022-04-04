import Quill from "quill";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';
import Slugify from 'slugify';
Template.adminPageCategoryAdd.onCreated(function () {
  this.state = new ReactiveDict(null, {

  });
});

Template.adminPageCategoryAdd.onRendered(function () {
  const self = this;

  self.quill = new Quill("#category-add-editor", {
    theme: "snow",
    placeholder: 'Optional',
  });
  this.autorun(function () {


  });
});

Template.adminPageCategoryAdd.events({
  "submit form#brdCategoryAddForm": function (event, template) {
    event.preventDefault();
    const title = event.target.inputTitle.value;
    if (title==='') {
      ErrorHandler.show("Title cannot be empty");
      return;
    }
    const description = template.quill.root.innerHTML;
    const metaTitle = event.target.inputMetaTitle.value;
    const metaDescription = event.target.inputMetaDescription.value;
    const noIndex = event.target.noIndexSelect.value;
    const noFollow =event.target.noFollowSelect.value;
    const slugUrl = Slugify(event.target.inputTitle.value,'-');
    const obj = {
      category: {
        title: title,
        slugUrl: slugUrl,
        metaContent:{
        }
      },
    };
    if (description!=="<p><br></p>") {
      obj.category.description=description;
    }
    if (metaTitle!=='') {
      obj.category.metaContent.metaTitle = metaTitle;
    }
    if (metaDescription!=='') {
      obj.category.metaContent.metaDescription = metaDescription;
    }
    if(noIndex === 'true'){
      obj.category.metaContent.noIndex=true;
    }else if (noIndex === 'false'){
      obj.category.metaContent.noIndex=false;
    }
    if(noFollow === 'true'){
      obj.category.metaContent.noFollow=true;
    }else if (noFollow === 'false'){
      obj.category.metaContent.noFollow=false;
    }
    console.log(obj); 
    Swal.fire({
      title: 'Do you want to save Category?',
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call("category.create", obj, function (error, success) {
          if (error) {
            ErrorHandler.show(error.message);
            return;
          }
          AppUtil.refreshTokens.set("category", Random.id());
          event.target.reset();
          Swal.fire('Saved!', '', 'success')
          FlowRouter.go("admin.category",{});
        });
        
      }
    })
  }
});
