import Quill from 'quill';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';
import Slugify from 'slugify';
Template.adminPageNewsAdd.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
  });
});

Template.adminPageNewsAdd.onRendered(function () {
  const self = this;
  self.quill = new Quill('#news-add-editor', {
    theme: 'snow',
    placeholder: 'Optional',
  });
  this.autorun(function () {
    Meteor.call('category.list', {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result.categories);
      self.state.set('categories', result.categories);
    });
  });
});

Template.adminPageNewsAdd.events({
  'submit form#brdNewAddForm': function (event, template) {
    event.preventDefault();
    const title = event.target.inputTitle.value;
    const images = AppUtil.temp.get('newsFeaturedImage');
    if (title === '') {
      ErrorHandler.show('Title cannot be empty');
      return;
    }
    const subTitle = event.target.inputSubTitle.value;
    const content = template.quill.root.innerHTML;
    const slugUrl = Slugify(event.target.slugUrl.value, { replacement: '-', lower: true });
    const featuredImage = images.length > 0 ? images[0]._id : null;
    const metaTitle = event.target.inputMetaTitle.value;
    const metaDescription = event.target.inputMetaDescription.value;
    const noIndex = event.target.noIndexSelect.checked;
    const noFollow = event.target.noFollowSelect.checked;
    let isImportant;
    if (event.target.isImportantOff.checked) {
      isImportant = false;
    }
    if (event.target.isImportantOn.checked) {
      isImportant = true;
    }
    const selectedCategories = $('.selectedCategories:checkbox:checked')
      .map(function () {
        return this.value;
      })
      .get();

    const obj = {
      news: {
        title: title,
        subTitle: subTitle,
        content: content,
        slugUrl: slugUrl,
        categories: selectedCategories,
        featuredImage: featuredImage,
        isImportant: isImportant,
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
      },
    };
    console.log(obj);

    Swal.fire({
      title: 'Do you want to save News?',
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call('news.create', obj, function (error, success) {
          if (error) {
            ErrorHandler.show(error.message);
            return;
          }
          AppUtil.refreshTokens.set('news', Random.id());
          event.target.reset();
          Swal.fire('Saved!', '', 'success');
          FlowRouter.go('admin.new', {});
        });
      }
    });
  },
  'input #inputTitle': function (event, template) {
    $('#slugUrl').val(Slugify(event.target.value, { replacement: '-', lower: true }));
  },
});
