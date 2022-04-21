import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';

new ValidatedMethod({
  name: 'role.set.editor',
  mixins : [SignedInMixin,RoleMixin],
  roles: ["roles.admin"],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;
    Roles.addUsersToRoles(_id, 'roles.editor', null);
    return Meteor.users.update({_id: _id}, {$set: {"profile.isEditor": true}});
  }
});

