Template.adminPageDashboard.onCreated(function () {
  this.state = new ReactiveDict(null, {
    category: Number,
    column: Number,
    news: Number,
    user: Number,
    like: Number, //TODO after datas
    view: Number, //TODO after datas
  });
});

Template.adminPageDashboard.onRendered(function () {
  const self = this;
  this.autorun(function () {
    Meteor.call("category.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("category", result.categories.length);
    });
    Meteor.call("column.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("column", result.columns.length);
    });
    Meteor.call("news.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("news", result.news.length);
    });
    Meteor.call("user.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("user", result.user.length);
    });
  });
});