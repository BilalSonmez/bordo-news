import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'user.list',
  mixins : [SignedInMixin,RoleMixin],
  roles: ["roles.admin","roles.editor","roles.columnist"],
  validate: new SimpleSchema({
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options } = data;

    return Fetch(Meteor.users, {}, options, 'user');
  }
});