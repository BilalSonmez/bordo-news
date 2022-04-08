import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'role.set.admin',
  //TODO mixins: [isAdmin],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;
    Roles.addUsersToRoles(_id, 'roles.admin', null);
    Roles.addUsersToRoles(_id, 'roles.editor', null);
    return Meteor.users.update({_id: _id}, {$set: {"profile.isAdmin": true,"profile.isEditor": true}});
  }
});
