import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

MustSignIn = function (context, redirect, stop) {
  if (!Meteor.userId()) {
    redirect('/');
    stop();
  }
}

MustSignOut = function (context, redirect, stop) {
  if (Meteor.userId()) {
    redirect('/');
    stop();
  }
}

hasRole = function (context, redirect, stop) {
  if (!Roles.userIsInRole(Meteor.userId(), ['roles.admin','roles.editor','roles.columnist'])) {
    redirect('/');
    stop();
  }
}

IsAdmin = function (context, redirect, stop) {
  if (!Roles.userIsInRole(Meteor.userId(), ['roles.admin'])) {
    redirect('/');
    stop();
  }
}
IsEditor = function (context, redirect, stop) {
  if (!Roles.userIsInRole(Meteor.userId(), ['roles.editor'])) {
    redirect('/');
    stop();
  }
}
IsColumnist = function (context, redirect, stop) {
  if (!Roles.userIsInRole(Meteor.userId(), ['roles.columnist'])) {
    redirect('/');
    stop();
  }
}

FlowRouter.wait();
Tracker.autorun(() => {
  if (Roles.subscription.ready() && !FlowRouter._initialized) {
    FlowRouter.initialize();
  }
});