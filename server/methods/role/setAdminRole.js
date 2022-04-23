import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'role.set.admin',
  mixins: [SignedInMixin, RoleMixin],
  roles: ['roles.admin'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    Roles.addUsersToRoles(_id, 'roles.admin', null);
    Roles.addUsersToRoles(_id, 'roles.editor', null);
    Roles.addUsersToRoles(_id, 'roles.columnist', null);

    return Meteor.users.update({ _id: _id }, { $set: { 'profile.isAdmin': true, 'profile.isEditor': true, 'profile.isColumnist': true } });
  },
});
