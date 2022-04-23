Template.adminPageDashboard.onCreated(function () {
  this.state = new ReactiveDict(null, {
    category: Number,
    column: Number,
    columnView: Number,
    news: Number,
    newsView: Number,
    user: Number,
    view: Number,
    columnLikes: Number,
    newsLikes: Number,
    like: Number,
  });
});

Template.adminPageDashboard.onRendered(function () {
  const self = this;
  this.autorun(function () {
    self.state.set('view', self.state.get('columnView') + self.state.get('newsView'));
  });
  this.autorun(function () {
    self.state.set('like', self.state.get('columnLikes') + self.state.get('newsLikes'));
  });
  this.autorun(function () {
    Meteor.call('category.list', {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set('category', result.categories.length);
    });
    Meteor.call('column.list', {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      let counter = 0;
      let likeCounter = 0;
      result.columns.forEach(function (data) {
        counter += data.communityData.views;
        likeCounter += data.communityData.like.length;
      });
      self.state.set('columnLikes', likeCounter);
      self.state.set('columnView', counter);
      self.state.set('column', result.columns.length);
    });
    Meteor.call('news.list', {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      let counter = 0;
      let likeCounter = 0;
      result.news.forEach(function (data) {
        counter += data.communityData.views;
        likeCounter += data.communityData.like.length;
      });
      self.state.set('newsLikes', likeCounter);
      self.state.set('newsView', counter);
      self.state.set('news', result.news.length);
    });
    Meteor.call('user.list', {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set('user', result.user.length);
    });
  });
});
