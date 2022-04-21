Template.registerHelper('isUserHasRole', function() {
  return Roles.userIsInRole(Meteor.userId(), ['roles.admin', 'roles.editor', 'roles.columnist']);
});