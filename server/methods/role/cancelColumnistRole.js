import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'role.cancel.columnist',
  mixins: [SignedInMixin, RoleMixin],
  roles: ['roles.admin'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    Roles.removeUsersFromRoles(_id, 'roles.columnist', null);

    return Meteor.users.update({ _id: _id }, { $set: { 'profile.isColumnist': false } });
  },
});
