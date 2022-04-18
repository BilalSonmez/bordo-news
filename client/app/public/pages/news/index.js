import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
Template.publicPagesNew.onCreated(function () {
  this.state = new ReactiveDict(null, {
  news:{},
  });
});

Template.publicPagesNew.onRendered(function () {
  const self = this;
  const slugUrl = FlowRouter.getParam("slugUrl");
  console.log(slugUrl);
  this.autorun(function () {
    Meteor.call("news.show.url", {
      slugUrl: slugUrl
    }, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("news", result);
      console.log(result);
    });
  });
});

Template.publicPagesNew.events({
  'click #event': function (event,template) {

  }
});