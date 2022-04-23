import Quill from 'quill';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';
import Slugify from 'slugify';
Template.adminPageNewsEdit.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
    mainCategories: [],
    news: {},
  });
});

Template.adminPageNewsEdit.onRendered(function () {
  const self = this;
  const _id = FlowRouter.getParam('_id');
  self.quill = new Quill('#news-edit-editor', {
    theme: 'snow',
    placeholder: 'Optional',
  });
  this.autorun(function () {
    Meteor.call('category.list', {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set('mainCategories', result.categories);
    });
  });
  this.autorun(function () {
    let categories = self.state.get('mainCategories');
    if (categories.length == 0) {
      return;
    }
    Meteor.call('news.show', { _id: _id }, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result.categories);
      categories = categories.map((category) => {
        const index = result.categories.findIndex((_category) => {
          return category._id == _category;
        });
        category.selected = index == -1 ? false : true;
        return category;
      });
      
      self.state.set('categories', categories);
      self.state.set('news', result);
      if (result.featuredImage) {
        AppUtil.temp.set('newsFeaturedImage', [result.featuredImage]);
      }
      self.quill.root.innerHTML = result.content;
    });
  });
});

Template.adminPageNewsEdit.events({
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

    const newraw = template.state.get('news');
    const obj = {
      _id: newraw._id,
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
        communityData: newraw.communityData,
      },
    };
    console.log(obj);

    Swal.fire({
      title: 'Do you want to save News?',
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.isConfirmed) {
        Meteor.call('news.update', obj, function (error, success) {
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
