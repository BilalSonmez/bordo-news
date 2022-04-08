import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'role.cancel.admin',
  //TODO mixins: [isAdmin],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;
    Roles.removeUsersFromRoles(_id, 'roles.admin', null);
    Roles.removeUsersFromRoles(_id, 'roles.editor', null);
    return Meteor.users.update({_id: _id}, {$set: {"profile.isAdmin": false,"profile.isEditor": false}});
  }
});
